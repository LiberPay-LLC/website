import os
import smtplib
import threading
from email.message import EmailMessage
from jinja2 import Environment, FileSystemLoader
import json
import urllib.request
import urllib.error
from email.utils import formataddr
from db import supabase
from utils.email_utils import html_to_text

SMTP_HOST = os.getenv('SMTP_HOST')
SMTP_PORT = int(os.getenv('SMTP_PORT', 465))
SMTP_USER = os.getenv('SMTP_USER')
SMTP_PASSWORD = os.getenv('SMTP_PASSWORD')
SMTP_SECURITY = os.getenv('SMTP_SECURITY', 'auto').lower()
SMTP_TIMEOUT = int(os.getenv('SMTP_TIMEOUT', 15))
EMAIL_PROVIDER = os.getenv('EMAIL_PROVIDER', 'smtp').lower()
RESEND_API_KEY = os.getenv('RESEND_API_KEY')
EMAIL_FROM = os.getenv('EMAIL_FROM')
TEAM_EMAIL = os.getenv('TEAM_EMAIL')

TEMPLATE_DIR = os.path.join(os.path.dirname(__file__), 'templates')
env = Environment(loader=FileSystemLoader(TEMPLATE_DIR))

ASSETS_DIR = os.path.join(os.path.dirname(__file__), 'assets')
LOGO_FILENAME = 'logo-full-name-no-background.png'


def log_email(customer_id, to_email, subject, template, context, status, error_message, email_type):
    """Log email to database"""
    try:
        # Ensure error_message is properly converted to string
        error_str = str(error_message) if error_message is not None else None
        
        log_data = {
            "customer_id": customer_id,
            "to_email": to_email,
            "subject": subject,
            "template": template,
            "context": json.dumps(context),
            "status": status,
            "error_message": error_str,
            "type": email_type,
        }
        supabase.table("emails").insert(log_data).execute()
        print(f"[EMAIL LOG] Successfully logged {email_type} email to {to_email} with status: {status}")
    except Exception as e:
        print(f"[EMAIL LOG ERROR] Failed to log email to database: {e}")
        print(f"[EMAIL LOG ERROR] Email details: {to_email}, {subject}, {status}, {email_type}")


def send_email(subject, html_body, to_email):
    """
    Sends an email with the given subject and HTML body to the specified recipient, with inline logo.
    """
    try:
        def send_via_smtp():
            msg = EmailMessage()
            msg['Subject'] = subject
            msg['From'] = formataddr(("LiberPay", EMAIL_FROM))
            msg['To'] = to_email

            text_body = html_to_text(html_body)
            msg.set_content(text_body)
            msg.add_alternative(html_body, subtype='html')

            logo_path = os.path.join(ASSETS_DIR, LOGO_FILENAME)
            try:
                with open(logo_path, 'rb') as img:
                    img_data = img.read()
                    msg.get_payload()[1].add_related(
                        img_data,
                        'image',
                        'png',
                        cid='liberpay-logo',
                        filename='LiberPay Logo.png'
                    )
            except Exception as e:
                print(f"[WARN] Could not attach logo: {e}")

            def send_with_ssl(port):
                print(f"Connecting to SMTP server with SSL ({SMTP_HOST}:{port})...")
                with smtplib.SMTP_SSL(SMTP_HOST, port, timeout=SMTP_TIMEOUT) as server:
                    print("Logging in...")
                    server.login(SMTP_USER, SMTP_PASSWORD)
                    print("Sending message...")
                    server.send_message(msg)

            def send_with_starttls(port):
                print(f"Connecting to SMTP server with STARTTLS ({SMTP_HOST}:{port})...")
                with smtplib.SMTP(SMTP_HOST, port, timeout=SMTP_TIMEOUT) as server:
                    server.ehlo()
                    server.starttls()
                    server.ehlo()
                    print("Logging in...")
                    server.login(SMTP_USER, SMTP_PASSWORD)
                    print("Sending message...")
                    server.send_message(msg)

            if SMTP_SECURITY == 'ssl':
                send_with_ssl(SMTP_PORT)
                return
            if SMTP_SECURITY == 'starttls':
                send_with_starttls(SMTP_PORT)
                return

            last_error = None
            for strategy in (
                lambda: send_with_ssl(SMTP_PORT),
                lambda: send_with_starttls(587),
                lambda: send_with_ssl(465),
            ):
                try:
                    strategy()
                    last_error = None
                    break
                except Exception as error:
                    last_error = error
                    print(f"[SMTP RETRY] Strategy failed: {error}")
            if last_error:
                raise last_error

        def send_via_resend():
            if not RESEND_API_KEY:
                raise RuntimeError("RESEND_API_KEY is required when EMAIL_PROVIDER=resend")

            payload = {
                "from": EMAIL_FROM,
                "to": [to_email],
                "subject": subject,
                "html": html_body,
                "text": html_to_text(html_body),
            }
            req = urllib.request.Request(
                "https://api.resend.com/emails",
                data=json.dumps(payload).encode("utf-8"),
                headers={
                    "Authorization": f"Bearer {RESEND_API_KEY}",
                    "Content-Type": "application/json",
                },
                method="POST",
            )
            print("Sending email via Resend API...")
            try:
                with urllib.request.urlopen(req, timeout=SMTP_TIMEOUT) as response:
                    if response.status < 200 or response.status >= 300:
                        body = response.read().decode("utf-8", errors="ignore")
                        raise RuntimeError(f"Resend API failed with status {response.status}: {body}")
            except urllib.error.HTTPError as error:
                body = error.read().decode("utf-8", errors="ignore") if error.fp else ""
                raise RuntimeError(f"Resend API HTTP {error.code}: {body}")

        if EMAIL_PROVIDER == 'resend':
            send_via_resend()
        elif EMAIL_PROVIDER == 'smtp':
            send_via_smtp()
        else:
            try:
                send_via_smtp()
            except Exception as smtp_error:
                print(f"[EMAIL PROVIDER AUTO] SMTP failed, trying Resend: {smtp_error}")
                send_via_resend()

        print(f"Email sent to {to_email}")
        return True, None
    except Exception as e:
        print(f"Failed to send email to {to_email}: {e}")
        return False, str(e)


def send_email_with_template(subject, to_email, template_name, context, email_type=None, customer_id=None):
    """
    Renders the given template with context and sends the email. Automatically logs the attempt.
    """
    try:
        template = env.get_template(template_name)
        html_body = template.render(**context)
    except Exception as e:
        if customer_id:
            log_email(customer_id, to_email, subject, template_name, context, 'template_error', str(e), email_type)
        print(f"Template rendering failed: {e}")
        return

    def _send_and_log():
        try:
            status, error = send_email(subject, html_body, to_email)
            if customer_id:
                log_email(
                    customer_id, to_email, subject, template_name, context,
                    'sent' if status else 'failed', error, email_type
                )
        except Exception as e:
            print(f"[ERROR] Failed in _send_and_log for {to_email}: {e}")
            if customer_id:
                error_str = str(e) if e is not None else "Unknown error occurred"
                log_email(
                    customer_id, to_email, subject, template_name, context,
                    'failed', error_str, email_type
                )

    threading.Thread(target=_send_and_log).start()


def send_contact_emails(contact_data, customer_id):
    """
    Sends user and team notification emails for a contact, automatically logging them.
    """
    # User confirmation
    user_subject = 'We received your contact request'
    user_email = contact_data.get('email')
    user_context = {k: contact_data.get(k, '') for k in [
        'name', 'company_name', 'phone', 'email', 'industry', 'employee_count', 'location']}
    send_email_with_template(
        subject=user_subject,
        to_email=user_email,
        template_name='user_confirmation.html',
        context=user_context,
        email_type='user_confirmation',
        customer_id=customer_id
    )
    # Team notification
    team_subject = 'New Contact Lead'
    team_context = {k: contact_data.get(k, '') for k in [
        'name', 'company_name', 'phone', 'email', 'industry', 'employee_count', 'location']}
    send_email_with_template(
        subject=team_subject,
        to_email=TEAM_EMAIL,
        template_name='team_notification.html',
        context=team_context,
        email_type='team_notification',
        customer_id=customer_id
    ) 
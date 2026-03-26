from flask.views import MethodView
from flask_smorest import Blueprint
from postgrest.exceptions import APIError
from schemas import ContactSchema
from db import supabase
from services.email_service import send_contact_emails

blp = Blueprint("contacts", __name__, description="Contact form")


class SupabaseSchemaMissingError(Exception):
    pass

def upsert_customer(contact_data):
    customer_data = contact_data.copy()
    customer_data['status'] = 'lead'

    try:
        results = supabase.table("customers").upsert(
            customer_data, on_conflict="email"
        ).execute()
    except APIError as error:
        error_code = None
        error_text = str(error)
        if isinstance(error.args, tuple) and error.args:
            first_arg = error.args[0]
            if isinstance(first_arg, dict):
                error_code = first_arg.get("code")

        if error_code == "PGRST205" or "PGRST205" in error_text or "public.customers" in error_text:
            raise SupabaseSchemaMissingError(
                "Supabase schema is missing required table 'public.customers'. "
                "Run backend/sql/init_supabase.sql in your Supabase SQL Editor."
            )

        raise RuntimeError(
            "Failed to persist contact in Supabase. Check SUPABASE_URL/SUPABASE_KEY and table policies."
        )
    
    if results:
        return results.data[0]['id']
    return None

@blp.route("/contacts")
class ContactResource(MethodView):
    @blp.arguments(ContactSchema)
    def post(self, contact_data):
        try:
            customer_id = upsert_customer(contact_data)
            send_contact_emails(contact_data, customer_id)
            return {"message": "Contact request received"}, 201
        except SupabaseSchemaMissingError as error:
            return {"message": str(error)}, 500
        except RuntimeError as error:
            return {"message": str(error)}, 500

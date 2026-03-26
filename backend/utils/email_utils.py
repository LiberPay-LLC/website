import re
from html import unescape


def html_to_text(html_content):
    """Convert HTML to clean plain text, removing all tags and CSS"""
    # Remove <title> blocks and their content
    text = re.sub(r'<title[^>]*>.*?</title>', '', html_content, flags=re.DOTALL)
    
    # Remove <style> blocks and their content
    text = re.sub(r'<style[^>]*>.*?</style>', '', text, flags=re.DOTALL)
    
    # Remove <script> blocks and their content
    text = re.sub(r'<script[^>]*>.*?</script>', '', text, flags=re.DOTALL)
    
    # Remove all HTML tags
    text = re.sub(r'<[^>]+>', '', text)
    
    # Decode HTML entities
    text = unescape(text)
    
    # Clean up whitespace and line breaks
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'\n\s*\n', '\n\n', text)  # Preserve paragraph breaks
    text = text.strip()
    
    return text 
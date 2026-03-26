from marshmallow import Schema, fields, validate


class ContactSchema(Schema):
    name = fields.Str(required=True, validate=validate.Length(min=1, max=120))
    company_name = fields.Str(
        required=True, validate=validate.Length(min=1, max=120)
    )
    phone = fields.Str(required=True, validate=validate.Length(min=1, max=40))
    email = fields.Email(required=True, validate=validate.Length(max=120))
    industry = fields.Str(
        required=True, validate=validate.Length(min=1, max=120)
    )
    employee_count = fields.Str(
        required=True, validate=validate.Length(min=1, max=40)
    )
    location = fields.Str(
        required=True, validate=validate.Length(min=1, max=120)
    )

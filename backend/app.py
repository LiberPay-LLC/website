from flask import Flask, jsonify
from flask_cors import CORS
from flask_smorest import Api
import os
from dotenv import load_dotenv
from datetime import datetime

from resources.contact import blp as ContactBlueprint
from resources.health import blp as HealthBlueprint

load_dotenv()

app = Flask(__name__)

# Configuration
app.config["API_TITLE"] = "LiberPay API"
app.config["API_VERSION"] = "v1"
app.config["OPENAPI_VERSION"] = "3.0.3"
app.config["OPENAPI_URL_PREFIX"] = "/"
app.config["OPENAPI_SWAGGER_UI_PATH"] = "/swagger-ui"
app.config["OPENAPI_SWAGGER_UI_URL"] = (
    "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"
)
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
    "SUPABASE_URL", "sqlite:///app.db"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Initialize extensions
api = Api(app)

# Configure CORS origins
cors_origins_env = os.environ.get("CORS_ORIGINS", "http://localhost:10005")
cors_origins = [
    origin.strip() for origin in cors_origins_env.split(",") if origin.strip()
]

# Configure CORS
CORS(
    app,
    origins=cors_origins,
    supports_credentials=True,
)

# Register blueprints
api.register_blueprint(ContactBlueprint, url_prefix="/api")
api.register_blueprint(HealthBlueprint, url_prefix="/api")


# Error handlers
@app.errorhandler(404)
def not_found(error):
    return (
        jsonify(
            {
                "message": "Resource not found",
                "error_code": "NOT_FOUND",
                "timestamp": datetime.utcnow().isoformat(),
            }
        ),
        404,
    )


@app.errorhandler(500)
def internal_error(error):
    return (
        jsonify(
            {
                "message": "Internal server error",
                "error_code": "INTERNAL_ERROR",
                "timestamp": datetime.utcnow().isoformat(),
            }
        ),
        500,
    )


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    debug = os.environ.get("FLASK_ENV") == "development"
    app.run(host="0.0.0.0", port=port, debug=debug)

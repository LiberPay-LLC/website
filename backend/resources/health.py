from flask_smorest import Blueprint

blp = Blueprint("health", __name__, description="Health check")


@blp.route("/")
def health():
    return {"status": "ok"}

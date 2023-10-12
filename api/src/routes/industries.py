from flask import Blueprint, abort, jsonify, request
from connect import db
from controllers.IndustryController import IndustryController
from schema.IndustrySchema import IndustrySchema

industry_routes = Blueprint('industry_routes', __name__)


@industry_routes.route("/", methods=["GET", "POST"])
def industry(params: str = None):
    if request.method == "GET":
        try:
            schema = IndustrySchema(many=True)
            Industry = IndustryController().get_all(params)
            response = schema.dump(Industry)

            return {"data": response}

        except Exception as e:
            abort(
                jsonify(message=f"Error on industry get_all: {e}", error=True))

    if request.method == "POST":
        try:
            data = request.get_json()
            industry = IndustryController().create(data)
            db.session.add(industry)
            db.session.commit()
            schema = IndustrySchema()
            response = schema.dump(industry)

            return {"data": response}

        except Exception as e:
            abort(
                jsonify(message=f"Error on industry create: {e}", error=True))


@industry_routes.route("/<int:id>", methods=["PUT", "GET", "DELETE"])
def Industry(id: int):
    if request.method == "GET":

        try:
            schema = IndustrySchema()
            Industry = IndustryController().get(id)
            response = schema.dump(Industry)

            return {"data": response}

        except Exception as e:
            abort(
                jsonify(message=f"Error on industry get_one: {e}", error=True))

    if request.method == "PUT":
        try:
            data = request.get_json()
            industry = IndustryController().update(data, id)
            db.session.commit()
            schema = IndustrySchema()
            response = schema.dump(industry)

            return {"data": response}

        except Exception as e:
            abort(
                jsonify(message=f"Error on industry update: {e}", error=True))

    if request.method == "DELETE":
        try:
            industry = IndustryController().get(id)
            db.session.delete(industry)
            db.session.commit()

            return {"error": False}

        except Exception as e:
            abort(
                jsonify(message=f"Error on industry delete: {e}", error=True))

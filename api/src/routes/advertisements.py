from flask import Blueprint, abort, jsonify, request
from connect import db
from controllers.AdvertisementController import AdvertisementController
from schema.AdvertisementSchema import AdvertisementSchema

advertisements_routes = Blueprint('advertisements_routes', __name__)


@advertisements_routes.route("/", methods=["GET", "POST"])
def advertisements(params: str = None):
    if request.method == "GET":
        try:
            schema = AdvertisementSchema(many=True)
            advertisements = AdvertisementController().get_all(params)
            response = schema.dump(advertisements)

            return {"data": response}

        except Exception as e:
            abort(
                jsonify(message=f"Error on advertisements get_all: {e}", error=True))

    if request.method == "POST":
        try:
            data = request.get_json()
            advertisements = AdvertisementController().create(data)
            db.session.add(advertisements)
            db.session.commit()
            schema = AdvertisementSchema()
            response = schema.dump(advertisements)

            return {"data": response}

        except Exception as e:
            abort(
                jsonify(message=f"Error on advertisements create: {e}", error=True))


@advertisements_routes.route("/<int:id>", methods=["PUT", "GET", "DELETE"])
def advertisement(id: int):
    if request.method == "GET":
        try:
            schema = AdvertisementSchema()
            advertisements = AdvertisementController().get(id)
            response = schema.dump(advertisements)

            return {"data": response}

        except Exception as e:
            abort(
                jsonify(message=f"Error on advertisements get_one: {e}", error=True))
    if request.method == "PUT":
        try:
            data = request.get_json()
            advertisements = AdvertisementController().update(data, id)
            db.session.commit()
            schema = AdvertisementSchema()
            response = schema.dump(advertisements)

            return {"data": response}

        except Exception as e:
            abort(
                jsonify(message=f"Error on advertisements update: {e}", error=True))

    if request.method == "DELETE":
        try:
            advertisements = AdvertisementController().get(id)
            db.session.delete(advertisements)
            db.session.commit()

            return {"error": False}

        except Exception as e:
            abort(
                jsonify(message=f"Error on advertisements delete: {e}", error=True))

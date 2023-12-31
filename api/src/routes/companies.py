from flask import Blueprint, abort, jsonify, request
from connect import db
from controllers.CompanyController import CompanyController
from schema.CompanySchema import CompanySchema

company_routes = Blueprint('company_routes', __name__)


@company_routes.route("/", methods=["GET", "POST"])
def company(params: str = None):
    if request.method == "GET":
        try:
            schema = CompanySchema(many=True)
            Company = CompanyController().get_all(params)
            response = schema.dump(Company)
            return {"data": response}
        except Exception as e:
            abort(
                jsonify(message=f"Error on company get_all: {e}", error=True))

    if request.method == "POST":
        try:
            data = request.get_json()
            company = CompanyController().create(data)
            db.session.add(company)
            db.session.commit()
            schema = CompanySchema()
            response = schema.dump(company)
            return {"data": response}
        except Exception as e:
            abort(jsonify(message=f"Error on company create: {e}", error=True))


@company_routes.route("/<int:id>", methods=["PUT", "GET", "DELETE"])
def Company(id: int):
    if request.method == "GET":
        try:
            schema = CompanySchema()
            company = CompanyController().get(id)
            response = schema.dump(company)

            return {"data": response}

        except Exception as e:
            abort(
                jsonify(message=f"Error on company get_one: {e}", error=True))

    if request.method == "PUT":
        try:
            data = request.get_json()
            company = CompanyController().update(data, id)
            db.session.commit()
            schema = CompanySchema()
            response = schema.dump(company)

            return {"data": response}

        except Exception as e:
            abort(jsonify(message=f"Error on company update: {e}", error=True))

    if request.method == "DELETE":
        try:
            company = CompanyController().get(id)
            db.session.delete(company)
            db.session.commit()

            return {"error": False}

        except Exception as e:
            abort(jsonify(message=f"Error on company delete: {e}", error=True))

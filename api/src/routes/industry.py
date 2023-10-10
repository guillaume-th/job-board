from flask import Blueprint, abort, jsonify, request
from connect import db
from controllers.IndustryController import IndustryController

industry_routes = Blueprint('industry_routes', __name__)


@industry_routes.route("/", methods=["GET" , "POST"])
def industry(params:str=None):
    if request.method == "GET":
        try:
            return IndustryController().get_all(params)
        except Exception as e:
            abort(jsonify(message=f"Error on industry get_all: {e}", error=True))
    
    if request.method == "POST":
        try:
            data = request.get_json()
            industry = IndustryController().create(data)
            db.session.add(industry)
            db.session.commit()
            return industry
        except Exception as e:
            abort(jsonify(message=f"Error on industry create: {e}", error=True))
    
@industry_routes.route("/<int:id>", methods=["PUT" , "GET" , "DELETE"])
def Industry(id :int):
    if request.method == "GET":
        try:
            return IndustryController().get(id)
        except Exception as e:
            abort(jsonify(message=f"Error on industry get_one: {e}", error=True))
    if request.method == "PUT":
        try:
            data = request.get_json()
            industry = IndustryController().create(data)
            db.session.add(industry)
            db.session.commit()
            return industry
        except Exception as e:
            abort(jsonify(message=f"Error on industry update: {e}", error=True))
    
    if request.method == "DELETE":
        try:
            industry = IndustryController().get(id)
            db.session.delete(industry)
            db.session.commit()
        except Exception as e:
            abort(jsonify(message=f"Error on industry delete: {e}", error=True))
        

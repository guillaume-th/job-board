from flask import Blueprint, abort, jsonify, request
from connect import db
from controllers.MessageController import MessageController
from schema.MessageSchema import MessageSchema

message_routes = Blueprint('message_routes', __name__)


@message_routes.route("/", methods=["GET", "POST"])
def all_create_message():
    if request.method == "GET":
        try:
            schema = MessageSchema(many=True)
            Message = MessageController().get_all()
            response = schema.dump(Message)

            return {"data": response}

        except Exception as e:
            abort(
                jsonify(message=f"Error on message get_all: {e}", error=True))

    if request.method == "POST":
        try:
            data = request.get_json()
            message = MessageController().create(data)
            db.session.add(message)
            db.session.commit()
            schema = MessageSchema()
            response = schema.dump(message)

            return {"data": response}

        except Exception as e:
            abort(
                jsonify(message=f"Error on message create: {e}", error=True))


@message_routes.route("/<int:id>", methods=["PUT", "GET", "DELETE"])
def messages(id: int):
    if request.method == "GET":

        try:
            schema = MessageSchema()
            Message = MessageController().get_all_messages_by_job_id(id)
            response = schema.dump(Message)

            return {"data": response}

        except Exception as e:
            abort(
                jsonify(message=f"Error on message get_one: {e}", error=True))
            
@message_routes.route("/advertisement/<int:id>", methods=["PUT", "GET", "DELETE"])
def Message(id: int):
    if request.method == "GET":

        try:
            schema = MessageSchema()
            Message = MessageController().get(id)
            response = schema.dump(Message)

            return {"data": response}

        except Exception as e:
            abort(
                jsonify(message=f"Error on message get_one: {e}", error=True))

    if request.method == "PUT":
        try:
            data = request.get_json()
            message = MessageController().update(data, id)
            db.session.commit()
            schema = MessageSchema()
            response = schema.dump(message)

            return {"data": response}

        except Exception as e:
            abort(
                jsonify(message=f"Error on message update: {e}", error=True))

    if request.method == "DELETE":
        try:
            message = MessageController().get(id)
            db.session.delete(message)
            db.session.commit()

            return {"error": False}

        except Exception as e:
            abort(
                jsonify(message=f"Error on message delete: {e}", error=True))
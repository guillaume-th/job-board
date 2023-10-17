from flask import Blueprint, abort, jsonify, request
from connect import db
from controllers.JobApplicationController import JobApplicationController
from schema.JobApplicationSchema import JobApplicationSchema

job_application_routes = Blueprint('applications', __name__)


@job_application_routes.route("/", methods=["GET", "POST"])
def job_applications(params: str = None):
    if request.method == "GET":
        try:
            schema = JobApplicationSchema(many=True)
            job_application = JobApplicationController().get_all(params)
            response = schema.dump(job_application)

            return {"data": response}

        except Exception as e:
            abort(
                jsonify(message=f"Error on JobApplication get_all: {e}", error=True))

    if request.method == "POST":
        try:
            data = request.get_json()
            JobApplication = JobApplicationController().create(data)
            db.session.add(JobApplication)
            db.session.commit()
            schema = JobApplicationSchema()
            response = schema.dump(JobApplication)

            return {"data": response}

        except Exception as e:
            abort(
                jsonify(message=f"Error on JobApplication create: {e}", error=True))


@job_application_routes.route("/<int:id>", methods=["PUT", "GET", "DELETE"])
def job_application(id: int):
    if request.method == "GET":

        try:
            schema = JobApplicationSchema()
            job_application = JobApplicationController().get(id)
            response = schema.dump(job_application)

            return {"data": response}

        except Exception as e:
            abort(
                jsonify(message=f"Error on JobApplication get_one: {e}", error=True))

    if request.method == "PUT":
        try:
            data = request.get_json()
            JobApplication = JobApplicationController().update(data, id)
            db.session.commit()
            schema = JobApplicationSchema()
            response = schema.dump(JobApplication)

            return {"data": response}

        except Exception as e:
            abort(
                jsonify(message=f"Error on JobApplication update: {e}", error=True))

    if request.method == "DELETE":
        try:
            JobApplication = JobApplicationController().get(id)
            db.session.delete(JobApplication)
            db.session.commit()

            return {"error": False}

        except Exception as e:
            abort(
                jsonify(message=f"Error on JobApplication delete: {e}", error=True))

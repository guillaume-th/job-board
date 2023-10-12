from flask import Blueprint, abort, jsonify, request

from schema.SkillSchema import SkillSchema
from schema.UpdateSkillSchema import UpdateSkillSchema
from schema.CreateSkillSchema import CreateSkillSchema

from controllers.SkillController import SkillController

skill_routes = Blueprint('skill_routes', __name__)


@skill_routes.route("/", methods=["GET", "POST"])
def skills():
    try:
        if request.method == "GET":
            schema = SkillSchema(many=True)
            skills = SkillController().get_all()
            response = schema.dump(skills)

            return {"data": response}

        if request.method == "POST":
            schema = CreateSkillSchema()
            data = schema.load(request.get_json())
            skill = SkillController().create(data)

            return {"data": SkillSchema().dump(skill)}

    except Exception as e:
        abort(jsonify(message=f"Error on Skill route: {e}", error=True))


@skill_routes.route("/<int:id>", methods=["GET", "PUT", "DELETE"])
def skill(id: int):
    try:
        skill_controller = SkillController()
        if request.method == "GET":
            skill = skill_controller.get(id)
            response = SkillSchema().dump(skill)

            return {"data": response}

        if request.method == "PUT":
            schema = UpdateSkillSchema()
            data = schema.load(request.get_json())
            skill = skill_controller.update(id, data)
            response = SkillSchema().dump(skill)

            return {"data": response}

        if request.method == "DELETE":
            skill_controller.delete(id)

            return {"error": False}

    except Exception as e:
        abort(jsonify(message=f"Error on skill route: {e}", error=True))

from flask import Flask
from dotenv import dotenv_values
from flask_cors import CORS

# Models
from models.Advertisement import Advertisement
from models.Company import Company
from models.Industry import Industry
from models.JobApplication import JobApplication
from models.Skill import Skill
from models.User import User
from models.Message import Message
from connect import db

# Schemas
from schema.AdvertisementSchema import AdvertisementSchema
from schema.CompanySchema import CompanySchema
from schema.IndustrySchema import IndustrySchema
from schema.JobApplicationSchema import JobApplicationSchema
from schema.MessageSchema import MessageSchema
from schema.SkillSchema import SkillSchema
from schema.UserSchema import UserSchema


from routes.users import user_routes
from routes.advertisements import advertisements_routes
from routes.companies import company_routes
from routes.industries import industry_routes
from routes.skills import skill_routes
from routes.message import message_routes
from routes.job_application import JobApplication_routes

config = dotenv_values(".env")
DB_URI = "mysql+pymysql://{user}:{password}@localhost/{db_name}?charset=utf8mb4".format(
    user=config.get("DATABASE_USER"), password=config.get("DATABASE_PASSWORD"), db_name=config.get("DATABASE_NAME"))


app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
app.register_blueprint(user_routes, url_prefix="/api/users")
app.register_blueprint(advertisements_routes, url_prefix="/api/advertisements")
app.register_blueprint(company_routes, url_prefix="/api/companies")
app.register_blueprint(industry_routes, url_prefix="/api/industries")
app.register_blueprint(skill_routes, url_prefix="/api/skills")
app.register_blueprint(message_routes, url_prefix="/api/message")
app.register_blueprint(JobApplication_routes, url_prefix="/api/JobApplication")

app.config["SQLALCHEMY_DATABASE_URI"] = DB_URI
db.init_app(app)

with app.app_context():
    db.create_all()

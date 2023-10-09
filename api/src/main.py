from flask import Flask
from dotenv import dotenv_values

from db.models.Advertisement import Advertisement
from db.models.Company import Company
from db.models.Industry import Industry
from db.models.JobApplication import JobApplication
from db.models.Skill import Skill
from db.models.User import User
from db.connect import db


config = dotenv_values(".env")
DB_URI = "mysql+pymysql://{user}:{password}@localhost/{db_name}?charset=utf8mb4".format(
    user=config.get("DATABASE_USER"), password=config.get("DATABASE_PASSWORD"), db_name=config.get("DATABASE_NAME"))


app = Flask(__name__)


app.config["SQLALCHEMY_DATABASE_URI"] = DB_URI
db.init_app(app)

with app.app_context():
    db.create_all()

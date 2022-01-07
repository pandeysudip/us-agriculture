from flask import Flask, render_template, redirect, jsonify
from pymongo import MongoClient
from flask_pymongo import PyMongo
import ag_news
import json
from bson import json_util
from mongopass1 import user, passo
import os


# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
# mongo = PyMongo(app, uri="mongodb://localhost:27017/mars_app")
# client = MongoClient(
# f'mongodb+srv://{user}:{passo}@cluster.lymw3.mongodb.net/usa-agriculture?retryWrites=true&w=majority')


app.config["MONGO_URI"] = f'mongodb+srv://{user}:{passo}@cluster.lymw3.mongodb.net/usa-agriculture?retryWrites=true&w=majority'
#os.environ.get('MONGODB_URI', '')
mongo = PyMongo(app, tls=True)

# create database
#db = mongo['us-agriculture']
db = mongo.db.usag
# creating collection
field_crops = db['field_crops']
vegetables = db['vegetables']
fruits = db['fruits']
weather = db['weather']
news = db['news']
croplist = db['croplist']


@app.route('/')
def home():
    # Return the template
    return render_template('app_home.html')


@app.route('/index.html')
def index():
    # Store the entire collection as a list
    # Return the template
    return render_template('index.html')


@app.route('/dashboard.html')
def dashboard_index():
    # Store the entire collection as a list
    # Return the template
    return render_template('dashboard.html')


@app.route('/plots.html')
def plots_index():

    # Return the template
    return render_template('plots.html')


@app.route('/contact.html')
def contact():
    # Return the template
    return render_template('contact.html')


@app.route('/crops_map.html')
def field_crops_index():
    # Store the entire collection as a list

    # Return the template
    return render_template('crops_map.html')


@app.route('/fruits_map.html')
def fruits_index():
    # Store the entire collection as a list

    # Return the template
    return render_template('fruits_map.html')


@app.route('/vegetables_map.html')
def vegetables_index():
    # Store the entire collection as a list

    # Return the template
    return render_template('vegetables_map.html')


@app.route('/weather.html')
def weather_index():
    # Store the entire collection as a list

    # Return the template
    return render_template('weather.html')


@app.route('/data.html')
def data_index():
    # Store the entire collection as a list

    # Return the template
    return render_template('data.html')


@app.route('/all_crops.html')
def all_index():

    # Return the template
    return render_template('all_crops.html')


@app.route('/news.html')
def news_index():
    # Find one record of data from the mongo database
    news_list = news.find_one()
    crop_list = croplist.find_one()

    # Return the template with the teams list passed in
    return render_template('news.html', mission_news=news_list, mission_cropslist=crop_list)

# Route that will trigger the scrape function


@app.route("/scraper/<name>")
def news_scraper(name):
    # Run the scrape function
    news_datas = ag_news.scrape(name)
    # Update the Mongo database using update and upsert=True
    news.update({}, news_datas, upsert=True)
    # Redirect back to home page
    return redirect("/news.html")


@app.route("/data/crops")
def get_crops():
    crops_list = list(field_crops.find())
    return json.dumps(crops_list, default=json_util.default)


@app.route("/data/fruits")
def get_fruits():
    fruits_list = list(fruits.find())
    return json.dumps(fruits_list, default=json_util.default)


@app.route("/data/vegetables")
def get_vege():
    vegetables_list = list(vegetables.find())
    return json.dumps(vegetables_list, default=json_util.default)


@app.route("/data/weather")
def get_weather():
    weather_list = list(weather.find())
    return json.dumps(weather_list, default=json_util.default)


@app.route("/data/croplist")
def get_croplist():
    clist = list(croplist.find())
    return json.dumps(clist, default=json_util.default)


@app.route("/data/news")
def get_news():
    nlist = list(news.find())
    return json.dumps(nlist, default=json_util.default)


@app.route("/data/scraper/<name>")
def news_scrape(name):
    # Run the scrape function
    news_datas = ag_news.scrape(name)
    # Update the Mongo database using update and upsert=True
    news.update({}, news_datas, upsert=True)
    # Redirect back to home page
    return redirect("/data/news")


@app.route("/data/all_crops")
def get_all():
    crops_list = list(field_crops.find())
    vegetable_list = list(vegetables.find())
    fruits_list = list(fruits.find())
    all_list = crops_list+vegetable_list+fruits_list
    return json.dumps(all_list, default=json_util.default)


if __name__ == "__main__":
    app.run(debug=True)

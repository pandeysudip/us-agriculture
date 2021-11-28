from flask import Flask, render_template, redirect, jsonify
from pymongo import MongoClient
import ag_news
import json
from bson import json_util


# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
# mongo = PyMongo(app, uri="mongodb://localhost:27017/mars_app")
client = MongoClient("mongodb://localhost:27017")
db = client['us-agriculture']
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
    crops_list = list(field_crops.find())
    vegetable_list = list(vegetables.find())
    fruits_list = list(fruits.find())
    weather_list = list(weather.find())
    news_list = list(news.find())

    # Return the template
    return render_template('index.html', crops_list=crops_list, vegetable_list=vegetable_list, fruits_list=fruits_list, weather_list=weather_list, news_list=news_list)


@app.route('/dashboard.html')
def dashboard_index():
    # Store the entire collection as a list
    crops_list = list(field_crops.find())
    vegetable_list = list(vegetables.find())
    fruits_list = list(fruits.find())
    weather_list = list(weather.find())
    news_list = list(news.find())
    # Return the template
    return render_template('dashboard.html', crops_list=crops_list, vegetable_list=vegetable_list, fruits_list=fruits_list, weather_list=weather_list, news_list=news_list)


@app.route('/plots.html')
def plots_index():
    # Store the entire collection as a list
    crops_list = list(field_crops.find())
    vegetable_list = list(vegetables.find())
    fruits_list = list(fruits.find())
    weather_list = list(weather.find())
    news_list = list(news.find())

    # Return the template
    return render_template('plots.html', crops_list=crops_list, vegetable_list=vegetable_list, fruits_list=fruits_list, weather_list=weather_list, news_list=news_list)


@app.route('/crops_map.html')
def field_crops_index():
    # Store the entire collection as a list
    crop_list = list(field_crops.find())
    crops_list = json.dumps(crop_list, default=json_util.default)
    # Return the template
    return render_template('crops_map.html', crops_list=crops_list)


@app.route('/fruits_map.html')
def fruits_index():
    # Store the entire collection as a list
    fruits_list = list(fruits.find())
    # Return the template
    return render_template('fruits_map.html', fruits_list=fruits_list)


@app.route('/vegetables_map.html')
def vegetables_index():
    # Store the entire collection as a list
    vegetable_list = list(vegetables.find())

    # Return the template
    return render_template('vegetables_map.html',  vegetable_list=vegetable_list)


@app.route('/weather.html')
def weather_index():
    # Store the entire collection as a list
    weather_list = list(weather.find())
    # Return the template
    return render_template('weather.html', weather_list=weather_list)


@app.route('/data.html')
def data_index():
    # Store the entire collection as a list
    crops_list = list(field_crops.find())
    vegetable_list = list(vegetables.find())
    fruits_list = list(fruits.find())
    weather_list = list(weather.find())
    news_list = list(news.find())

    # Return the template
    return render_template('data.html', crops_list=crops_list, vegetable_list=vegetable_list, fruits_list=fruits_list, weather_list=weather_list, news_list=news_list)


@app.route('/all_crops.html')
def all_index():
    # Store the entire collection as a list
    crops_list = list(field_crops.find())
    vegetable_list = list(vegetables.find())
    fruits_list = list(fruits.find())
    weather_list = list(weather.find())
    news_list = list(news.find())

    # Return the template
    return render_template('all_crops.html', crops_list=crops_list, vegetable_list=vegetable_list, fruits_list=fruits_list, weather_list=weather_list, news_list=news_list)


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


@app.route("/data/all_crops")
def get_all():
    crops_list = list(field_crops.find())
    vegetable_list = list(vegetables.find())
    fruits_list = list(fruits.find())
    all_list = crops_list+vegetable_list+fruits_list
    return json.dumps(all_list, default=json_util.default)


if __name__ == "__main__":
    app.run(debug=True)

from flask import Flask, render_template, redirect
from pymongo import MongoClient
import ag_news

# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
#mongo = PyMongo(app, uri="mongodb://localhost:27017/mars_app")
client = MongoClient("mongodb://localhost:27017")
db = client['us-agriculture']
# creating collection
field_crops = db['field_crops']
vegetables = db['vegetables']
fruits = db['fruits']
weather = db['weather']
news = db['news']


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
    crops_list = list(field_crops.find())
    vegetable_list = list(vegetables.find())
    fruits_list = list(fruits.find())
    weather_list = list(weather.find())
    news_list = list(news.find())

    # Return the template
    return render_template('crops_map.html', crops_list=crops_list, vegetable_list=vegetable_list, fruits_list=fruits_list, weather_list=weather_list, news_list=news_list)


@app.route('/fruits_map.html')
def fruits_index():
    # Store the entire collection as a list
    crops_list = list(field_crops.find())
    vegetable_list = list(vegetables.find())
    fruits_list = list(fruits.find())
    weather_list = list(weather.find())
    news_list = list(news.find())

    # Return the template
    return render_template('fruits_map.html', crops_list=crops_list, vegetable_list=vegetable_list, fruits_list=fruits_list, weather_list=weather_list, news_list=news_list)


@app.route('/vegetables_map.html')
def vegetables_index():
    # Store the entire collection as a list
    crops_list = list(field_crops.find())
    vegetable_list = list(vegetables.find())
    fruits_list = list(fruits.find())
    weather_list = list(weather.find())
    news_list = list(news.find())

    # Return the template
    return render_template('vegetables_map.html', crops_list=crops_list, vegetable_list=vegetable_list, fruits_list=fruits_list, weather_list=weather_list, news_list=news_list)


@app.route('/weather.html')
def weather_index():
    # Store the entire collection as a list
    crops_list = list(field_crops.find())
    vegetable_list = list(vegetables.find())
    fruits_list = list(fruits.find())
    weather_list = list(weather.find())
    news_list = list(news.find())

    # Return the template
    return render_template('weather.html', crops_list=crops_list, vegetable_list=vegetable_list, fruits_list=fruits_list, weather_list=weather_list, news_list=news_list)


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


@app.route('/news.html')
def news_index():
    # Find one record of data from the mongo database
    news_list = news.find_one()

    # Return the template with the teams list passed in
    return render_template('news.html', mission_news=news_list)

# Route that will trigger the scrape function


@app.route("/news.html/scrape")
def scrape():
    # Run the scrape function
    news_datas = ag_news.scrape()
    # Update the Mongo database using update and upsert=True
    news.update({}, news_datas, upsert=True)
    # Redirect back to home page
    return redirect("/")


if __name__ == "__main__":
    app.run(debug=True)

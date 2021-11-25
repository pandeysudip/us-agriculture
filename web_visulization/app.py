from flask import Flask, render_template, redirect
from pymongo import MongoClient
import news

# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
#mongo = PyMongo(app, uri="mongodb://localhost:27017/mars_app")
client = MongoClient("mongodb://localhost:27017")
db = client['us-agriculture']
# creating collection
News = db['news']
Cropslist = db['cropslist']


@app.route("/")
def home():

    # Find one record of data from the mongo database
    News_data = News.find_one()
    Cropslist_data = Cropslist.find()

    # Return template and data
    return render_template("index.html", mission_news=News_data, mission_cropslist=Cropslist_data)


# Route that will trigger the scrape function
@app.route("/scrape/<name>")
def scrape(name):

    # Run the scrape function
    news_datas = news.scraper(name)
    # Update the Mongo database using update and upsert=True
    News.update({}, news_datas, upsert=True)
    # marscollection.insert_one(item)
    # Redirect back to home page
    return redirect("/")


if __name__ == "__main__":
    app.run(debug=True)

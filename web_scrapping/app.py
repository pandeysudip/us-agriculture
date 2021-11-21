from flask import Flask, render_template, redirect
from pymongo import MongoClient
import news

# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
#mongo = PyMongo(app, uri="mongodb://localhost:27017/mars_app")
client = MongoClient("mongodb://localhost:27017")

ag_news = client.AgNews.news  # collection name
# Route to render index.html template using data from Mongo


@app.route("/")
def home():

    # Find one record of data from the mongo database
    news_data = ag_news.find_one()

    # Return template and data
    return render_template("index.html", mission_news=news_data)


# Route that will trigger the scrape function
@app.route("/scrape")
def scrape():

    # Run the scrape function
    news_datas = news.scraper()

    # Update the Mongo database using update and upsert=True
    ag_news.update({}, news_datas, upsert=True)

    # Redirect back to home page
    return redirect("/")


if __name__ == "__main__":
    app.run(debug=True)

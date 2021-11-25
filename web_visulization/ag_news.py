import time
import pandas as pd
from splinter import Browser
from bs4 import BeautifulSoup
from webdriver_manager.chrome import ChromeDriverManager


def scrape():
    # set up Splinter
    executable_path = {"executable_path": ChromeDriverManager().install()}
    browser = Browser('chrome', **executable_path, headless=True)

    # visit news page
    x = 'maze'
    url = f"https://www.agriculture.com/search?search_api_views_fulltext={x}&sort_by=search_api_relevance&sort_by=search_api_relevance"
    browser.visit(url)

    time.sleep(2)

    # scrape page into soup
    html = browser.html
    soup = BeautifulSoup(html, "lxml")

    # get the data
    div = soup.find('div', {'class': 'content'})
    news_title = div.find('h2').text
    news_p = div.find('div', {'class': 'field-body'}).text
    featured_image = soup.find_all('img')[0]["data-srcset"]
    news_image_url = featured_image[:-5]
    # store data in dictionary
    news_data = {
        'news_title': news_title,
        'news_p': news_p,
        'news_image_url': news_image_url
    }

    # visit image

    url2 = f"https://world-crops.com/{x}/"
    browser.visit(url2)

    time.sleep(2)

    # scrape page into soup
    html_img = browser.html
    soup_img = BeautifulSoup(html_img, "lxml")

    # get the data

    image = soup_img.find_all('img')[0]["src"]

    # store data in dictionary

    news_data['image'] = image

    browser.quit()
    return news_data

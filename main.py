import csv
import time
from selenium import webdriver
import eel
import requests
from bs4 import BeautifulSoup
import lxml
import os


options = webdriver.ChromeOptions()
options.add_argument("headless")
options.add_argument('--ignore-certificate-errors')
options.add_argument('--ignore-ssl-errors')


@eel.expose
def main(path, filename, keyboard):
    url = f'https://funkeys.com.ua/shop/{keyboard.lower()}'

    browser = webdriver.Chrome('web/chromedriver.exe', options=options)
    browser.get(url)
    time.sleep(3)
    html = browser.page_source

    soup = BeautifulSoup(html, 'lxml')

    cards = soup.find_all('div', class_='t-store__card')

    with open(f'{path}/{filename}.csv', mode='w', newline='') as file:
        writer = csv.writer(file, delimiter=';')
        writer.writerow(
            (
                'Название',
                'Цена',
                'Наличие'
            )
        )

    for card in cards:
        name = card.find('div', class_='js-product-name').text
        price = card.find('div', class_='js-product-price').text

        try:
            availability = card.find('div', class_='js-store-prod-sold-out').text
        except Exception:
            availability = 'В наличии'

        with open(f'{path}/{filename}.csv', mode='a', newline='', errors='ignore') as file:
            writer = csv.writer(file, delimiter=';')
            writer.writerow(
                (
                    name,
                    price,
                    availability
                )
            )

    return True

eel.init(f'{os.path.dirname(os.path.realpath(__file__))}/web')

eel.start('main.html', size=(1000, 800))



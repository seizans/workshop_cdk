import numpy
import requests

def rando():
    return numpy.random.rand()

def goog():
    resp = requests.get('https://google.com')
    return resp.text
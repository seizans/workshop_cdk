import json

import numpy
import requests

def rando():
    return numpy.random.rand()

def goog():
    resp = requests.get('google.com')
    return json.loads(resp.text)
import pymongo

from sys import path
path.insert(0, '../')
from plugins.config import Config

class DatabaseHelper:
    def __init__(self):
        self.client = pymongo.MongoClient(Config().db_url)

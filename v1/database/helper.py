import pymongo

from sys import path
path.insert(0, '../')
from plugins.config import Config

from .users import UsersDatabaseHelper
from .categories import CategoriesDatabaseHelper
from .admins import AdminsDatabaseHelper
from .articles import ArticlesDatabaseHelper
from .ads import AdsDatabaseHelper
from .tickets import TicketsDatabaseHelper
from .products import ProductsDatabaseHelper

class DatabaseHelper:
    def __init__(self):
        self.client = pymongo.MongoClient(Config().db_url)
        self.categories= CategoriesDatabaseHelper()
        self.admins= AdminsDatabaseHelper()
        self.ads= AdsDatabaseHelper()
        self.articles= ArticlesDatabaseHelper(self.client)
        self.tickets= TicketsDatabaseHelper(self.client)
        self.users= UsersDatabaseHelper(self.client)
        self.products= ProductsDatabaseHelper(self.client)
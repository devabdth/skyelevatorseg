import os
import pymongo
import time
import datetime
from bson.objectid import ObjectId


import sys
sys.path.insert(0, '../')

from plugins.config import Config
from models.product import Product

class ProductsDatabaseHelper:
    def __init__(self, client: pymongo.MongoClient):
        self.cfg: Config = Config()
        self.client: pymongo.MongoClient = client
        self.database = self.client["skyElevators"]
        self.products_collection = self.database["products"]
        self.all_products = []
        self.refresh_all_products()

    def refresh_all_products(self):
        self.all_products = [Product(
            product) for product in list(self.products_collection.find())]

    def get_product_by_id(self, product_id) -> Product:
        products = self.products_collection.find({'id': product_id})
        return Product(dict(list(products)[0]))

    def get_all_products(self):
        self.refresh_all_products()
        return self.all_products

    def get_multiple_products_by_id(self, ids: list):
        products = self.products_collection.find({'_id': {'$in': [ObjectId(
            _id) if type(_id) is str else ObjectId(_id['id']) for _id in ids]}})
        return [Product(dict(prod)) for prod in list(products)]

    def get_all_products_by_category(self, cat_id: int):
        products = self.products_collection.find({
            'category': cat_id,
        })
        return [Product(dict(prod)) for prod in list(products)]

    def get_products_by_filterization(self, search_params):
        products = self.products_collection.find(search_params)
        return [Product(dict(prod)) for prod in list(products)]

    def get_products_similer_to(self, similers: list):
        return self.all_products

    def update_product(self, product_: dict) -> bool:
        try:
            product_['name']= {
                'EN': product_['enName'],
                'AR': product_['arName'],
            }
            del product_['enName']
            del product_['arName']

            product_['bio']= {
                'EN': product_['enBio'],
                'AR': product_['arBio'],
            }
            del product_['enBio']
            del product_['arBio']

            self.products_collection.find_one_and_update({'id': product_['id']}, {'$set': product_})
            self.refresh_all_products()

            return True

        except Exception as e:
            print(e)
            return False


    def create_product(self, product_: dict, files) -> bool:
        try:
            import secrets
            product_id= secrets.token_hex(12)
            product: Product = Product({
                    "id": product_id,
                    "name": {'EN': product_["enName"], 'AR': product_['arName']},
                    "bio": {'EN': product_["enBio"], 'AR': product_['arBio']},
                    "assets": [asset_name.split('-')[1] if 'asset-' in assen_name else asset_name for asset_name in list(dict(files).keys())],
                    "category": product_["category"],
                    "specs":  {},
                    "tags":  product_['tags'],
                    "alt":  product_['alt'],
            })
            product = self.products_collection.insert_one(product.to_dict())
            self.refresh_all_products()
            if product.inserted_id is not None:
                for file_ in files.values():
                    file_.save(os.path.abspath(os.path.join(os.path.dirname(__file__), '../assets/products/images/{}-{}.{}'.format(
                        product_id, list(files.values()).index(file_), file_.filename.split('.')[-1]))))

            return product.inserted_id != None
        except Exception as e:
            print(e)
            return False

    def delete_product(self, prodId):
        try:
            self.products_collection.delete_one({'id': prodId})
            return True
        except Exception as e:
            print(e)
            return False
            raise e

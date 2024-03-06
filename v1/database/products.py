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

    def update_product(self, product_: dict, files) -> bool:
        try:
            product: Product = self.get_product_by_id(product_["id"])
            for asset in product.assets:
                if asset not in product_["assets"]:
                    path_ = os.path.abspath(os.path.join(os.path.dirname(
                        __file__), '../routers/assets/products/{}-{}'.format(product_["id"], asset)))
                    if asset in product_["assets"]:
                        product_["assets"].remove(asset)
                    if os.path.exists(path_):
                        os.remove(path_)

            newAssetsNames = []
            for file_ in files.values():
                newAssetsNames.append("{}.{}".format(
                    list(files.values()).index(file_), file_.filename.split('.')[-1]))
                file_.save(os.path.abspath(os.path.join(os.path.dirname(__file__), '../routers/assets/products/{}-{}.{}'.format(
                    product.id, list(files.values()).index(file_), file_.filename.split('.')[-1]))))
                product_["assets"].remove(file_.filename)

            product.code = product_["code"]
            product.name = product_["name"]
            product.bio = product_["bio"]
            product.specs = product_["specs"]
            product.pricing = product_["pricing"]
            product.vat = product_["vat"]
            assets_ = list(set(list(newAssetsNames + product_["assets"])))
            product.assets = ["{}.{}".format(assets_.index(
                asset_name), asset_name.split('.')[-1]) for asset_name in assets_]
            product.category = product_["category"]
            product.sub_category = int(product_["subCategory"])
            product.colors = product_['colors']
            product.sizes = product_['sizes']
            product.inventory = product_['inventory']
            self.products_collection.find_one_and_update(
                {'_id': ObjectId(product.id)}, {'$set': product.to_dict()})
            self.refresh_all_products()

            return True
        except Exception as e:
            print(e)
            return False

    def create_product(self, product_: dict, files) -> bool:
        try:

            product: Product = Product(
                id="fsdfsd",
                code=product_["code"],
                name=product_["name"],
                bio=product_["bio"],
                specs=product_["specs"],
                pricing=product_["pricing"],
                vat=product_["vat"],
                assets=["{}.{}".format(list(product_["assets"]).index(asset), list(product_["assets"])[
                        product_["assets"].index(asset)].split('.')[-1]) for asset in product_["assets"]],
                category=product_["category"],
                sub_category=int(product_["subCategory"]),
                colors=product_['colors'],
                sizes=product_['sizes'],
                inventory={}
            )
            product = self.products_collection.insert_one(product.to_dict())
            self.refresh_all_products()
            if product.inserted_id is not None:
                for file_ in files.values():
                    file_.save(os.path.abspath(os.path.join(os.path.dirname(__file__), '../routers/assets/products/{}-{}.{}'.format(
                        product.inserted_id, list(files.values()).index(file_), file_.filename.split('.')[-1]))))

            return product.inserted_id != None
        except Exception as e:
            print(e)
            return False

    def delete_product(self, prodId):
        try:
            self.products_collection.delete_one({'_id': ObjectId(prodId)})
            return True
        except Exception as e:
            print(e)
            return False
            raise e

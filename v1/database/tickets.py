from os.path import dirname, abspath, join, exists
from datetime import datetime
import pymongo
import secrets
from plugins.consts import Consts
from bson.objectid import ObjectId
from pandas import DataFrame


class TicketsDatabaseHelper:
    def __init__(self, client: pymongo.MongoClient):
        self.consts: Consts= Consts()
        self.client: pymongo.MongoClient = client
        self.database = self.client["skyElevators"]
        self.tickets_collection = self.database["tickets"]
        
    def create_ticket(self, payload):
        try:
            id= str(secrets.token_hex(12))
            payload['id']= id
            ticket = self.tickets_collection.insert_one(payload)
            if not ticket.inserted_id:
                return id
            return None
            
        except Exception as e:
            print(e)
            return None

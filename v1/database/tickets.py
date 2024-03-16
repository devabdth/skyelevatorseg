from os.path import dirname, abspath, join, exists
from datetime import datetime
import pymongo
import secrets
from plugins.consts import Consts
from bson.objectid import ObjectId
from pandas import DataFrame
import time


class TicketsDatabaseHelper:
    def __init__(self, client: pymongo.MongoClient):
        self.consts: Consts= Consts()
        self.client: pymongo.MongoClient = client
        self.database = self.client["skyElevators"]
        self.tickets_collection = self.database["tickets"]
        self.installation_tickets_collection = self.database["installation_tickets"]
        self.maintenance_tickets_collection = self.database["maintenance_tickets"]
        self.spare_parts_tickets_collection = self.database["spare_parts_tickets"]
        self.modernization_tickets_collection = self.database["modernization_tickets"]
        self.global_tickets_collection = self.database["global_tickets"]

    def refresh_all_tickets(self):
        try:
            self.installations_tickets= [dict(ticket) for ticket in self.installation_tickets_collection.find(filter= {'mode': 1}, sort= [("time", 1)])]
            self.archived_installations_tickets= [dict(ticket) for ticket in self.installation_tickets_collection.find(filter= {'mode': 0}, sort= [("archived_time", 1)])]
            self.maintenance_tickets= [dict(ticket) for ticket in self.maintenance_tickets_collection.find(filter= {'mode': 1}, sort= [("time", 1)])]
            self.archived_maintenance_tickets= [dict(ticket) for ticket in self.maintenance_tickets_collection.find(filter= {'mode': 0}, sort= [("archived_time", 1)])]
            self.spare_parts_tickets= [dict(ticket) for ticket in self.spare_parts_tickets_collection.find(filter= {'mode': 1}, sort= [("time", 1)])]
            self.archived_spare_parts_tickets= [dict(ticket) for ticket in self.spare_parts_tickets_collection.find(filter= {'mode': 0}, sort= [("archived_time", 1)])]
            self.modernization_tickets= [dict(ticket) for ticket in self.modernization_tickets_collection.find(filter= {'mode': 1}, sort= [("time", 1)])]
            self.archived_modernization_tickets= [dict(ticket) for ticket in self.modernization_tickets_collection.find(filter= {'mode': 0}, sort= [("archived_time", 1)])]
            self.global_tickets= [dict(ticket) for ticket in self.global_tickets_collection.find(filter= {'mode': 1}, sort= [("time", 1)])]
            self.archived_global_tickets= [dict(ticket) for ticket in self.global_tickets_collection.find(filter= {'mode': 0}, sort= [("archived_time", 1)])]

        except Exception as e:
            self.installations_tickets= []
            self.maintenance_tickets= []
            self.spare_parts_tickets= []
            self.modernization_tickets= []
            self.global_tickets= []

    def create_installation_ticket(self, payload):
        try:
            id= str(secrets.token_hex(12))
            payload['id']= id
            payload['mode']= 1
            payload['time']= int(round(time.time() *1000))
            payload['archive_time']= 0
            ticket = self.installation_tickets_collection.insert_one(payload)
            return ticket.inserted_id is not None
            
        except Exception as e:
            print(e)
            return False


    def create_global_ticket(self, payload):
        try:
            id= str(secrets.token_hex(12))
            payload['id']= id
            payload['mode']= 1
            payload['time']= int(round(time.time() *1000))
            payload['archive_time']= 0
            ticket = self.global_tickets_collection.insert_one(payload)
            return ticket.inserted_id is not None
            
        except Exception as e:
            print(e)
            return False


    def create_maintenance_ticket(self, payload):
        try:
            id= str(secrets.token_hex(12))
            payload['id']= id
            payload['mode']= 1
            payload['time']= int(round(time.time() *1000))
            payload['archive_time']= 0
            ticket = self.maintenance_tickets_collection.insert_one(payload)
            return ticket.inserted_id is not None
            
        except Exception as e:
            print(e)
            return False


    def create_spare_parts_ticket(self, payload):
        try:
            id= str(secrets.token_hex(12))
            payload['id']= id
            payload['mode']= 1
            payload['time']= int(round(time.time() *1000))
            payload['archive_time']= 0
            ticket = self.spare_parts_tickets_collection.insert_one(payload)
            return ticket.inserted_id is not None
            
        except Exception as e:
            print(e)
            return False


    def create_modernization_ticket(self, payload):
        try:
            id= str(secrets.token_hex(12))
            payload['id']= id
            payload['mode']= 1
            payload['time']= int(round(time.time() *1000))
            payload['archive_time']= 0
            ticket = self.modernization_tickets_collection.insert_one(payload)
            return ticket.inserted_id is not None
            
        except Exception as e:
            print(e)
            return False


    def archive_maintenance_ticket(self, ticket_id):
        try:
            res= self.maintenance_tickets_collection.find_one_and_update({'id': ticket_id}, {'$set': {'archive_time': int(round(time.time())),'mode': 0}})
            return True
        except Exception as e:
            print(e)
            return -1


    def archive_installations_ticket(self, ticket_id):
        try:
            res= self.installation_tickets_collection.find_one_and_update({'id': ticket_id}, {'$set': {'archive_time': int(round(time.time())),'mode': 0}})
            return True
        except Exception as e:
            print(e)
            return -1


    def archive_spare_parts_ticket(self, ticket_id):
        try:
            res= self.spare_parts_tickets_collection.find_one_and_update({'id': ticket_id}, {'$set': {'archive_time': int(round(time.time())),'mode': 0}})
            return True
        except Exception as e:
            print(e)
            return -1


    def archive_modernization_ticket(self, ticket_id):
        try:
            res= self.modernization_tickets_collection.find_one_and_update({'id': ticket_id}, {'$set': {'archive_time': int(round(time.time())),'mode': 0}})
            return True
        except Exception as e:
            print(e)
            return -1


    def archive_global_ticket(self, ticket_id):
        try:
            res= self.global_tickets_collection.find_one_and_update({'id': ticket_id}, {'$set': {'archive_time': int(round(time.time())),'mode': 0}})
            return True
        except Exception as e:
            print(e)
            return -1

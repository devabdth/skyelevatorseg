from models.user import User
from plugins.layout import Layout
from os.path import abspath, dirname, join
from json import loads, dumps, dump
from pandas import DataFrame
from datetime import datetime
import secrets
from plugins.consts import Consts
from bson.objectid import ObjectId
import pymongo


class UsersDatabaseHelper:
	def __init__(self, client: pymongo.MongoClient):
		self.profile_dir= abspath(join(dirname(__file__), '../assets/users/images'))
		self.consts: Consts= Consts()
		self.client: pymongo.MongoClient = client
		self.database = self.client["skyElevators"]
		self.users_collection = self.database["users"]

		self.all_users: list = [
		]

		self.refresh_all_users()


	def refresh_all_users(self):
		try:
			self.all_users = [User(user) for user in list(self.users_collection.find())]
		except Exception as e:
			print(e)

	def create_user(self, **kwargs):
		try:
			id= secrets.token_hex(12)
			res= self.users_collection.insert_one(
				{
					"id": id,
					"name": kwargs["username"],
					"email": kwargs["email"],
					"phone_number": kwargs["phone_number"],
					"password": kwargs["password"],
					"joined_in": str(datetime.now()),
					"prefered_categories": [],
					"prefered_parent_categories": [],
					"saves": [],
					"comments": [],
					"likes": [],
					"last_log_in": str(datetime.now()),
					"current_reading_article": "",
					"current_reading_section": "",
					"recent_read": []
				}
			)

			inserted_id= res.inserted_id
			if inserted_id == None:
				return False
			
			if kwargs['profile'] != None:
				if kwargs['profile'].filename.split('.')[-1] in self.consts.covers_supported_extenstions:
					kwargs['profile'].save(abspath(join(dirname(__file__), '../assets/users/profiles/', f"{inserted_id}.{kwargs['profile'].filename.split('.')[-1]}"),))

			return (inserted_id, id)
		except Exception as e:
			print(e)
			return None



	def get_users_by_id(self, ids, return_as_dicts= False):
		users = self.users_collection.find({'id': {'$in': ids}})
		if return_as_dicts:
			return [User(user).to_dict() for user in users]
		return [User(user) for user in users]
	


	def get_user_by_id(self, id):
		users = self.users_collection.find({'id': id})
		return User(users[0])
	
	def get_user_by_email(self, email):
		try:
			users = self.users_collection.find({'email': email})
			return User(users[0])
		except Exception as e:
			print(e)
			return None
		
	def update_user(self, **kwargs):
		try:
			if not ('payload' in kwargs.keys() or 'cover' in kwargs.keys() or 'profile' in kwargs.keys()):
				return False
			
			payload= kwargs['payload'] if 'payload' in kwargs.keys() else None
			profile= kwargs['profile'] if 'profile' in kwargs.keys() else None

			if 'id' in payload.keys():
				user_id= payload['id']
				del payload['id']
			res= self.users_collection.find_one_and_update({'id': user_id}, {'$set': dict(payload)})
			self.refresh_all_users()

			return True
		except Exception as e:
			print(e)
			return False

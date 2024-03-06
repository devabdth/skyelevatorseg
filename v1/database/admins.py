from datetime import datetime
from os.path import dirname, abspath, join, exists
from sys import path
from json import loads, dumps, dump
import secrets
path.insert(0, '../')

class AdminsDatabaseHelper:
	def __init__(self):
		self.admins_file: str= abspath(join(dirname(__file__), '../jsons/admins.json'))
		self.load_admins()

	def write_data(self):
		with open(self.admins_file, 'w') as f:
			admins_data= {
				admin['id']: admin for admin in self.admins
			}
			print(admins_data)

			dump(admins_data, f)

	def load_admins(self):
		self.admins: list= []
		with open(self.admins_file, 'r') as f:
			data= dict(loads(f.read()))

			for admin in data.values():
				self.admins.append(admin)

	def get_admin_by_username(self, username: str):
		for admin in self.admins:
			if admin['id'] == username or admin['username'] == username or admin['email'] == username:
				return admin

		return None


	def create_admin(self, payload):
		try:
			for admin in self.admins:
				if admin['username'] == payload['username'] or admin['name'] == payload['name'] or admin['email'] == payload['username']:
					return -1
	
			payload['id']= str(secrets.token_hex(12))
			payload['log']= []
			payload['password']= None
			payload['suspensed']= False

			self.admins.append(payload)
			self.write_data()
			return True
		except Exception as e:
			print(e)
			return False

	def update_admin(self, username, payload):
		try:
			if self.get_admin_by_username(username) == None:
				return None

			for admin in self.admins:
				if admin['id'] == username or admin['username'] == username or admin['email'] == username:
					for key in payload.keys():
						admin[key]= payload[key]

			self.write_data()

			return True
		except Exception as e:
			print(e)
			return False

	def delete_admin(self, username):
		try:
			for admin in self.admins:
				if admin['name'] == username or admin['username'] == username or admin['id'] == username:
					del self.admins[self.admins.index(admin)]
					self.write_data()
					return True
		except Exception as e:	
			print(e)
			return False

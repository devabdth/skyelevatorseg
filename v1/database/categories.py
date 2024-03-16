from os.path import dirname, abspath, join, exists
from os import remove as remove_file
from sys import path
from json import loads, dumps, dump
import secrets
from plugins.consts import Consts

path.insert(0, '../')

from models.category import Category

class CategoriesDatabaseHelper:
	def __init__(self):
		self.consts: Consts= Consts()
		self.covers_dir: str= abspath(join(dirname(__file__), '../assets/covers/categories/'))
		self.icons_dir: str= abspath(join(dirname(__file__), '../assets/icons/categories/'))
		self.cats_file: str= abspath(join(dirname(__file__), '../jsons/categories.json'))
		self.load_data()

	def write_data(self):
		try:
			with open(self.cats_file, 'w') as f:
				data= {cat.id: cat.to_dict() for cat in self.categories}
				dump(data, f)
				return True
		except Exception as e:
			print(e)
			return False

	def load_data(self):
		self.categories: list= []

		with open(self.cats_file, 'r') as f:
			data= dict(loads(f.read()))

			for cat in data.values():
				cat_= Category(cat)
				self.categories.append(cat_)

	def get_category_by_id(self, cid):
		for cat in self.categories:
			if cat.id == cid:
				return cat

	def multiple_categories_by_id(self, cats_ids):
		result= []
		for cat in self.categories:
			if cat.id in cats_ids:
				result.append(cat)

		return result

	def create_category(self, data, icon):
		try:
			cid= str(secrets.token_hex(12))

			cat= Category({
				'id': cid,
				'name': {
					'EN': data['enName'],
					'AR': data['arName'],
				},
				'bio': {
					'EN': data['enBio'],
					'AR': data['arBio'],
				},
				'tags': list(data['tags']),
				'alt': data['alt']
			})
			self.categories.append(cat)
			res= self.write_data()
			if res:
				icon.save(join(self.icons_dir, f'{cid}.{icon.filename.split(".")[-1]}'))
				return True
			return False
		except Exception as e:
			print(e)
			return False

	def delete_category(self, cat_id):
		try:
			for cat in self.categories:
				if cat.id == cat_id:
					del self.categories[self.categories.index(cat)]
					for ext in self.consts.covers_supported_extenstions:
						if exists(join(self.icons_dir, f'{cat_id}.{ext}')):
							remove_file(join(self.icons_dir, f'{cat_id}.{ext}'))
						if exists(join(self.covers_dir, f'{cat_id}.{ext}')):
							remove_file(join(self.covers_dir, f'{cat_id}.{ext}'))				

					self.write_data()
			return True
		except Exception as e:
			print(e)
			return False

	def update_category(self, payload, icon):
		try:
			cat_id= payload['id']
			del payload['id']
			payload['name']= {
				'EN': payload['enName'],
				'AR': payload['arName'],
			}
			del payload['enName']
			del payload['arName']

			payload['bio']= {
				'EN': payload['enBio'],
				'AR': payload['arBio'],
			}
			del payload['enBio']
			del payload['arBio']

			if not icon == None:
				for ext in self.consts.covers_supported_extenstions:
					if exists(join(self.icons_dir, f'{cat_id}.{ext}')):
						remove_file(join(self.icons_dir, f'{cat_id}.{ext}'))
				icon.save(join(self.icons_dir, f'{cat_id}.{icon.filename.split(".")[-1]}'))

			for cat in self.categories:
				if cat.id == cat_id:
					for key in payload.keys():
						cat.__setattr__(key, payload[key])

			self.write_data()
			return True
		except Exception as e:
			print(e)
			return False

	def update_parent_category(self, payload):
		try:
			pcat_id= payload['id']
			del payload['id']
			payload['name']= {
				'EN': payload['enName'],
				'AR': payload['arName'],
			}
			del payload['enName']
			del payload['arName']

			payload['bio']= {
				'EN': payload['enBio'],
				'AR': payload['arBio'],
			}
			del payload['enBio']
			del payload['arBio']

			for pcat in self.parent_cats:
				if pcat.id == pcat_id:
					for key in payload.keys():
						pcat.__setattr__(key, payload[key])

			pcat.categories= [self.get_category_by_id(cat) for cat in pcat.categories]

			self.write_data()
			return True
		except Exception as e:
			print(e)
			return False

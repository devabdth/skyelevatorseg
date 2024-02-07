from os.path import dirname, abspath, join, exists
from os import remove as remove_file
from sys import path
from json import loads, dumps, dump
import secrets
from plugins.consts import Consts

path.insert(0, '../')

from models.category import Category, ParentCategory

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
				data= {
					'activeCategories': [cat.to_dict() for cat in self.active_cats],
					'archivedCategories': [cat.to_dict() for cat in self.archived_cats],
					'parentCategories': [pcat.to_dict(without_cats= True) for pcat in self.parent_cats],
				}
				dump(data, f)
				return True
		except Exception as e:
			print(e)
			return False

	def load_data(self):
		self.active_cats: list= []
		self.archived_cats: list= []
		self.parent_cats: list= []

		with open(self.cats_file, 'r') as f:
			data= dict(loads(f.read()))

			for cat in data['activeCategories']:
				cat_= Category(cat)
				self.active_cats.append(cat_)

			for cat in data['archivedCategories']:
				cat_= Category(cat)
				self.active_cats.append(cat_)

			for cat in data['parentCategories']:
				categories_= []
				for category in cat['categories']:
					for active_cat in self.active_cats:
						if active_cat.id == category:
							categories_.append(active_cat)

				cat['categories']= categories_
				cat_= ParentCategory(cat)
				self.parent_cats.append(cat_)


	def get_parent_category_by_id(self, pcid):
		for pcat in self.parent_cats:
			if pcat.id == pcid:
				return pcat

	def get_category_by_id(self, cid):
		for cat in self.active_cats:
			if cat.id == cid:
				return cat

	def get_parent_category_by_category_id(self, cid):
		cat= self.get_category_by_id(cid)
		for pcat in self.parent_cats:
			if cat in pcat.categories:
				return pcat

	def get_categories_by_parent_category(self, pcid):
		pcat= self.get_parent_category_by_id(pcid)
		print(pcat.categories)
		categories=  [cat if cat in pcat.categories else None for cat in self.active_cats]
		print(categories)
		categories= list(set(categories))
		print(categories)
		if None in categories:
			del categories[categories.index(None)]

		print(categories)
		return categories
		
	def multiple_categories_by_id(self, cats_ids):
		result= []
		for cat in self.active_cats:
			if cat.id in cats_ids:
				result.append(cat)

		return result

	def create_category(self, data, icon, cover):
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
				'tags': list(data['tags'])
			})
			self.active_cats.append(cat)
			res= self.write_data()
			if res:
				icon.save(join(self.icons_dir, f'{cid}.{icon.filename.split(".")[-1]}'))
				cover.save(join(self.covers_dir, f'{cid}.{cover.filename.split(".")[-1]}'))
				return True
			return False
		except Exception as e:
			print(e)
			return False

	def create_parent_category(self, data):
		try:
			pcid= str(secrets.token_hex(12))
			pcat= ParentCategory({
					'id': pcid,
					'name': {
						'EN': data['enName'],
						'AR': data['arName'],
					},
					'bio': {
						'EN': data['enBio'],
						'AR': data['arBio'],
					},
					'tags': list(data['tags']),
					'categories': list(self.multiple_categories_by_id(data['categories'])),
			})
			self.parent_cats.append(pcat)
			res= self.write_data()
			if res:
				return True
			return False
		except Exception as e:
			print(e)
			return False


	def delete_category(self, cat_id):
		try:
			for cat in self.active_cats:
				if cat.id == cat_id:
					del self.active_cats[self.active_cats.index(cat)]
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

	def delete_parent_category(self, pcat_id):
		try:
			for pcat in self.parent_cats:
				if pcat.id == pcat_id:
					del self.parent_cats[self.parent_cats.index(pcat)]
					self.write_data()
			return True
		except Exception as e:
			print(e)
			return False

	def update_category(self, payload, icon, cover):
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

			if not cover == None:
				for ext in self.consts.covers_supported_extenstions:
					if exists(join(self.covers_dir, f'{cat_id}.{ext}')):
						remove_file(join(self.covers_dir, f'{cat_id}.{ext}'))				
				cover.save(join(self.covers_dir, f'{cat_id}.{cover.filename.split(".")[-1]}'))
			for cat in self.active_cats:
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

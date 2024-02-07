from datetime import datetime
from os.path import dirname, abspath, join, exists
from os import remove as rmdir
from sys import path
import secrets
from json import loads, dumps, dump
from models.ad import Ad
from plugins.consts import Consts
path.insert(0, '../')

from models.ad import Ad
class AdsDatabaseHelper:
	def __init__(self):
		self.ads_file: str= abspath(join(dirname(__file__), '../jsons/ads.json'))
		self.consts: Consts= Consts()
		self.load_data()

	def load_data(self):
		self.active_ads: list= []
		self.archived_ads: list= []
		with open(self.ads_file, 'r') as f:
			data= dict(loads(f.read()))

			for ad in data.values():
				ad= Ad(ad)
				self.active_ads.append(ad)

				if ad.id == 'HOME_SCREEN_AD':
					self.entry_home_ad= ad

	def write_data(self, new_ad: Ad= None):
		try:
			with open(self.ads_file, 'w') as f:
				data= {ad.id: ad.to_dict() for ad in self.active_ads}
				if new_ad != None:
					if new_ad['title'] == 'None':
						new_ad['title'] = None
					if new_ad['subtitle'] == 'None':
						new_ad['subtitle'] = None
					if new_ad['bio'] == 'None':
						new_ad['bio'] = None
					new_ad['created_in']= str(datetime.now())
					new_ad['available_till']= str(datetime.now())

					data[new_ad['id']]= new_ad
				dump(data, f)
				return True
		except Exception as e:
			print(e)
			return False



	def check_if_ad_is_active(self, ad):
		return ad in self.active_ads

	def get_ad_by_id(self, ad_id: str):
		for ad in self.active_ads:
			if ad.id == ad_id:
				return ad
			return Ad({
				'title': "None",
				'subtitle': "None",
				'bio': "None",
				'background': "transparent",
				'background_mode': "color",
				'id': "None",
				"created_in": "None",
				"available_till": "None",
				"redirect": "None",
			})

	def create_ad(self, body: dict, cover=None, bg= None):
		try:
			ad_id= str(secrets.token_hex(24))
			if body['background_mode'] == 'BG':
				if not cover == None:
					body['id']= ad_id
					ad: dict= body
					body['background']= f'{ad_id}.{cover.filename.split(".")[-1]}'
					res= self.write_data(new_ad= ad)
					if res:
						cover.save(abspath(join(dirname(__file__), f'../assets/covers/ads/{ad_id}.{cover.filename.split(".")[-1]}')))
						return True
				return False
			else:
				body['id']= ad_id
				ad: dict= body
				body['background']= bg
				res= self.write_data(new_ad= ad)
				if res:
					return True

			return False
		except Exception as e:
			print(e)
			return False

	def update_ad(self, body: dict, cover=None, bg= None):
		try:
			ad_id= body['id']
			if body['background_mode'] == 'BG':
				if not cover == None:
					ad: dict= body
					body['background']= f'{ad_id}.{cover.filename.split(".")[-1]}'
					res= self.write_data(new_ad= ad)
					if res:
						for ext in self.consts.covers_supported_extenstions:
							if exists(abspath(join(dirname(__file__), f'../assets/covers/ads/{ad_id}.{ext}'))):
								rmdir(abspath(join(dirname(__file__), f'../assets/covers/ads/{ad_id}.{ext}')))
						cover.save(abspath(join(dirname(__file__), f'../assets/covers/ads/{ad_id}.{cover.filename.split(".")[-1]}')))
						return True
				return False
			else:
				body['id']= ad_id
				ad: dict= body
				body['background']= bg
				res= self.write_data(new_ad= ad)
				if res:
					return True

			return False
		except Exception as e:
			print(e)
			return False

	def delete_ad(self, ad_id):
		try:
			for ad in self.active_ads:
				if ad.id == ad_id:
					del self.active_ads[self.active_ads.index(ad)]
					return self.write_data()
			return False					
		except Exception as e:
			print(e)
			return False
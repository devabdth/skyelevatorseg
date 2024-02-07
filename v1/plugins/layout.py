import sys
sys.path.insert(0, '../')
from os.path import abspath, dirname, join
from json import loads, dump
from models.ad_banners import AdBanner

class Layout:
	def __init__(self):
		self.layout_path= abspath(join(dirname(__file__), '../jsons/layout.json'))
		self.load()

	def load(self):
		with open(self.layout_path) as f:
			self.data= dict(loads(f.read()))
			self.home_featured_writers: list= self.data['HOME_PAGE']['featuredWriters']
			self.home_featured_articles: list= self.data['HOME_PAGE']['featuredArticles']
			self.entry_section_ad: list= self.data['HOME_PAGE']['entrySectionAd']
			self.home_featured_jobs: list= self.data['HOME_PAGE']['featuredJobs']
			self.home_featured_missed_articles: list= self.data['HOME_PAGE']['featuredMissedArticles']
			self.home_featured_random_articles: list= self.data['HOME_PAGE']['featuredRandomArticles']
			self.home_entry_section_ad: str= self.data['HOME_PAGE']['entrySectionAd']
			self.home_ad_space_one: str= self.data['HOME_PAGE']['adSpaceOne']
			self.home_ad_space_two: str= self.data['HOME_PAGE']['adSpaceTwo']
			self.home_ad_space_three: str= self.data['HOME_PAGE']['adSpaceThree']
			self.home_ad_space_four: str= self.data['HOME_PAGE']['adSpaceFour']
			self.home_ad_space_five: str= self.data['HOME_PAGE']['adSpaceFive']
			self.home_ad_space_six: str= self.data['HOME_PAGE']['adSpaceSix']
			self.home_ad_space_seven: str= self.data['HOME_PAGE']['adSpaceSeven']
			self.home_ad_space_eight: str= self.data['HOME_PAGE']['adSpaceEight']
			self.home_ad_space_nine: str= self.data['HOME_PAGE']['adSpaceNine']
			self.home_ad_space_ten: str= self.data['HOME_PAGE']['adSpaceTen']
			self.home_ad_space_eleven: str= self.data['HOME_PAGE']['adSpaceEleven']
			self.home_ad_space_twelve: str= self.data['HOME_PAGE']['adSpaceTwelve']
			self.header_tabs: list= self.data['HEADER_TABS']

			self.categories_featured_categories: list= self.data['CATEGORIES_PAGE']['featuredCategories']

	def update_home_page(self, payload):
		try:
			if 'featuredArticles' in payload.keys():
				self.data['HOME_PAGE']['featuredArticles']= payload['featuredArticles']

			if 'adsData' in payload.keys():
				if len(payload['adsData'].values()) != 0:
					for key in payload['adsData'].keys():
						self.data['HOME_PAGE'][key]= payload['adsData'][key]

			if 'writers' in payload.keys():
				self.data['HOME_PAGE']['featuredWriters']= payload['writers']

			if 'careers' in payload.keys():
				self.data['HOME_PAGE']['featuredJobs']= payload['careers']

			with open(self.layout_path, 'w') as f:
				dump(self.data, f)

			return True
		except Exception as e:
			print(e)
			return False

	def update_header_tabs(self, payload):
		try:
			self.data['HEADER_TABS']= payload['tabs']
			with open(self.layout_path, 'w') as f:
				dump(self.data, f)

			return True

		except Exception as e:
			print(e)
			return False
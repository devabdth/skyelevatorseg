import sys
sys.path.insert(0, '../')

from flask import Flask
from threading import Thread
from json import dump, dumps
from .config import Config
import datetime


class Setup:
	def __init__(self, app: Flask, socket= None):
		self.app: Flask = app
		self.cfg: Config = Config()
		self.socket = socket
		self.threads= [
			Thread(target= lambda: app.run(port= self.cfg.port, debug=self.cfg.debug, use_reloader=False, host= self.cfg.host)),
		]

	def initializiation(self):
		self.setup_files_and_directories()
		self.setup_app()
		self.setup_routers()
		self.setup_errors_routers()
		self.setup_adminstration_webapp_routes()
		self.setup_global_routers()
		self.setup_socket_handlers()
		self.assign_generate_threads()
		self.assign_filters()

	def assign_filters(self):
		@self.app.template_filter('readable_time')
		def readable_time(time):
			return datetime.datetime.fromtimestamp(time/1000)

		@self.app.template_filter('chuncking_with_length')
		def chuncking_with_length(original_list, length):
			return [original_list[i:i + length] for i in range(0, len(original_list), length)] 

		@self.app.template_filter('format_text')
		def chuncking_with_length(original_text, length):			
				return original_text if len(original_text) <= length else f"{original_text[:125]}..." 

		@self.app.template_filter('format_numbers')
		def format_numbers(num):
			if num < 1000:
				return num
			magnitude = 0
			while abs(num) >= 1000:
				magnitude += 1
				num /= 1000.0
			# add more suffixes if you need them
			return '%.2f%s' % (num, ['', 'K', 'M', 'G', 'T', 'P'][magnitude])

		@self.app.template_filter('format_price')
		def format_price(price):
			return '{:20,.2f} L.E.'.format(price)

		@self.app.template_filter('format_date')
		def format_date(date):
			import numpy as np
			if isinstance(date, (int, np.integer)):
				date= f'{datetime.datetime.fromtimestamp(date/1000.0)}'
			value= ""
			value+= date.split(" ")[0].replace("-", "/").replace("-", "/").replace("-", "/")
			value+= " "

			value+= date.split(" ")[1].split(".")[0]
			return value

	def assign_generate_threads(self):
		import time

		def articles_thread():
			while True:
				ArticlesAnalysis().report()
				time.sleep(60)

		self.threads.append(Thread(target= articles_thread))


	def setup_app(self):
		from flask_session import Session

		self.app.config["SESSION_PERMANENT"] = False
		self.app.config["SESSION_TYPE"] = "filesystem"
		self.app.config['SECRET'] = 'secret!1234'
		self.app.config['MAX_CONTENT_LENGTH'] = 1024 * 1024 * 1024
		Session(self.app)

	def setup_files_and_directories(self):
		from os.path import abspath, dirname, join, exists
		from os import mkdir
		dirs= [
			"../jsons/",
			"../assets/",
			"../assets/articles/",
			"../assets/articles/covers/",
			"../assets/products/",
			"../assets/products/images/",
			"../assets/modernization/",
			"../assets/modernization/machines/",
			"../assets/modernization/doors/",
			"../assets/modernization/controllers/",
			"../assets/modernization/decorations/",
		]
		files= [
			{
				"dir": "../jsons/routers.json",
				"initialData": {
					"WEBSITE_ROUTERS": {},
					"ADMIN_ROUTERS": {},
				}
			},
			{
				"dir": "../jsons/layout.json",
				"initialData": {
					"HOME_PAGE": {},
				}
			}
		]

		for dir_ in dirs:
			path= abspath(join(dirname(__file__), dir_))
			if not exists(path):
				mkdir(path)
			


		for file_ in files:
			path= abspath(join(dirname(__file__), file_['dir']))
			if not exists(path):
				with open(path, 'w') as f:
					if not path.split('.')[1] == 'json':
						f.write(f'{file_["initialData"]}')
					else:
						json_object= dumps(file_['initialData'], indent= 4)
						f.write(json_object)


	def setup_socket_handlers(self):
		# from socket_handlers.chatting import ChattingHandler
		# ChattingHandler(self.app, self.socket)
		pass


	def setup_errors_routers(self):
		from routers.globals.errors import ErrorsRouter
		ErrorsRouter(self.app).setup()


	def setup_adminstration_webapp_routes(self):
		from routers.admin.admin import AdminRouter
		AdminRouter(self.app).setup()

		from routers.admin.home import HomeAdminRouter
		HomeAdminRouter(self.app).setup()

		from routers.admin.users import UsersAdminRouter
		UsersAdminRouter(self.app).setup()

		from routers.admin.layout import LayoutAdminRouter
		LayoutAdminRouter(self.app).setup()

		from routers.admin.categories import CategoriesAdminRouter
		CategoriesAdminRouter(self.app).setup()

		from routers.admin.spare_parts import SparePartsAdminRouter
		SparePartsAdminRouter(self.app).setup()

		from routers.admin.admins import AdminsManagemnetAdminRouter
		AdminsManagemnetAdminRouter(self.app).setup()

		from routers.admin.articles import ArticlesAdminRouter
		ArticlesAdminRouter(self.app).setup()

		from routers.admin.tickets import TicketsAdminRouter
		TicketsAdminRouter(self.app).setup()

	def setup_global_routers(self):
		from routers.globals.config import ConfigRouter
		ConfigRouter(self.app).setup()

	def setup_routers(self):
		from routers.website.home import HomeRouter
		HomeRouter(self.app).setup()

		from routers.website.blog import BlogRouter
		BlogRouter(self.app).setup()

		from routers.website.article import ArticleRouter
		ArticleRouter(self.app).setup()

		from routers.website.assets import AssetsRouter
		AssetsRouter(self.app).setup()

		from routers.website.contact import ContactUsRouter
		ContactUsRouter(self.app).setup()

		from routers.website.auth import AuthRouter
		AuthRouter(self.app).setup()

		from routers.website.about import AboutRouter
		AboutRouter(self.app).setup()

		from routers.website.installations import InstallationsRouter
		InstallationsRouter(self.app).setup()

		from routers.website.modernization import ModernizationRouter
		ModernizationRouter(self.app).setup()

		from routers.website.maintenance import MaintenanceRouter
		MaintenanceRouter(self.app).setup()

		from routers.website.spare_parts import SparePartsRouter
		SparePartsRouter(self.app).setup()


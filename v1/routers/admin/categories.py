from flask import Flask, session, render_template, url_for, request, redirect, Response
from json import dumps, loads

from sys import path
path.insert(0, '../')
path.insert(1, '../../')

from plugins.config import Config
from plugins.content import Content
from plugins.consts import Consts
from plugins.utils import Utils
from plugins.layout import Layout
from database.helper import DatabaseHelper


class CategoriesAdminRouter:
	def __init__(self, app: Flask):
		self.app: Flask= app
		self.content: Content= Content()
		self.consts: Consts= Consts()
		self.cfg: Config= Config()
		self.helper: DatabaseHelper= DatabaseHelper()
		self.layout: Layout= Layout()
		self.utils: Utils= Utils()


	def setup(self):
		self.assign_admin_categories_index()
		self.assign_delete_category()
		self.assign_create_category()
		self.assign_update_category()
 
	def assign_delete_category(self):
		@self.app.route(self.consts.admin_categories_page, methods=["DELETE"])
		def delete_category():
			try:
				aid= session.get('ADMIN_ID')
				if  aid == None:
					return redirect(self.consts.admin_login_route)

				admin_data= self.helper.admins.get_admin_by_username(aid)
				body= dict(loads(request.data))
				
				if admin_data['password'] != body['password']:
					return self.app.response_class(status= 403)

				res= self.helper.categories.delete_category(body['categoryId'])
				if res:
					return self.app.response_class(status= 200)
				return self.app.response_class(status= 500)

			except Exception as e:
				raise e

	def assign_create_category(self):
		@self.app.route(self.consts.admin_categories_page, methods=["POST"])
		def create_category():
			try:
				aid= session.get('ADMIN_ID')
				if  aid == None:
					return redirect(self.consts.admin_login_route)

				body: dict = dict(request.form)
				icon= request.files['icon']
				res= self.helper.categories.create_category(loads(body["category"]), icon)
				if res:
					return self.app.response_class(status= 201)
				return self.app.response_class(status= 500)
			except Exception as e:
				print(e)
				return self.app.response_class(status= 500)

	def assign_update_category(self):
		@self.app.route(self.consts.admin_categories_page, methods=["PATCH"])
		def update_category():
			try:
				aid= session.get('ADMIN_ID')
				if  aid == None:
					return redirect(self.consts.admin_login_route)

				body= dict(request.form)
				icon= request.files['icon'] if 'icon' in request.files.keys() else None
				res= self.helper.categories.update_category(loads(body['category']), icon)
				if res:
					return self.app.response_class(status= 200)
				
				return self.app.response_class(status= 500)
			except Exception as e:
				print(e)
				return self.app.response_class(status= 500)


	def assign_admin_categories_index(self):
		@self.app.route(self.consts.admin_categories_page, methods=["GET"])
		def admin_categories_index():
			aid= session.get('ADMIN_ID')
			if  aid == None:
				return redirect(self.consts.admin_login_route)

			admin_data= self.helper.admins.get_admin_by_username(aid)
			if '6' not in admin_data['accesses']:
				return redirect(self.consts.admin_main_page)				

			self.layout.load()
			self.helper.admins.load_admins()
			lang= session.get('LANG', 'EN')
			mode= session.get('MODE', 'DARK')
			return render_template(
				'/admin/categories.html',
				content= self.content,
				cfg= self.cfg,
				consts= self.consts,
				lang= lang,
				mode= mode,
				db_helper= self.helper,
				utils= self.utils,
				layout= self.layout,
				dumps= dumps,
				admin_data= admin_data
			)
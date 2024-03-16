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


class SparePartsAdminRouter:
	def __init__(self, app: Flask):
		self.app: Flask= app
		self.content: Content= Content()
		self.consts: Consts= Consts()
		self.cfg: Config= Config()
		self.helper: DatabaseHelper= DatabaseHelper()
		self.layout: Layout= Layout()
		self.utils: Utils= Utils()


	def setup(self):
		self.assign_admin_spare_parts_index()
		self.assign_create_product()
		self.assign_edit_product()
		self.assign_delete_product()


	def assign_delete_product(self):
		@self.app.route(self.consts.admin_spare_parts_page, methods=["DELETE"])
		def delete_product():
			try:
				aid= session.get('ADMIN_ID')
				if  aid == None:
					return redirect(self.consts.admin_login_route)

				admin_data= self.helper.admins.get_admin_by_username(aid)
				body= dict(loads(request.data))
				
				if admin_data['password'] != body['password']:
					return self.app.response_class(status= 403)

				res= self.helper.products.delete_product(body['productId'])
				if res:
					return self.app.response_class(status= 200)
				return self.app.response_class(status= 500)

			except Exception as e:
				raise e


	def assign_create_product(self):
		@self.app.route(self.consts.admin_spare_parts_page, methods=["POST"])
		def create_product():
			try:
				aid= session.get('ADMIN_ID')
				if  aid == None:
					return redirect(self.consts.admin_login_route)

				body: dict = dict(request.form)
				files_= request.files
				res= self.helper.products.create_product(loads(body["category"]), files_)
				if res:
					return self.app.response_class(status= 201)
				return self.app.response_class(status= 500)
			except Exception as e:
				print(e)
				return self.app.response_class(status= 500)


	def assign_edit_product(self):
		@self.app.route(self.consts.admin_spare_parts_page, methods=["PATCH"])
		def edit_product():
			try:
				aid= session.get('ADMIN_ID')
				if  aid == None:
					return redirect(self.consts.admin_login_route)

				body: dict = dict(request.form)
				res= self.helper.products.update_product(loads(body["product"]))
				if res:
					return self.app.response_class(status= 200)
				return self.app.response_class(status= 500)
			except Exception as e:
				print(e)
				return self.app.response_class(status= 500)


	def assign_admin_spare_parts_index(self):
		@self.app.route(self.consts.admin_spare_parts_page, methods=["GET"])
		def admin_spare_parts_index():
			aid= session.get('ADMIN_ID')
			if  aid == None:
				return redirect(self.consts.admin_login_route)

			admin_data= self.helper.admins.get_admin_by_username(aid)
			if '5' not in admin_data['accesses']:
				return redirect(self.consts.admin_main_page)				

			self.layout.load()
			self.helper.products.refresh_all_products()
			self.helper.admins.load_admins()
			lang= session.get('LANG', 'EN')
			mode= session.get('MODE', 'DARK')
			return render_template(
				'/admin/spare_parts.html',
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
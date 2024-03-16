from flask import Flask, session, render_template, url_for, request, redirect
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


class AdminsManagemnetAdminRouter:
	def __init__(self, app: Flask):
		self.app: Flask= app
		self.content: Content= Content()
		self.consts: Consts= Consts()
		self.cfg: Config= Config()
		self.helper: DatabaseHelper= DatabaseHelper()
		self.layout: Layout= Layout()
		self.utils: Utils= Utils()


	def setup(self):
		self.assign_index()
		self.assign_create_admin()
		self.assign_suspense_admin()
		self.assign_activate_admin()
		self.assign_update_admin()
		self.assign_delete_admin()

	def assign_suspense_admin(self):
		@self.app.route(f'{self.consts.admins_management_page}/suspense/', methods=['PATCH'])
		def suspense_admin():
			try:
				body= dict(loads(request.data))
				if not 'password' in body.keys():
					return self.app.response_class(status= 401)
				
				current_admin_id= session.get('ADMIN_ID')
				if  current_admin_id == None:
					return redirect(self.consts.admin_login_route)
				
				current_admin_data= self.helper.admins.get_admin_by_username(current_admin_id)
				if body['password'] != current_admin_data['password']:
					return self.app.response_class(status= 401)
				
				res= self.helper.admins.update_admin(body['adminId'], {'suspensed': True})
				if res:
					return self.app.response_class(status= 200)
				return self.app.response_class(status= 500)
			except Exception as e:
				print(e)
				return self.app.response_class(status= 500)
				

	def assign_update_admin(self):
		@self.app.route(f'{self.consts.admins_management_page}/', methods=['PATCH'])
		def update_admin():
			try:
				body= dict(loads(request.data))
				aid= body['id']
				del body['id']
				res= self.helper.admins.update_admin(aid, body)
				if res:
					return self.app.response_class(status= 200)
				return self.app.response_class(status= 500)
			except Exception as e:
				print(e)
				return self.app.response_class(status= 500)
				

	def assign_delete_admin(self):
		@self.app.route(f'{self.consts.admins_management_page}/', methods=['DELETE'])
		def delete_admin():
			try:
				body= dict(loads(request.data))
				if not 'password' in body.keys():
					return self.app.response_class(status= 401)
				
				current_admin_id= session.get('ADMIN_ID')
				if  current_admin_id == None:
					return redirect(self.consts.admin_login_route)
				
				current_admin_data= self.helper.admins.get_admin_by_username(current_admin_id)
				if body['password'] != current_admin_data['password']:
					return self.app.response_class(status= 401)
				
				res= self.helper.admins.delete_admin(body['adminId'])
				if res:
					return self.app.response_class(status= 200)
				return self.app.response_class(status= 500)
			except Exception as e:
				print(e)
				return self.app.response_class(status= 500)
				

	def assign_activate_admin(self):
		@self.app.route(f'{self.consts.admins_management_page}/activate/', methods=['PATCH'])
		def activate_admin():
			try:
				body= dict(loads(request.data))
				if not 'password' in body.keys():
					return self.app.response_class(status= 401)
				
				current_admin_id= session.get('ADMIN_ID')
				if  current_admin_id == None:
					return redirect(self.consts.admin_login_route)
				
				current_admin_data= self.helper.admins.get_admin_by_username(current_admin_id)
				if body['password'] != current_admin_data['password']:
					return self.app.response_class(status= 401)
				
				res= self.helper.admins.update_admin(body['adminId'], {'suspensed': False})
				if res:
					return self.app.response_class(status= 200)
				return self.app.response_class(status= 500)
			except Exception as e:
				print(e)
				return self.app.response_class(status= 500)
				

	def assign_create_admin(self):
		@self.app.route(self.consts.admins_management_page, methods=["POST"])
		def create_admin():
			try:
				body= dict(loads(request.data))
				res= self.helper.admins.create_admin(body)
				print(res)
				if res:
					return self.app.response_class(status= 201)

				elif res == -1:
					return self.app.response_class(status= 304)
				return self.app.response_class(status= 500)
			except Exception as e:
				print(e)
				return self.app.response_class(status= 500)

	def assign_index(self):
		@self.app.route(self.consts.admins_management_page, methods=["GET"])
		def admin_admins_index():
			aid= session.get('ADMIN_ID')
			if  aid == None:
				return redirect(self.consts.admin_login_route)

			admin_data= self.helper.admins.get_admin_by_username(aid)
			if '3' not in admin_data['accesses']:
				return redirect(self.consts.admin_main_page)
				
			self.layout.load()
			self.helper.admins.load_admins()
			lang= session.get('LANG', 'EN')
			mode= session.get('MODE', 'DARK')
			return render_template(
				'/admin/admins.html',
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
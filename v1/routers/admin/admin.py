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


class AdminRouter:
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
		self.assign_login()
		self.assign_logout()

	def assign_logout(self):
		@self.app.route(self.consts.admin_logout_route)
		def admin_logout():
			session.pop('ADMIN_ID')
			return self.app.response_class(status= 200)

	def assign_login(self):
		@self.app.route(self.consts.admin_login_route, methods=["PATCH"])
		def admin_login():
			try:
				self.helper.admins.load_admins()	
				body= dict(loads(request.data))
				if body['mode'] == 'email':
					res= self.helper.admins.get_admin_by_username(body['username'])
					if res != None:
						if res['password'] == None:
							return self.app.response_class(status= 403)
						return self.app.response_class(status= 200)
					return self.app.response_class(status= 404)

				elif body['mode'] == 'auth':
					res= self.helper.admins.get_admin_by_username(body['username'])
					if res['password'] == body['password']:
						session['ADMIN_ID']= res['id']
						return self.app.response_class(status= 200)

					return self.app.response_class(status= 400)

				elif body['mode'] == 'reg':
					res= self.helper.admins.update_admin(
						username= body['username'],
						payload= {'password': body['password']},
					)
					if res:
						return self.app.response_class(status= 200)

					return self.app.response_class(status= 500)

			except Exception as e:
				print(e)
				return self.app.response_class(status= 500)

	def assign_index(self):
		@self.app.route(self.consts.admin_login_route, methods=["GET"])
		def admin_login_form():
			if not session.get('ADMIN_ID') == None:
				return redirect(self.consts.admin_main_page)
			self.layout.load()
			lang= session.get('LANG', 'EN')
			mode= session.get('MODE', 'DARK')
			return render_template(
				'/admin/login.html',
				content= self.content,
				cfg= self.cfg,
				consts= self.consts,
				lang= lang,
				mode= mode,
				db_helper= self.helper,
				utils= self.utils,
				layout= self.layout,
				dumps= dumps
			)
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


class LayoutAdminRouter:
	def __init__(self, app: Flask):
		self.app: Flask= app
		self.content: Content= Content()
		self.consts: Consts= Consts()
		self.cfg: Config= Config()
		self.helper: DatabaseHelper= DatabaseHelper()
		self.layout: Layout= Layout()
		self.utils: Utils= Utils()


	def setup(self):
		self.assign_admin_layout_index()
		self.assign_admin_layout_edit_content()


	def assign_admin_layout_edit_content(self):
		@self.app.route(f'{self.consts.admin_layout_page}/content/', methods=["PATCH"])
		def admin_layout_edit_content():
			try:
				content= loads(request.data)['content']
				res= self.content.update_content(content)
				if res:
					return self.app.response_class(status= 200)
				return self.app.response_class(status= 500)
			except Exception as e:
				print(e)
				return self.app.response_class(status= 500)

	def assign_admin_layout_index(self):
		@self.app.route(self.consts.admin_layout_page, methods=["GET"])
		def admin_layout_index():
			aid= session.get('ADMIN_ID')
			if  aid == None:
				return redirect(self.consts.admin_login_route)

			admin_data= self.helper.admins.get_admin_by_username(aid)
			if '0' not in admin_data['accesses']:
				return redirect(self.consts.admin_main_page)				

			self.layout.load()
			self.helper.admins.load_admins()
			lang= session.get('LANG', 'EN')
			mode= session.get('MODE', 'DARK')
			return render_template(
				'/admin/layout.html',
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
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


class TicketsAdminRouter:
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
		self.assign_archived_tickets_index()
		self.assign_archive_ticket()

	def assign_archive_ticket(self):
		@self.app.route(self.consts.admin_tickets_page, methods=["PATCH"])
		def archive_ticket():
			try:
				body= dict(loads(request.data))
				if body['mode'] not in ['MAINTENANCE', 'INSTALLATIONS', 'SPARE_PARTS', 'GLOBAL', 'MODERNIZATION']:
					return self.app.response_class(status= 403)

				if body['mode'] == 'MAINTENANCE':
					return self.app.response_class(status= 200 if self.helper.tickets.archive_maintenance_ticket(body['ticket']) == 1 else 500)

				if body['mode'] == 'INSTALLATIONS':
					return self.app.response_class(status= 200 if self.helper.tickets.archive_installations_ticket(body['ticket']) == 1 else 500)

				if body['mode'] == 'SPARE_PARTS':
					return self.app.response_class(status= 200 if self.helper.tickets.archive_spare_parts_ticket(body['ticket']) == 1 else 500)

				if body['mode'] == 'MODERNIZATION':
					return self.app.response_class(status= 200 if self.helper.tickets.archive_modernization_ticket(body['ticket']) == 1 else 500)

				if body['mode'] == 'GLOBAL':
					return self.app.response_class(status= 200 if self.helper.tickets.archive_global_ticket(body['ticket']) == 1 else 500)

				return self.app.response_class(status= 500)
			except Exception as e:
				print(e)
				return self.app.response_class(status= 500)


	def assign_index(self):
		@self.app.route(self.consts.admin_tickets_page, methods=["GET"])
		def admin_tickets_index():
			aid= session.get('ADMIN_ID')
			if  aid == None:
				return redirect(self.consts.admin_login_route)

			admin_data= self.helper.admins.get_admin_by_username(aid)
			if '2' not in admin_data['accesses']:
				return redirect(self.consts.admin_main_page)

			self.layout.load()
			self.helper.admins.load_admins()
			self.helper.tickets.refresh_all_tickets()
			lang= session.get('LANG', 'EN')
			mode= session.get('MODE', 'DARK')
			return render_template(
				'/admin/tickets.html',
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

	def assign_archived_tickets_index(self):
		@self.app.route(f'{self.consts.admin_tickets_page}/archived/', methods=["GET"])
		def admin_archived_tickets_index():
			aid= session.get('ADMIN_ID')
			if  aid == None:
				return redirect(self.consts.admin_login_route)

			admin_data= self.helper.admins.get_admin_by_username(aid)
			if '2' not in admin_data['accesses']:
				return redirect(self.consts.admin_main_page)

			self.layout.load()
			self.helper.admins.load_admins()
			self.helper.tickets.refresh_all_tickets()
			lang= session.get('LANG', 'EN')
			mode= session.get('MODE', 'DARK')
			return render_template(
				'/admin/archived_tickets.html',
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
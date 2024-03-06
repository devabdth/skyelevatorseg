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


class UsersAdminRouter:
	def __init__(self, app: Flask):
		self.app: Flask= app
		self.content: Content= Content()
		self.consts: Consts= Consts()
		self.cfg: Config= Config()
		self.helper: DatabaseHelper= DatabaseHelper()
		self.layout: Layout= Layout()
		self.utils: Utils= Utils()


	def setup(self):
		self.assign_admin_users_index()
		self.assign_admin_users_notifications()
		self.assign_admin_users_reports()

	def assign_admin_users_reports(self):
		@self.app.route(f'{self.consts.admin_users_page}/report/', methods=["PATCH"])
		def  admin_users_reports():
			try:
				data= dict(loads(request.data))
				aid= session.get('ADMIN_ID')
				admin_data= self.helper.admins.get_admin_by_username(aid)
				if admin_data['password'] == data['password']:
					import pandas as pd
					import io
					buffer = io.BytesIO()

					df= pd.DataFrame(self.utils.mutliple_to_dicts(self.helper.users.all_users), columns= self.helper.users.all_users[0].to_dict().keys(),)
					df['likes'] = df['likes'].str.len()
					df['saves'] = df['saves'].str.len()
					df['comments'] = df['comments'].str.len()
					del df['recent_read']
					del df['current_reading_article']
					del df['current_reading_section']
					del df['last_log_in']
					del df['password']
					df.membership= df.membership.str.replace('n', self.consts.memberships['n']['EN'])
					df.membership= df.membership.str.replace('p', self.consts.memberships['p']['EN'])
					df.membership= df.membership.str.replace('g', self.consts.memberships['g']['EN'])

					df.to_excel(buffer, index= False)
					headers = {
					    'Content-Disposition': 'attachment; filename=output.xlsx',
					    'Content-type': 'application/vnd.ms-excel'
					}
					return Response(buffer.getvalue(), mimetype='application/vnd.ms-excel', headers=headers)
				return self.app.response_class(status= 403)


			except Exception as e:
				print(e)
				return self.app.response_class(status= 500)

	def assign_admin_users_notifications(self):
		@self.app.route(f'{self.consts.admin_users_page}/notification/', methods=["POST"])
		def  admin_users_notifications():
			try:
				import time
				data= dict(loads(request.form['data']))
				attachments= dict(request.files).values()
				for recipient in data['recipients']:
					# self.email_plugin.send_notification_email(
					# 	attachments= attachments,
					# 	recipient= recipient,
					# 	subject= data['objective'],
					# 	message= data['message']
					# )
					time.sleep(2)

				return self.app.response_class(status= 201)
			except Exception as e:
				print(e)
				return self.app.response_class(status= 500)

	def assign_admin_users_index(self):
		@self.app.route(self.consts.admin_users_page, methods=["GET"])
		def admin_users_index():
			aid= session.get('ADMIN_ID')
			if  aid == None:
				return redirect(self.consts.admin_login_route)
			self.layout.load()
			self.helper.admins.load_admins()
			lang= session.get('LANG', 'EN')
			mode= session.get('MODE', 'DARK')
			return render_template(
				'/admin/users.html',
				content= self.content,
				cfg= self.cfg,
				consts= self.consts,
				lang= lang,
				mode= mode,
				db_helper= self.helper,
				utils= self.utils,
				layout= self.layout,
				dumps= dumps,
				admin_data= self.helper.admins.get_admin_by_username(aid)
			)
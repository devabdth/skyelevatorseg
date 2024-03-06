from database.helper import DatabaseHelper
from plugins.layout import Layout
from plugins.utils import Utils
from plugins.consts import Consts
from plugins.content import Content
from plugins.config import Config
from flask import Flask, session, render_template, url_for, request
from json import dumps, loads
from sys import path
path.insert(0, '../')
path.insert(1, '../../')


class InstallationsRouter:
    def __init__(self, app: Flask):
        self.app: Flask = app
        self.content: Content = Content()
        self.consts: Consts = Consts()
        self.cfg: Config = Config()
        self.helper: DatabaseHelper = DatabaseHelper()
        self.layout: Layout = Layout()
        self.utils: Utils = Utils()

    def setup(self):
        self.assign_installations_index()
        self.assign_create_installations_ticket()
        
    def assign_create_installations_ticket(self):
        @self.app.route(self.consts.installations_route, methods=["POST"])
        @self.app.route(self.consts.services_installations_route, methods=["POST"])
        def create_installations_ticket():
            try:
                body= loads(request.data)
                res: bool= self.helper.tickets.create_installation_ticket(body)
                return self.app.response_class(status= 201 if res else 500)
            except Exception as e:
                print(e)
                return self.app.response_class(status= 500)

    def assign_installations_index(self):
        @self.app.route(self.consts.installations_route, methods=["GET"])
        @self.app.route(self.consts.services_installations_route, methods=["GET"])
        def installations_index():
            lang = session.get('LANG', 'EN')
            mode = session.get('MODE', 'DARK')
            self.layout.load()
            current_user_id= session.get("CURRENT_USER_ID", None)
            user_data= self.helper.users.get_user_by_id(current_user_id) if current_user_id is not None else None
            return render_template(
                '/website/installations.html',
                user_data= user_data,
                content=self.content,
                cfg=self.cfg,
                consts=self.consts,
                lang=lang,
                mode=mode,
                db_helper=self.helper,
                utils=self.utils,
                layout=self.layout,
                dumps=dumps
            )

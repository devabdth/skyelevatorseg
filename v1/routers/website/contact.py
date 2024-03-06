from database.helper import DatabaseHelper
from plugins.layout import Layout
from plugins.utils import Utils
from plugins.consts import Consts
from plugins.content import Content
from plugins.config import Config
from plugins.email_plugin import EmailPlugin
from flask import Flask, session, render_template, request
from json import dumps, loads
from sys import path
path.insert(0, '../')
path.insert(1, '../../')


class ContactUsRouter:
    def __init__(self, app: Flask):
        self.app: Flask = app
        self.content: Content = Content()
        self.consts: Consts = Consts()
        self.cfg: Config = Config()
        self.helper: DatabaseHelper = DatabaseHelper()
        self.layout: Layout = Layout()
        self.utils: Utils = Utils()
        self.email_plugin= EmailPlugin()

    def setup(self):
        self.assign_contact_index()
        self.assign_post_contact()

    def assign_post_contact(self):
        @self.app.route(self.consts.contact_route, methods=["POST"])
        @self.app.route(self.consts.contact_us_route, methods=["POST"])
        @self.app.route(self.consts.messaging_route, methods=["POST"])
        @self.app.route(self.consts.messaging_us_route, methods=["POST"])
        @self.app.route(self.consts.reaching_us_route, methods=["POST"])
        def post_contact():
            try:
                body= loads(request.data)
                res= self.helper.tickets.create_global_ticket(body)
                if not res:
                    res= self.email_plugin.send_ticket_email(body['email'])
                    if res:
                        return self.app.response_class(status= 201)
                return self.app.response_class(status= 500)
            except Exception as e:
                print(e)
                return self.app.response_class(status= 500)
        
        
    def assign_contact_index(self):
        @self.app.route(self.consts.contact_route, methods=["GET"])
        @self.app.route(self.consts.contact_us_route, methods=["GET"])
        @self.app.route(self.consts.messaging_route, methods=["GET"])
        @self.app.route(self.consts.messaging_us_route, methods=["GET"])
        @self.app.route(self.consts.reaching_us_route, methods=["GET"])
        def contact_index():
            lang = session.get('LANG', 'EN')
            mode = session.get('MODE', 'DARK')
            self.layout.load()
            current_user_id= session.get("CURRENT_USER_ID", None)
            user_data= self.helper.users.get_user_by_id(current_user_id) if current_user_id is not None else None
            return render_template(
                '/website/contact.html',
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

from plugins.consts import Consts
from plugins.config import Config
from flask import Flask, redirect, request, session, send_file
from os.path import abspath, dirname, join, exists

from sys import path
path.insert(0, '../')


class ConfigRouter:
    def __init__(self, app: Flask):
        self.app: Flask = app
        self.cfg: Config = Config()
        self.consts: Consts = Consts()


    def setup(self):
        self.assign_session_handler()
        self.assign_robots()
        self.assign_sitemap()
        

    def assign_sitemap(self):
        @self.app.route('/sitemap.xml')
        def sitemap():
            return send_file(join(abspath(dirname(__file__)), '../../static/sitemap.xml'))

        

    def assign_robots(self):
        @self.app.route('/robots.txt')
        def robots():
            return send_file(join(abspath(dirname(__file__)), '../../static/robots.txt'))



    def assign_session_handler(self):
        @self.app.route(self.consts.session_handler, methods= ["PATCH"])
        def session_handler():
            params= dict(request.values)
            try:
                for k in params.keys():
                    session[k]= params[k]

                return self.app.response_class(status= 200)
            except Exception as e:
                return self.app.response_class(status=500)
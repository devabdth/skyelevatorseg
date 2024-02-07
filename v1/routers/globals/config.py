from plugins.consts import Consts
from plugins.config import Config
from flask import Flask, redirect, request, session

from sys import path
path.insert(0, '../')


class ConfigRouter:
    def __init__(self, app: Flask):
        self.app: Flask = app
        self.cfg: Config = Config()
        self.consts: Consts = Consts()


    def setup(self):
        self.assign_session_handler()


    def assign_session_handler(self):
        @self.app.route(self.consts.session_handler, methods= ["PATCH"])
        def session_handler():
            params= dict(request.values)
            try:
                print(params)
                for k in params.keys():
                    session[k]= params[k]
                    print(session[k])

                return self.app.response_class(status= 200)
            except Exception as e:
                print(e)
                return self.app.response_class(status=500)
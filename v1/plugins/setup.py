import sys
sys.path.insert(0, '../')

from flask import Flask
from threading import Thread
from json import dump, dumps
from .config import Config
import datetime


class Setup:
    def __init__(self, app: Flask, socket= None):
        self.app: Flask = app
        self.cfg: Config = Config()
        self.socket = socket
        self.threads= [
            Thread(target= lambda: app.run(port= self.cfg.port, debug=self.cfg.debug, use_reloader=False, host= self.cfg.host)),
        ]

    def initializiation(self):
        self.setup_files_and_directories()
        self.setup_app()
        self.setup_routers()
        self.setup_errors_routers()
        self.setup_adminstration_webapp_routes()
        self.setup_socket_handlers()
        self.assign_generate_threads()
        self.assign_filters()

    def assign_filters(self):
        @self.app.template_filter('readable_time')
        def readable_time(time):
            return datetime.datetime.fromtimestamp(time/1000)

        from routers.globals.demo import DemoRouter
        DemoRouter(self.app).setup()

    def assign_generate_threads(self):
        import time

        def articles_thread():
            while True:
                ArticlesAnalysis().report()
                time.sleep(60)

        self.threads.append(Thread(target= articles_thread))


    def setup_app(self):
        from flask_session import Session

        self.app.config["SESSION_PERMANENT"] = False
        self.app.config["SESSION_TYPE"] = "filesystem"
        self.app.config['SECRET'] = 'secret!1234'
        self.app.config['MAX_CONTENT_LENGTH'] = 1024 * 1024 * 1024
        Session(self.app)

    def setup_files_and_directories(self):
        from os.path import abspath, dirname, join, exists
        from os import mkdir
        dirs= [
            "../jsons/",
            "../assets/"
        ]
        files= [
            {
                "dir": "../jsons/routers.json",
                "initialData": {
                    "WEBSITE_ROUTERS": {},
                    "ADMIN_ROUTERS": {},
                }
            },
            {
                "dir": "../jsons/layout.json",
                "initialData": {
                    "HOME_PAGE": {},
                }
            }
        ]

        for dir_ in dirs:
            path= abspath(join(dirname(__file__), dir_))
            if not exists(path):
                mkdir(path)
            


        for file_ in files:
            path= abspath(join(dirname(__file__), file_['dir']))
            if not exists(path):
                with open(path, 'w') as f:
                    if not path.split('.')[1] == 'json':
                        f.write(f'{file_["initialData"]}')
                    else:
                        json_object= dumps(file_['initialData'], indent= 4)
                        f.write(json_object)


    def setup_socket_handlers(self):
        # from socket_handlers.chatting import ChattingHandler
        # ChattingHandler(self.app, self.socket)
        pass


    def setup_errors_routers(self):
        from routers.globals.errors import ErrorsRouter
        ErrorsRouter(self.app).setup()


    def setup_adminstration_webapp_routes(self):
        pass

    def setup_routers(self):
        pass


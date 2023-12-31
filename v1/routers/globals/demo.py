from plugins.layout import Layout
from plugins.utils import Utils
from plugins.consts import Consts
from plugins.content import Content
from plugins.config import Config
from flask import Flask, session, render_template, url_for
from json import dumps
from sys import path
path.insert(0, '../')
path.insert(1, '../../')


class DemoRouter:
    def __init__(self, app: Flask):
        self.app: Flask = app
        self.content: Content = Content()
        self.consts: Consts = Consts()
        self.cfg: Config = Config()
        self.layout: Layout = Layout()
        self.utils: Utils = Utils()

    def setup(self):
        self.assign_demo()

    def assign_demo(self):
        @self.app.route('/demo/')
        # @self.app.route(self.consts.index_route, methods=["GET"])
        # @self.app.route(self.consts.home_route, methods=["GET"])
        # @self.app.route(self.consts.main_page_route, methods=["GET"])
        # @self.app.route(self.consts.main_route, methods=["GET"])

        def demo():
            lang = session.get('LANG', 'AR')
            mode = session.get('MODE', 'LIGHT')
            self.layout.load()
            return render_template(
                '/demo/index.html',
                content=self.content,
                cfg=self.cfg,
                consts=self.consts,
                lang=lang,
                mode=mode,
                utils=self.utils,
                layout=self.layout,
                dumps=dumps
            )

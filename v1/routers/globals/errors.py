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


class ErrorsRouter:
    def __init__(self, app: Flask):
        self.app: Flask = app
        self.content: Content = Content()
        self.consts: Consts = Consts()
        self.cfg: Config = Config()
        self.layout: Layout = Layout()
        self.utils: Utils = Utils()

    def setup(self):
        self.assign_not_found_router()
        self.assign_internal_server_error_router()

    def assign_not_found_router(self):
        @self.app.errorhandler(404)
        def not_found(e):
            lang = session.get('LANG', 'AR')
            mode = session.get('MODE', 'LIGHT')
            self.layout.load()
            return render_template(
                '/errors/notFound.html',
                content=self.content,
                cfg=self.cfg,
                consts=self.consts,
                lang=lang,
                mode=mode,
                utils=self.utils,
                layout=self.layout,
                dumps=dumps
            )

    def assign_internal_server_error_router(self):
        @self.app.errorhandler(500)
        def internal_server_error(e):
            lang = session.get('LANG', 'AR')
            mode = session.get('MODE', 'LIGHT')
            self.layout.load()
            return render_template(
                '/errors/internalServerError.html',
                content=self.content,
                cfg=self.cfg,
                consts=self.consts,
                lang=lang,
                mode=mode,
                utils=self.utils,
                layout=self.layout,
                dumps=dumps
            )

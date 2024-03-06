from database.helper import DatabaseHelper
from plugins.layout import Layout
from plugins.utils import Utils
from plugins.consts import Consts
from plugins.content import Content
from plugins.config import Config
from flask import Flask, session, render_template, request


from json import dumps, loads

from sys import path
path.insert(0, '../')
path.insert(1, '../../')


class ArticleRouter:
    def __init__(self, app: Flask):
        self.app: Flask = app
        self.content: Content = Content()
        self.consts: Consts = Consts()
        self.cfg: Config = Config()
        self.helper: DatabaseHelper = DatabaseHelper()
        self.layout: Layout = Layout()
        self.utils: Utils = Utils()

    def setup(self):
        self.assign_article_index()
        self.assign_article_readtime()
        self.assign_create_comment()

    def assign_article_readtime(self):
        @self.app.route(f'{self.consts.article_route}/readTime/', methods=["PATCH"])
        def article_readtime(article_id):
            body = dict(loads(request.data))
            res= self.helper.articles.update_readtime(
                article_id=body['articleId'],
                duration=body['duration'],
                section_id=body['sectionId']
            )
            if res: 
                return self.app.response_class(status= 200)
            
            return self.app.response_class(status= 500)

    def assign_create_comment(self):
        @self.app.route(f'{self.consts.article_route}/comments/', methods=["POST"])
        def create_comment(article_id):
            import datetime
            import secrets
            try:
                body= loads(request.data)
                article= self.helper.articles.get_article_by_id(article_id)
                article.comments.append({
                    'id': secrets.token_hex(8),
                    'comment': body['comment'],
                    'commenter_id': body['userId'],
                    'time': (datetime.datetime.now() - datetime.datetime.utcfromtimestamp(0)).total_seconds() * 1000

                })
                article= article.to_dict()
                res= self.helper.articles.update_article(
                    article_id= article['id'],
                    payload= article,
                )
                if res:
                    return self.app.response_class(status= 201)
                return self.app.response_class(status= 500)
            except Exception as e:
                print(e)
                return self.app.response_class(status= 500)

    def assign_article_index(self):
        @self.app.route(self.consts.article_route, methods=["GET"])
        def article_index(article_id):
            lang = session.get('LANG', 'EN')
            mode = session.get('MODE', 'DARK')
            article = self.helper.articles.get_article_by_id(article_id)
            article.views= article.views +1
            article_= article.to_dict()
            res= self.helper.articles.update_article(
                article_id= article_['id'],
                payload= article_,
            )
            self.helper.articles.refresh_all_articles()
            self.helper.categories.load_data()
            self.helper.ads.load_data()
            self.layout.load()
            current_user_id= session.get("CURRENT_USER_ID", None)
            user_data= self.helper.users.get_user_by_id(current_user_id) if current_user_id is not None else None
            if user_data is not None:
                if article_id in user_data.recent_read:
                    user_data.recent_read.remove(article_id)
                user_data.recent_read.append(article_id)
                self.helper.users.update_user(payload= { "id": user_data.id, "recent_read": user_data.recent_read })
            return render_template(
                '/website/article.html',
                user_data= user_data,
                content=self.content,
                cfg=self.cfg,
                consts=self.consts,
                lang=lang,
                mode=mode,
                db_helper=self.helper,
                utils=self.utils,
                layout=self.layout,
                article=article,
                json_parser=dumps
            )

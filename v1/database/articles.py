from os.path import dirname, abspath, join, exists
from datetime import datetime
import pymongo
from models.article import Article
from models.thread import Thread
from models.article_section import ArticleSection
import secrets
from plugins.consts import Consts
from bson.objectid import ObjectId
from pandas import DataFrame

class ArticlesDatabaseHelper:
    def __init__(self, client: pymongo.MongoClient):
        self.consts: Consts= Consts()
        self.client: pymongo.MongoClient = client
        self.database = self.client["forexology"]
        self.articles_collection = self.database["articles"]
        self.users_collection = self.database["users"]

        self.all_articles: list = [
        ]

        self.refresh_all_articles()


    def refresh_all_articles(self):
        try:
            self.all_articles = [Article(article) for article in list(self.articles_collection.find())]
        except Exception as e:
            print(e)

    def search_articles(self, search_params):
        return self.all_articles[0]
    
    def get_article_by_id(self, article_id):
        articles = self.articles_collection.find({'id': article_id})
        return Article(articles[0])

    def get_all_articles(self, filter_by: str = None, arrangment: str = 'ascending'):
        return self.all_articles

    def multiple_articles_by_ids(self, ids: list):
        # articles = self.articles_collection.find({'_id': {'$in': [ObjectId(
        #     _id) if type(_id) is str else ObjectId(_id['id']) for _id in ids]}})
        articles= []
        for article in self.all_articles:
            if article.id in ids:
                articles.append(article)
        return articles

    def get_articles_by_ids(self, ids, return_as_dicts= False):
        articles = self.articles_collection.find({'id': {'$in': ids}})
        if return_as_dicts:
            return [Article(article).to_dict() for article in articles]
        return [Article(article) for article in articles]
    

    def get_article_by_writer_id(self, writer_id):
        articles= self.articles_collection.find({ "mode": 1, "published_by" : { "$in" : [writer_id] }})
        print(f'Articles Result: {list(articles)}')
        return [Article(dict(article)) for article in list(articles)]

    def get_drafts_by_writer_id(self, writer_id):
        articles= self.articles_collection.find({ "mode": 0, "published_by" : { "$in" : [writer_id] }})
        print(f'Articles Result: {list(articles)}')
        return [Article(dict(article)) for article in list(articles)]


    def get_articles_by_category_and_parent_category(self, category, parent_category, exception= []):
        if category is None and not parent_category is None:
            articles = self.articles_collection.find({'parent_category': parent_category, 'id': {'$nin': exception}})
        if not category is None and parent_category is None:
            articles = self.articles_collection.find({'category': category, 'id': {'$nin': exception}})
        else:
            articles = self.articles_collection.find({'category': category, 'parent_category': parent_category, 'id': {'$nin': exception}})
        
        return [Article(article) for article in articles]

    def get_articles_by_category(self, category_id):
        return {
            "trending": self.get_all_articles(),
            "featured": self.get_all_articles(),
            "all_articles": self.get_all_articles(),
            "mostRecent": self.get_all_articles(),
        }
        
    def update_readtime(self, section_id, article_id, duration):
        return True

    def delete_article(self, article_id):
        try:
            self.articles_collection.delete_one({'id': article_id})
            return True
        except Exception as e:
            print(e)
            return False

    def create_article(self, payload, media, publisher, cover):
        try:
            sections= []
            images= []
            audios=[]
            videos=[]
            for section in payload['sections']:
                sec_id= str(secrets.token_hex(24))
                if section['id'] in media.keys():
                    section_media= media[section['id']]
                    section_media.filename= f'{sec_id}.{section_media.filename.split(".")[-1]}'

                    if section_media.filename.split('.')[-1] in self.consts.covers_supported_extenstions:
                        images.append(section_media)

                    if section_media.filename.split('.')[-1] in self.consts.audios_supported_extenstions:
                        audios.append(section_media)

                    if section_media.filename.split('.')[-1] in self.consts.videos_supported_extenstions:
                        videos.append(section_media)

                section['id']= sec_id
                section['audio_stop']= float(section['audio_stop']) if section['audio_stop'] != None else 0
                section['attached_ad_id']= ""
                sections.append(ArticleSection(section))
            
            payload['sections']= [section.to_dict() for section in sections]
            payload['attached_ad']= ""
            payload['id']= str(secrets.token_hex(12))
            payload["published_in"]= str(datetime.now())
            payload["published_by"]= [publisher]
            payload["saves"]= 0
            payload["mode"]= 1
            payload["views"]= 1
            payload["read_time"]= {}
            article= Article(payload)

            article = self.articles_collection.insert_one(article.to_dict())
            cover.save(abspath(join(dirname(__file__), '../assets/covers/articles/', '{}.{}'.format(payload['id'], cover.filename.split('.')[-1]))))
            if article != None and article.inserted_id != None:
                for image in images:
                    image.save(abspath(join(dirname(__file__), '../assets/articles/images/', image.filename),))
                for audio in audios:
                    audio.save(abspath(join(dirname(__file__), '../assets/articles/audios/', audio.filename),))
                for video in videos:
                    video.save(abspath(join(dirname(__file__), '../assets/articles/videos/', video.filename),))
                
                return True

            return False
        except Exception as e:
            print(e)
            return False

    def update_article(self, article_id: str, payload: dict, files: list= None):

        try:
            if 'id' in payload.keys():
                article_id= payload['id']
                del payload['id']
            self.articles_collection.find_one_and_update({'id': article_id}, {'$set': payload})
            self.refresh_all_articles()
            return True
        except Exception as e:
            print(e)
            return False


    def get_section_cover(self, section_id):
        for ext in self.consts.covers_supported_extenstions:
            file_path= abspath(join(dirname(__file__), '../assets/articles/images/', f'{section_id}.{ext}'),)
            if exists(file_path):
                return file_path
        return None

    def get_section_audio(self, section_id):
        for ext in self.consts.audios_supported_extenstions:
            file_path= abspath(join(dirname(__file__), '../assets/articles/audios/', f'{section_id}.{ext}'),)
            if exists(file_path):
                return file_path
        return None

    def get_section_video(self, section_id):
        for ext in self.consts.videos_supported_extenstions:
            file_path= abspath(join(dirname(__file__), '../assets/articles/videos/', f'{section_id}.{ext}'),)
            if exists(file_path):
                return file_path
        return None

    def format_comments(self, article):
        df= DataFrame(article.comments, columns=['id', 'commenter_id', 'comment', 'time'])
        commenters_ids= list(df['commenter_id'])
        commenters_ids= list(filter(('Anonymous').__ne__, commenters_ids))
        users = self.users_collection.find({'id': {'$in': commenters_ids}})
        users= {user['id']: user for user in users}
        users['Anonymous']= {'name': 'Anonymous', 'id': 'Anonymous'}
        comments= article.comments
        for comment in article.comments:
            comment['commenter']= users[comment['commenter_id']]

        df= DataFrame(article.comments, columns= ['id', 'commenter_id', 'comment', 'commenter', 'time'])
        df.sort_values('time', ascending= True)

        return [dict(comment) for _, comment in df.iterrows()]

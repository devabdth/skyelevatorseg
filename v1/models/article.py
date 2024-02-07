from .article_section import ArticleSection
import bson


class Article:
    '''
            Parametars:
                    id: str,
                    title: dict,
                    short_brief: dict,
                    parent_category: str,
                    category: str,
                    sections: list,
                    ratings: list,
                    comments: list,
                    thread: str,
                    published_in: str,
                    published_by: list,
                    attached_ad: dict,
                    saves: int,
                    mode: int,
                    tags: list,
                    record_available: bool
                    cover_attached_msg: dict
    '''

    def __init__(self, payload):
        self.params: list = [
            {'name': "id", 'type': str},
            {'name': "_id", 'type': bson.objectid.ObjectId},
            {'name': "title", 'type': dict},
            {'name': "short_brief", 'type': dict},
            {'name': "cover_attached_msg", 'type': dict},
            {'name': "parent_category", 'type': str},
            {'name': "category", 'type': str},
            {'name': "sections", 'type': list},
            {'name': "ratings", 'type': list},
            {'name': "comments", 'type': list},
            {'name': "thread", 'type': str},
            {'name': "published_in", 'type': str},
            {'name': "published_by", 'type': list},
            {'name': "attached_ad", 'type': str},
            {'name': "saves", 'type': int},
            {'name': "mode", 'type': int},
            {'name': "views", 'type': int},
            {'name': "tags", 'type': list},
            {'name': "record_available", 'type': bool},
            {'name': "read_time", 'type': dict},
        ]

        for param in self.params:
            if param['name'] in payload.keys():
                if type(payload[param['name']]) != param['type']:
                    raise TypeError('"{}"" Expected Type: {} but got {}'.format(
                        param['name'],  param['type'], type(payload[param['name']])))

                setattr(self, param['name'], payload[param['name']])
            else:
                raise KeyError(
                    'Parameter "{}" not found'.format(param['name']))

        self.sections = [ArticleSection(section) for section in self.sections]

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "short_brief": self.short_brief,
            "parent_category": self.parent_category,
            "cover_attached_msg": self.cover_attached_msg,
            "category": self.category,
            "sections": [section.to_dict() for section in self.sections],
            "ratings": self.ratings,
            "comments": self.comments,
            "thread": self.thread,
            "published_in": self.published_in,
            "published_by": self.published_by,
            "attached_ad": self.attached_ad,
            "saves": self.saves,
            "mode": self.mode,
            "tags": self.tags,
            "record_available": self.record_available,
            "read_time": self.read_time,
            "views": self.views,
        }

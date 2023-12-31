from os.path import abspath, join, dirname
from json import loads


class Consts:
    def __init__(self):
        self.covers_supported_extenstions: list = [
            'png', 'jpg', 'jpeg', 'gif', 'jfjf', 'webp'
        ]
        self.audios_supported_extenstions: list= ['mp3', 'aac']
        self.videos_supported_extenstions: list= ['mp4', 'mpg', 'mpeg', 'flv', 'm2v']
        self.cvs_supported_extenstions: list = [
            'pdf'
        ]
        self.admin_accesses= {
            "0": "Layout",
            "1": "CRM",
            "2": "Categories",
            "3": "Careers",
            "4": "Ads Spaces",
            "5": "Writers",
            "6": "Admins",
            "7": "Courses",
            "8": "Agenda",
        }

        self.header_fixed_tabs= [
            {
                "id": 'a05685021712b94519ea3dade83cf7323cd9419b362af0cb',
                "mode": 'link',
                "text": 'home',
                "redirect": '/'
            },
            {
                "id": 'a05685021712b94519ea3dade83cf7323cd9419b362af1cb',
                "mode": 'link',
                "text": 'aboutUs',
                "redirect": '/about/'
            },
            {
                "id": 'a05685021712b94519ea3dade83cf7323cd9419b362af6cb',
                "mode": 'link',
                "text": 'agenda',
                "redirect": '/agenda/'
            },
            {
                "id": 'a05685021712b94519ea3dade83cf7323cd9419b362af2cb',
                "mode": 'link',
                "text": 'articles',
                "redirect": '/articles/'
            },
            {
                "id": 'a05685021712b94519ea3dade83cf7323cd9419b362af3cb',
                "mode": 'link',
                "text": 'careers',
                "redirect": '/careers/'
            },
            {
                "id": 'a05685021712b94519ea3dade83cf7323cd9419b362af4cb',
                "mode": 'link',
                "text": 'categories',
                "redirect": '/categories/'
            },
            {
                "id": 'a05685021712b94519ea3dade83cf7323cd9419b362af5cb',
                "mode": 'link',
                "text": 'classification',
                "redirect": '/classification/'
            },
            {
                "id": 'a05685021712b94519ea3dade83cf7323cd9419b362af9cb',
                "mode": 'link',
                "text": 'courses',
                "redirect": '/courses/'
            },
        ]

        self.podcast_supported_extenstions: list = ["mp3"]
        self.video_supported_extenstions: list = ["mp4"]

        with open(abspath(join(dirname(__file__), '../jsons/routers.json'))) as f:
            data = loads(f.read())
            # Admin Routes

            # Website Routes
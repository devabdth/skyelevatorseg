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
            # Website Routes
            self.home_route= data["WEBSITE_ROUTERS"]["HOME_ROUTE"]
            self.index_route= data["WEBSITE_ROUTERS"]["INDEX_ROUTE"]
            self.main_route= data["WEBSITE_ROUTERS"]["MAIN_ROUTE"]
            self.main_page_route= data["WEBSITE_ROUTERS"]["MAIN_PAGE_ROUTE"]
            self.blog_route= data["WEBSITE_ROUTERS"]["BLOG_ROUTE"]
            self.product_image_route= data["WEBSITE_ROUTERS"]["PRODUCTS_IMAGE_ROUTE"]
            self.session_handler= data["GLOBAL_ROUTERS"]["CONFIG_HANDLER"]
            self.user_cover_route= data["WEBSITE_ROUTERS"]["USER_COVER_ROUTE"]
            self.user_profile_route= data["WEBSITE_ROUTERS"]["USER_PROFILE_ROUTE"]
            self.article_section_covers= data["WEBSITE_ROUTERS"]["ARTICLE_SECTION_COVER_ROUTE"]
            self.article_section_audios= data["WEBSITE_ROUTERS"]["ARTICLE_SECTION_AUDIO_ROUTE"]
            self.article_section_videos= data["WEBSITE_ROUTERS"]["ARTICLE_SECTION_VIDEO_ROUTE"]
            self.applications_cvs= data["WEBSITE_ROUTERS"]["APPLICATION_CVS_ROUTE"]
            self.ads_covers= data["WEBSITE_ROUTERS"]["ADS_COVERS_ROUTE"]
            self.articles_podcast= data["WEBSITE_ROUTERS"]["ARTICLES_PODCAST_ROUTE"]
            self.categories_covers= data["WEBSITE_ROUTERS"]["CATEGORIES_COVERS_ROUTE"]
            self.categories_icons= data["WEBSITE_ROUTERS"]["CATEGORIES_ICONS_ROUTE"]
            self.article_cover_route= data["WEBSITE_ROUTERS"]["ARTICLE_COVER_ROUTE"]
            self.article_route= data["WEBSITE_ROUTERS"]["ARTICLE_ROUTE"]
            self.contact_route= data["WEBSITE_ROUTERS"]["CONTACT_ROUTE"]
            self.contact_us_route= data["WEBSITE_ROUTERS"]["CONTACT_US_ROUTE"]
            self.messaging_route= data["WEBSITE_ROUTERS"]["MESSAGING_ROUTE"]
            self.messaging_us_route= data["WEBSITE_ROUTERS"]["MESSAGING_US_ROUTE"]
            self.reaching_us_route= data["WEBSITE_ROUTERS"]["REACHING_US_ROUTE"]
            self.login_route = data["WEBSITE_ROUTERS"]['WEBSITE_LOGIN_ROUTE']
            self.logout_route = data["WEBSITE_ROUTERS"]['WEBSITE_LOGOUT_ROUTE']
            self.signup_route = data["WEBSITE_ROUTERS"]['WEBSITE_SIGNUP_ROUTE']
            self.join_route = data["WEBSITE_ROUTERS"]['WEBSITE_JOIN_ROUTE']
            self.password_reset = data["WEBSITE_ROUTERS"]['WEBSITE_PASSWORD_RESET']
            self.about_route = data["WEBSITE_ROUTERS"]['WEBSITE_ABOUT_ROUTE']
            self.about_us_route = data["WEBSITE_ROUTERS"]['WEBSITE_ABOUT_US_ROUTE']
            self.who_we_are_route = data["WEBSITE_ROUTERS"]['WEBSITE_WHO_WE_ARE_ROUTE']
            self.installations_route = data["WEBSITE_ROUTERS"]['WEBSITE_INSTALLATIONS_ROUTE']
            self.services_installations_route = data["WEBSITE_ROUTERS"]['WEBSITE_SERVICES_INSTALLATIONS_ROUTE']

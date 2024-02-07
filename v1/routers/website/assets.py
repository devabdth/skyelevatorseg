import sys
sys.path.insert(0, '../')

from flask import Flask, send_file
from os.path import abspath, dirname, join, exists

from plugins.config import Config
from plugins.consts import Consts

class AssetsRouter:
	def __init__(self, app: Flask):
		self.app: Flask= app
		self.consts: Consts= Consts()
		self.cfg: Config= Config()


	def setup(self):
		self.assign_categories_icons()
		self.assign_articles_covers()
		self.assign_categories_covers()
		self.assign_user_cover()
		self.assign_user_profile()
		self.assign_ads_covers()
		self.assign_articles_podcast()
		self.assign_applications_cvs()
		self.assign_article_section_cover()
		self.assign_article_section_audio()
		self.assign_article_section_video()
		self.assign_get_course_section_video()
		
	def assign_user_cover(self):
		@self.app.route(self.consts.user_cover_route, methods=["GET"])
		def user_cover(user_id):
			try:
				covers_path: str= abspath(join(dirname(__file__), '../../assets/users/covers/'))
				if not exists(covers_path):
					mkdir(covers_path)
					return self.app.response_class(status=404)

				for ext in self.consts.covers_supported_extenstions:
					cover_path= join(covers_path, '{}.{}'.format(user_id, ext))
					if exists(cover_path):
						return send_file(cover_path, mimetype='image/{}'.format(ext))

				return self.app.response_class(status=404)

				
				return self.app.response_class(status= 500)
			except Exception as e:
				print(e)
				return self.app.response_class(status= 500)
	def assign_user_profile(self):
		@self.app.route(self.consts.user_profile_route, methods=["GET"])
		def user_profile(user_id):
			try:
				profiles_path: str= abspath(join(dirname(__file__), '../../assets/users/profiles/'))
				if not exists(profiles_path):
					mkdir(profiles_path)
					return self.app.response_class(status=404)

				for ext in self.consts.covers_supported_extenstions:
					cover_path= join(profiles_path, '{}.{}'.format(user_id, ext))
					if exists(cover_path):
						return send_file(cover_path, mimetype='image/{}'.format(ext))

				return self.app.response_class(status=404)

				
				return self.app.response_class(status= 500)
			except Exception as e:
				print(e)
				return self.app.response_class(status= 500)

	def assign_get_course_section_video(self):
		@self.app.route('/assets/courses/<course_id>/session/video/<session_id>')
		def get_course_section_video(course_id, session_id):
			try:
				if not request.cookies.get("USER_ID"):
					return self.app.response_class(status= 500)
				print(request.cookies.get("USER_ID"))

				for ext in self.consts.videos_supported_extenstions:
					path_= f'../../assets/courses/sessions/{course_id}/{session_id}.{ext}'
					print(abspath(join(dirname(__file__), path_)))
					if (exists(abspath(join(dirname(__file__), path_)))):
						 res= make_response(send_file(abspath(join(dirname(__file__), path_))))
						 return res

				return self.app.response_class(status= 404)
			except Exception as e:
				print(e)
				return self.app.response_class(status= 500)

	def assign_article_section_cover(self):
		@self.app.route(self.consts.article_section_covers, methods=["GET"])
		def article_section_cover(section_id):
			url_params= dict(request.values)
			res= self.helper.articles.get_section_cover(section_id)
			if res != None:
				return send_file(res)
			return self.app.response_class(status= 404)
		
	def assign_article_section_audio(self):
		@self.app.route(self.consts.article_section_audios, methods=["GET"])
		def article_section_audio(section_id):
			url_params= dict(request.values)
			res= self.helper.articles.get_section_audio(section_id)
			if res != None:
				return send_file(res)
			return self.app.response_class(status= 404)
		
	def assign_article_section_video(self):
		@self.app.route(self.consts.article_section_videos, methods=["GET"])
		def article_section_video(section_id):
			url_params= dict(request.values)
			res= self.helper.articles.get_section_video(section_id)
			if res != None:
				return send_file(res)
			return self.app.response_class(status= 404)

	def assign_applications_cvs(self):
		@self.app.route(self.consts.applications_cvs, methods=["GET"])
		def applications_cvs(job_app_id):
			cvs_path: str= abspath(join(dirname(__file__), '../../assets/applications/cvs/'))
			if not exists(cvs_path):
				mkdir(cvs_path)
				return self.app.response_class(status=404)

			for ext in self.consts.cvs_supported_extenstions:
				cv_file= join(cvs_path, '{}.{}'.format(job_app_id, ext))
				if exists(cv_file):
					return send_file(cv_file, mimetype='application/pdf')

			return self.app.response_class(status=404)

	def assign_articles_covers(self):
		@self.app.route(self.consts.article_cover_route, methods=["GET"])
		def articles_covers(article_id):
			covers_path: str= abspath(join(dirname(__file__), '../../assets/covers/articles/'))
			if not exists(covers_path):
				mkdir(covers_path)
				return self.app.response_class(status=404)


			for ext in self.consts.covers_supported_extenstions:
				cover_path= join(covers_path, '{}.{}'.format(article_id, ext))
				if exists(cover_path):
					return send_file(cover_path, mimetype='image/{}'.format(ext))

			return self.app.response_class(status=404)

	def assign_ads_covers(self):
		@self.app.route(self.consts.ads_covers, methods=["GET"])
		def ads_covers(ad_id):
			covers_path: str= abspath(join(dirname(__file__), '../../assets/covers/ads/'))
			if not exists(covers_path):
				mkdir(covers_path)
				return self.app.response_class(status=404)


			for ext in self.consts.covers_supported_extenstions:
				cover_path= join(covers_path, '{}.{}'.format(ad_id, ext))
				if exists(cover_path):
					return send_file(cover_path, mimetype='image/{}'.format(ext))

			return self.app.response_class(status=404)

	def assign_articles_podcast(self):
		@self.app.route(self.consts.articles_podcast, methods=["GET"])
		def articles_podcast(article_id):
			covers_path: str= abspath(join(dirname(__file__), '../../assets/audios/articles/'))
			if not exists(covers_path):
				mkdir(covers_path)
				return self.app.response_class(status=404)


			for ext in self.consts.podcast_supported_extenstions:
				cover_path= join(covers_path, '{}.{}'.format(article_id, ext))
				if exists(cover_path):
					return send_file(cover_path, mimetype='image/{}'.format(ext))

			return self.app.response_class(status=404)


	def assign_categories_covers(self):
		@self.app.route(self.consts.categories_covers, methods=["GET"])
		def categories_covers(category_id):
			covers_path: str= abspath(join(dirname(__file__), '../../assets/covers/categories/'))
			if not exists(covers_path):
				mkdir(covers_path)
				return self.app.response_class(status=404)

			for ext in self.consts.covers_supported_extenstions:
				cover_path= join(covers_path, '{}.{}'.format(category_id, ext))
				if exists(cover_path):
					return send_file(cover_path, mimetype='image/{}'.format(ext))

			return self.app.response_class(status=404)


	def assign_categories_icons(self):
		@self.app.route(self.consts.categories_icons, methods=["GET"])
		def categories_icons(category_id):
			icons_path: str= abspath(join(dirname(__file__), '../../assets/icons/categories/'))
			if not exists(icons_path):
				mkdir(icons_path)
				return self.app.response_class(status=404)

			for ext in self.consts.covers_supported_extenstions:
				icon_path= join(icons_path, '{}.{}'.format(category_id, ext))
				if exists(icon_path):
					return send_file(icon_path, mimetype='image/{}'.format(ext))

			return self.app.response_class(status=404)



	def assign_writers_bg_free(self):
		@self.app.route(self.consts.writers_bg_free, methods=["GET"])
		def writers_bg_free(writer_id):
			covers_path: str= abspath(join(dirname(__file__), '../../assets/writers/bgFree/'))
			if not exists(covers_path):
				mkdir(covers_path)
				return self.app.response_class(status=404)

			for ext in self.consts.covers_supported_extenstions:
				cover_path= join(covers_path, '{}.{}'.format(writer_id, ext))
				if exists(cover_path):
					return send_file(cover_path, mimetype='image/{}'.format(ext))

			return self.app.response_class(status=404)



	def assign_writers_images(self):
		@self.app.route(self.consts.writers_images, methods=["GET"])
		def writers_images(writer_id):
			covers_path: str= abspath(join(dirname(__file__), '../../assets/writers/images/'))
			if not exists(covers_path):
				mkdir(covers_path)
				return self.app.response_class(status=404)

			for ext in self.consts.covers_supported_extenstions:
				cover_path= join(covers_path, '{}.{}'.format(writer_id, ext))
				if exists(cover_path):
					return send_file(cover_path, mimetype='image/{}'.format(ext))

			return self.app.response_class(status=404)


	def assign_writers_covers(self):
		@self.app.route(self.consts.writers_covers, methods=["GET"])
		def writers_covers(writer_id):
			covers_path: str= abspath(join(dirname(__file__), '../../assets/writers/covers/'))
			if not exists(covers_path):
				mkdir(covers_path)
				return self.app.response_class(status=404)

			for ext in self.consts.covers_supported_extenstions:
				cover_path= join(covers_path, '{}.{}'.format(writer_id, ext))
				if exists(cover_path):
					return send_file(cover_path, mimetype='image/{}'.format(ext))

			return self.app.response_class(status=404)

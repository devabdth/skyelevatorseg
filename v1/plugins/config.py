from dotenv import load_dotenv

from os import environ
class Config:
	def __init__(self):
		load_dotenv()

		# App Information
		self.port= environ['PORT'] if 'PORT' in environ.keys() else 1010
		self.app_name= environ['APP_NAME'] if 'APP_NAME' in environ.keys() else 'CUBERS_PROJECT'
		self.email_model_email= environ['MODEL_EMAIL'] if 'MODEL_EMAIL' in environ.keys() else 'no-reply@forexology.net'
		self.email_model_access_key= environ['MODEL_EMAIL_ACCESS_KEY'] if 'MODEL_EMAIL_ACCESS_KEY' in environ.keys() else '1234567890'
		self.auth_key= environ['AUTH_KEY'] if 'AUTH_KEY' in environ.keys() else 'AUTH_KEY'
		self.version= environ['VERSION'] if 'VERSION' in environ.keys() else 'VERSION'
		self.host= environ['HOST'] if 'HOST' in environ.keys() else '0.0.0.0'
		self.debug= (environ['MODE'] if 'MODE' in environ.keys() else 'DEBUG') == 'DEBUG'

		# DB_URL
		self.db_url= environ['DB_URL'] if 'DB_URL' in environ.keys() else None

		# Social Media Links
		self.facebook= environ['FACEBOOK'] if 'FACEBOOK' in environ.keys() else ''
		self.linkedin= environ['LINKEDIN'] if 'LINKEDIN' in environ.keys() else ''
		self.twitter= environ['TWITTER'] if 'TWITTER' in environ.keys() else ''
		self.instagram= environ['INSTAGRAM'] if 'INSTAGRAM' in environ.keys() else ''
		self.tiktok= environ['TIKTOK'] if 'TIKTOK' in environ.keys() else ''
		self.vimeo= environ['VIMEO'] if 'VIMEO' in environ.keys() else ''
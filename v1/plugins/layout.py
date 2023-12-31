from os.path import abspath, dirname, join
from json import loads, dump

class Layout:
	def __init__(self):
		self.layout_path= abspath(join(dirname(__file__), '../jsons/layout.json'))
		self.load()

	def load(self):
		with open(self.layout_path) as f:
			self.data= dict(loads(f.read()))

	def update_home_page(self, payload):
		pass

	def update_header_tabs(self, payload):
		pass
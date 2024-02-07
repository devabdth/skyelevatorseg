class Thread:
	'''
		Parametars:
			id: str
			tile: dict
			bio: dict
			published_in: str
			published_by: str
			tags: list
			category: str
			parent_category: str
	'''


	def __init__(self, payload):
		self.params: list= [
			{'name': "id", "type": str},
			{'name': "tile", "type": dict},
			{'name': "bio", "type": dict},
			{'name': "published_in", "type": str},
			{'name': "published_by", "type": str},
			{'name': "tags", "type": list},
			{'name': "category", "type": str},
			{'name': "parent_category", "type": str}
		]


		for param in self.params:
			if param['name'] in payload.keys():
				if type(payload[param['name']]) != param['type']:
					raise TypeError('"{}"" Expected Type: {} but got {}'.format(param['name'],  param['type'], type(payload[param['name']])))

				setattr(self, param['name'], payload[param['name']])
			else:
				raise KeyError('Parameter "{}" not found'.format(param['name']))


	def to_dict(self):
		return {
			"id": self.id,
			"tile": self.tile,
			"bio": self.bio,
			"published_in": self.published_in,
			"published_by": self.published_by,
			"tags": self.tags,
			"category": self.category,
			"parent_category": self.parent_category,
		}
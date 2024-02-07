class Ad:
	'''
		Parametars:
			title: dict
			subtitle: dict
			bio: dict
			id: str
			created_in: str
			available_till: str
			background_mode: str
			background: str
			redirect: str
	'''

	def __init__(self, payload):
		self.params: list= [
			{'name': 'title', 'type': dict},
			{'name': 'subtitle', 'type': dict},
			{'name': 'bio', 'type': dict},
			{'name': 'id', 'type': str},
			{'name': 'created_in', 'type': str},
			{'name': 'available_till', 'type': str},
			{'name': 'background_mode', 'type': str},
			{'name': 'background', 'type': str},
			{'name': 'redirect', 'type': str},
		]
		for param in self.params:
			if param['name'] in payload.keys():
				if payload[param['name']] is None:
					setattr(self, param['name'], "None")
				else:
					setattr(self, param['name'], payload[param['name']])
			else:
				raise KeyError('Parameter "{}" not found'.format(param['name']))


	def to_dict(self):
		return {
			'title': self.title,
			'subtitle': self.subtitle,
			'bio': self.bio,
			'id': self.id,
			'created_in': self.created_in,
			'available_till': self.available_till,
			'background_mode': self.background_mode,
			'background': self.background,
			'redirect': self.redirect,
		}
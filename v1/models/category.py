class ParentCategory:
	'''
		Parametars:
			id: str
			name: dict,
			bio: dict,
			categories: list
			tags: list

	'''
	def __init__(self, payload):
		self.params: list= [
			{'name': 'id', 'type': str},
			{'name': 'name', 'type': dict},
			{'name': 'bio', 'type': dict},
			{'name': 'categories', 'type': list},
			{'name': 'tags', 'type': list},
		]


		for param in self.params:
			if param['name'] in payload.keys():
				if type(payload[param['name']]) != param['type']:
					raise TypeError('"{}"" Expected Type: {} but got {}'.format(param['name'],  param['type'], type(payload[param['name']])))

				setattr(self, param['name'], payload[param['name']])
			else:
				raise KeyError('Parameter "{}" not found'.format(param['name']))

	def to_dict(self, without_cats= False): 
		if without_cats:
			return {
				'id': self.id,
				'name': self.name,
				'bio': self.bio,
				'categories': [cat.id for cat in self.categories],
				'tags': self.tags,
			}

		return {
			'id': self.id,
			'name': self.name,
			'bio': self.bio,
			'categories': self.categories,
			'tags': self.tags,
		}



class Category:
	'''
		Prametars:
			name: dict
			bio: dict
			id: str
			tags: list

	'''
	def __init__(self, payload):
		self.params: list= [
			{'name': 'id', 'type': str},
			{'name': 'name', 'type': dict},
			{'name': 'bio', 'type': dict},
			{'name': 'tags', 'type': list},
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
			'name': self.name,
			'bio': self.bio,
			'id': self.id,
			'tags': self.tags,
		}

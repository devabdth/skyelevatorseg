
class Category:
	def __init__(self, payload):
		self.params: list= [
			{'name': 'id', 'type': str},
			{'name': 'name', 'type': dict},
			{'name': 'bio', 'type': dict},
			{'name': 'tags', 'type': list},
			{'name': 'alt', 'type': str},
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
			'alt': self.alt,
		}

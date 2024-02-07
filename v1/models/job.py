class Job:
	'''
		Parametars:
			title: dict
			subtitle: dict
			bio: dict
			id: str
			created_in: str
			requiremnts: dict
			duties: dict
			benefits: dict
			salary_type: int
			job_type: int
	'''

	def __init__(self, payload):
		self.params: list= [
			{'name': "title", "type": dict},
			{'name': "subtitle", "type": dict},
			{'name': "bio", "type": dict},
			{'name': "id", "type": str},
			{'name': "created_in", "type": str},
			{'name': "requiremnts", "type": dict},
			{'name': "duties", "type": dict},
			{'name': "benefits", "type": dict},
			{'name': "salary_type", "type": int},
			{'name': "job_type", "type": int},
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
			"title": self.title,
			"subtitle": self.subtitle,
			"bio": self.bio,
			"id": self.id,
			"created_in": self.created_in,
			"requiremnts": self.requiremnts,
			"duties": self.duties,
			"benefits": self.benefits,
			"salary_type": self.salary_type,
			"job_type": self.job_type,
		}

class JobApplication:
	'''
		Parametars:
			job_id: str
			id: str
			name: str
			email: str
			second_email: str
			phone: str
			second_phone: str
			message: str
			placed_in: str

	'''
	def __init__(self, payload):
		self.params: list= [
			{"name": "job_id", "type": str},
			{"name": "id", "type": str},
			{"name": "name", "type": str},
			{"name": "email", "type": str},
			{"name": "second_email", "type": str},
			{"name": "phone", "type": str},
			{"name": "second_phone", "type": str},
			{"name": "message", "type": str},
			{"name": "placed_in", "type": str},
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
			"job_id": self.job_id,
			"id": self.id,
			"name": self.name,
			"email": self.email,
			"second_email": self.second_email,
			"phone": self.phone,
			"second_phone": self.second_phone,
			"message": self.message,
			"placed_in": self.placed_in,
		}
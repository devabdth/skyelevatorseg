class User:
	'''
		Parametars:
			id: str
			name: str
			bio: str
			joined_in: str
			saved_articles: list
			followed_articles: list
			last_log_in: str
	'''
	def __init__(self, payload):
		self.params: list= [
			{"name": "id", "type": str},
			{"name": "name", "type": str},
			{"name": "phone_number", "type": str},
			{"name": "email", "type": str},
			{"name": "password", "type": str},
			{"name": "joined_in", "type": str},
			{"name": "saves", "type": list},
			{"name": "comments", "type": list},
			{"name": "likes", "type": list},
			{"name": "last_log_in", "type": str},
			{"name": "current_reading_article", "type": str},
			{"name": "current_reading_section", "type": str},
			{"name": "recent_read", "type": list},
			{"name": "membership", "type": str}
		]


		for param in self.params:
			if param['name'] in payload.keys():
				if type(payload[param['name']]) != param['type']:
					raise TypeError('"{}"" Expected Type: {} but got {}'.format(param['name'],  param['type'], type(payload[param['name']])))

				setattr(self, param['name'], payload[param['name']])
			else:
				if param['name'] == "courses_wishlist" or param['name'] == "recent_read":
					setattr(self, param['name'], [])
				else:
					raise KeyError('Parameter "{}" not found'.format(param['name']))



	def to_dict(self):
		return {
			"id": self.id,
			"name": self.name,
			"phone_number": self.phone_number,
			"email": self.email,
			"password": self.password,
			"joined_in": self.joined_in,
			"saves": self.saves,
			"comments": self.comments,
			"likes": self.likes,
			"last_log_in": self.last_log_in,
			"current_reading_article": self.current_reading_article,
			"current_reading_section": self.current_reading_section,
			"recent_read": self.recent_read,
			"membership": self.membership,
		}
from database.helper import DatabaseHelper

class Utils:
	def mutliple_to_dicts(self, input_: list, params: dict= None):
		return [ i.to_dict() for i in input_]

	def format_date(self, date, show_hour: bool = False):
		if show_hour:
			parts = date.split(' ')
			return "{} / {} / {}<br>{} : {}".format(
				parts[0].split('-')[0],
				parts[0].split('-')[1],
				parts[0].split('-')[2],
				parts[1].split(':')[0],
				parts[1].split(':')[1],
			)

		else:
			return "{} / {} / {}".format(
				date.split('-')[0],
				date.split('-')[1],
				date.split('-')[2]
			)

	def calculate_sections_with_ads(self, sections: list):
		count= 0
		for section in sections:
			if section.attached_ad_id != None and section.attached_ad_id != '':
				count+= 1
		return count
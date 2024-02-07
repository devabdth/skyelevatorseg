class ArticleSection:
    """
        Parametars:
            title: dict
            subtitle: dict
            bio: dict
            id: str
            attachement_msg: dict
            attachment_type: str
            action_text: dict
            action_link: str
            attached_ad_id: str
            audio_stop: float
    """

    def __init__(self, payload):
        self.params: list = [
            {"name": "title", "type": dict},
            {"name": "subtitle", "type": dict},
            {"name": "bio", "type": dict},
            {"name": "id", "type": str},
            {"name": "attachement_msg", "type": dict},
            {"name": "attachment_type", "type": str},
            {"name": "attached_ad_id", "type": str},
            {"name": "audio_stop", "type": float},
        ]

        for param in self.params:
            if param['name'] in payload.keys():
                if param['name'] == 'audio_stop':
                    payload[param['name']]= float(payload[param['name']])
                if type(payload[param['name']]) != param['type']:
                    raise TypeError('"{}"" Expected Type: {} but got {}'.format(
                        param['name'],  param['type'], type(payload[param['name']])))

                setattr(self, param['name'], payload[param['name']])
            else:
                raise KeyError(
                    'Parameter "{}" not found'.format(param['name']))

    def to_dict(self):
        return {
            "title": self.title,
            "subtitle": self.subtitle,
            "bio": self.bio,
            "id": self.id,
            "attachement_msg": self.attachement_msg,
            "attachment_type": self.attachment_type,
            "attached_ad_id": self.attached_ad_id,
            "audio_stop": self.audio_stop,
        }

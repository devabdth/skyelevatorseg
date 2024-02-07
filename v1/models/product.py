class Product:
    def __init__(
        self, id: str, name: dict, bio: dict, pricing: float, assets: list,
        category: int, sub_category: int, inventory: dict,
        code: str, specs: dict, vat: float = 0.14, colors: list = [], sizes: list = [],
    ):
        self.id = id
        self.name = name
        self.bio = bio
        self.assets = assets
        self.category = category
        self.sub_category = sub_category
        self.code = code
        self.pricing = pricing
        self.specs = specs
        self.vat = vat
        self.colors = colors
        self.sizes = sizes
        self.inventory = inventory

    def to_dict(self) -> dict:
        return {
            "id": str(self.id),
            "name": self.name,
            "bio": self.bio,
            "assets": self.assets,
            "category": self.category,
            "subCategory": self.sub_category,
            "code": self.code,
            "pricing": self.pricing,
            "specs": self.specs,
            "vat": self.vat,
            "colors": self.colors or "",
            "sizes": self.sizes or "",
            "inventory": self.inventory,
        }


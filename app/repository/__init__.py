class Repository(object):
    def __init__(self, adapter=None):
        self.client = adapter()

    def list(self):
        return self.client.list()

    def add(self, title, release_year, origin,director,film_cast,genre,wiki,plot):
        return self.client.add(title, release_year, origin,director,film_cast,genre,wiki,plot)

    def edit(self, id, field, value):
        return self.client.edit(id, field, value)

    def delete(self, id):
        return self.client.delete(id)
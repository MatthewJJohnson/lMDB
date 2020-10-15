from ..repository import Repository
from ..repository.db import PostgresRepo


class Service(object):
    def __init__(self, client=Repository(adapter=PostgresRepo)):
        self.client = client

    def list_movies(self):
        data = self.client.list()
        return data  # list of movies

    def add_movie(self, title, release_year, origin,director,film_cast,genre,wiki,plot):
        records_added = self.client.add(title, release_year, origin,director,film_cast,genre,wiki,plot)
        return records_added > 0

    def edit_movie(self, id, field, value):
        records_affected = self.client.edit(id, field, value)
        return records_affected > 0

    def delete_movie(self, id):
        records_affected = self.client.delete(id)
        return records_affected > 0

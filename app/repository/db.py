import psycopg2 as psycopg2
from psycopg2 import sql
from psycopg2.extras import RealDictCursor


class PostgresRepo(object):
    def __init__(self):
        self.dbConnection = psycopg2.connect(user="postgres",
                                      password="<PASSWD>",
                                      host="localhost",
                                      port="5432",
                                      database="balto_skills_test")

        #this cursor is much more feature rich then default
        self.cursor = self.dbConnection.cursor(cursor_factory=RealDictCursor)
        #print statement taken from my practice flask project on Friday
        print("Connected to:", "@".join([self.dbConnection.get_dsn_parameters()['krbsrvname'], ":".join(
            [self.dbConnection.get_dsn_parameters()['port'], self.dbConnection.get_dsn_parameters()['host']])]), "using database:",
              self.dbConnection.get_dsn_parameters()['dbname'])

    def list(self):
        self.cursor.execute("SELECT * from lmdb.film_simple")
        return self.cursor.fetchall()

    def add(self, title, release_year, origin,director,film_cast,genre,wiki,plot):
        self.cursor.execute("insert into lmdb.film_simple(release_year, title, origin, director, film_cast, genre, wiki, plot) VALUES (%(release_year)s,%(title)s,%(origin)s,%(director)s,%(film_cast)s,%(genre)s,%(wiki)s,%(plot)s)",
                            {
                                "release_year": release_year,
                                "title": title,
                                "origin": origin,
                                "director": director,
                                "film_cast": film_cast,
                                "genre": genre,
                                "wiki": wiki,
                                "plot": plot,
                            })
        count = self.cursor.rowcount
        self.dbConnection.commit()
        return count

    def edit(self, id, field, value):
        query = sql.SQL("update lmdb.film_simple set {} = %(value)s where id = %(id)s")
        query = query.format(sql.Identifier(field))
        self.cursor.execute(query, {"id": id, "value": value})
        count = self.cursor.rowcount
        self.dbConnection.commit()
        return count

    def delete(self, id):
        self.cursor.execute("delete from lmdb.film_simple where id = %(id)s", {"id": id})
        count = self.cursor.rowcount
        self.dbConnection.commit()
        return count
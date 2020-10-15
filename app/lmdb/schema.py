from marshmallow import Schema, fields

class Movie(Schema):
  __id = fields.Int()
  release_year = fields.Int()
  title = fields.Str()
  origin = fields.Str()
  director = fields.Str()
  film_cast = fields.Str()
  genre = fields.Str()
  wiki = fields.Str()
  plot = fields.Str()
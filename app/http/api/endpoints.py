from flask import Flask, json, g, request, render_template
from app.lmdb.service import Service as lmdb
from app.lmdb.schema import Movie
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

#quick and dirty landing page
@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

#fetch all
@app.route("/list", methods=["GET"])
def list():
    return json_response(lmdb().list_movies())

#add one
@app.route("/add", methods=["PUT"])
@cross_origin(supports_credentials=True)
def add():
    data = request.get_json()
    if lmdb().add_movie(data['title'], data['release_year'], data['origin'], data['director'], data['film_cast'], data['genre'], data['wiki'], data['plot']):
        return json_response({'success': True})
    else:
        return json_response({'success': False, 'error': 'id not found'}, 404)

#update any field of record film_simple
@app.route("/update", methods=["PUT"])
@cross_origin(supports_credentials=True)
def edit():
    data = request.get_json()
    if lmdb().edit_movie(data['id'], data['column'], data['value']):
        return json_response({'success': True})
    else:
        return json_response({'success': False, 'error': 'id not found'}, 404)

#remove a record
@app.route("/delete/<int:_id>", methods=["DELETE"])
@cross_origin(supports_credentials=True)
def delete(_id):
    if lmdb().delete_movie(_id):
        return json_response({'success': True})
    else:
        return json_response({'success': False, 'error': 'id not found'}, 404)

#prettify
def json_response(payload, status=200):
    return json.dumps(payload), status, {'content-type': 'application/json'}
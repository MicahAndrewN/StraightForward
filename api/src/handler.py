"""This is a generic handler that will write to and read from database and allow frontend to print result."""
import flask # run `pip install Flask` if this is not found
from flask import Flask
import json
import requests, request, session

app = Flask(__name__)

# to start server run `python3 /api/src/handler.py` from rootdir
@app.route("/handler1", methods=["GET"])
def handle():
    resp = requests.put(url="https://straightforward-89f53-default-rtdb.firebaseio.com/users.json", data=json.dumps({'apiuser': 'API User'}))
    resp = requests.get(url="https://straightforward-89f53-default-rtdb.firebaseio.com/users.json")
    return resp.json()

app.route("login", methods=['POST'])
def handle_login():
    flask.session['username'] = request.json.get('username')
    print('logged in user is ', flask.session['username'])

if __name__ == '__main__':
    app.run()

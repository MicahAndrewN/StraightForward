"""This is a generic handler that will write to and read from database and allow frontend to print result."""
import flask # run `pip install Flask` if this is not found
from flask import Flask, request, session, jsonify
import json
import requests
import os

app = Flask(__name__)
app.secret_key = 'super secret key'

def getLogname():
    return flask.session['username']

# to start server run `python3 /api/src/handler.py` from rootdir
@app.route("/handler1", methods=["GET"])
def handle():
    resp = requests.put(url="https://straightforward-89f53-default-rtdb.firebaseio.com/users.json", data=json.dumps({'Alpha-user': {'name': 'alpha-user'}}))
    resp = requests.get(url="https://straightforward-89f53-default-rtdb.firebaseio.com/users.json")
    return resp.json()

@app.route("/login", methods=['POST'])
def handle_login():
    print(request.json.get('username'))
    flask.session['username'] = request.json.get('username')
    print('logged in user is ', flask.session['username'])
    return jsonify({'status_code': 200}), 200

@app.route("/getname", methods=['GET'])
def hello_user():
    resp = requests.get(url=f"https://straightforward-89f53-default-rtdb.firebaseio.com/users/{getLogname()}.json")
    return resp.json()

@app.route("/getwidgets", methods=['GET'])
def get_widget():
    resp = requests.get(url=f"https://straightforward-89f53-default-rtdb.firebaseio.com/users/{getLogname()}/widgets.json")
    print(resp)
    return resp.json()

@app.route("/addwidget", methods=['POST'])
def postwidget():
    cmd = f"curl -X POST https://straightforward-89f53-default-rtdb.firebaseio.com/users/{getLogname()}/widgets.json -d '{json.dumps(request.json)}'"
    os.system(cmd)
    return jsonify({'status_code': 200}), 200

if __name__ == '__main__':
    app.debug = True
    app.run()

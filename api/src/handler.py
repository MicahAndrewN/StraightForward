"""This is a generic handler that will write to and read from database and allow frontend to print result."""
import flask # run `pip install Flask` if this is not found
from flask import Flask, request, session, jsonify
# import flask_cors
import json
import requests
import os

app = Flask(__name__)
# flask_cors.CORS(app)
app.secret_key = 'super secret key'

def getLogname():
    return flask.session['username']

@app.route("/login", methods=['POST'])
# @flask_cors.cross_origin
def handle_login():
    print(request.json.get('username'))
    flask.session['username'] = request.json.get('username')
    print('logged in user is ', flask.session['username'])
    return jsonify({'status_code': 200}), 200

@app.route("/logout", methods=['GET'])
def handle_logout():
    flask.session['username'] = ''
    return jsonify({'status_code': 200}), 200

@app.route("/getname", methods=['GET'])
def hello_user():
    resp = requests.get(url=f"https://straightforward-89f53-default-rtdb.firebaseio.com/users/{getLogname()}.json")
    return resp.json()

@app.route("/getwidgets", methods=['GET'])
def get_widget():
    resp = requests.get(url=f"https://straightforward-89f53-default-rtdb.firebaseio.com/users/{getLogname()}/widgets.json")
    return resp.json()

@app.route("/addwidget", methods=['POST'])
def postwidget():
    resp = requests.get(url=f"https://straightforward-89f53-default-rtdb.firebaseio.com/users/{getLogname()}/widgets.json")
    resp_json = resp.json()
    req = request.json
    if isinstance(resp_json, str):
        resp_json = [resp_json]
    for item in resp_json:
        if resp_json[item]['type'] == 'contacts' and resp_json[item]['name'] == req['name']:
            return jsonify({'status_code': 304}), 304
        if resp_json[item]['type'] == 'playlist' and resp_json[item]['name'] == req['name']:
            return jsonify({'status_code': 304}), 304
            
    cmd = f"curl -X POST https://straightforward-89f53-default-rtdb.firebaseio.com/users/{getLogname()}/widgets.json -d '{req}'"
    os.system(cmd)
    return jsonify({'status_code': 200}), 200

@app.route("/deletewidget", methods=['DELETE'])
def deletewidget():
    resp = requests.get(url=f"https://straightforward-89f53-default-rtdb.firebaseio.com/users/{getLogname()}/widgets.json")
    resp_json = resp.json()
    req = request.json
    if isinstance(resp_json, str):
        resp_json = [resp_json]
    for item in resp_json:
        if resp_json[item]['type'] == 'contacts' and resp_json[item]['name'] == req['name']:
            requests.delete(url=f"https://straightforward-89f53-default-rtdb.firebaseio.com/users/{getLogname()}/widgets/{item}.json")
            return jsonify({'status_code': 204}), 204
    return jsonify({'status_code': 404}), 404

if __name__ == '__main__':
    app.debug = True
    app.run()

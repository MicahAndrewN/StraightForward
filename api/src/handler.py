"""This is a generic handler that will write to and read from database and allow frontend to print result."""
import flask # run `pip install Flask` if this is not found
from flask import Flask
import json

app = Flask(__name__)

# to start server run `python3 /api/src/handler.py` from rootdir
@app.route("/handler1", methods=["GET"])
def handle():
    return json.dumps({'body': 'hi from api'})


if __name__ == '__main__':
    app.run()

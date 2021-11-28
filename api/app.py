from flask import Flask, jsonify, request
from models import User, db
from flask_migrate import Migrate
import requests
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, support_credentials=True)


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sideway.db'
db.init_app(app)

migrate = Migrate(app, db)


@app.route('/journey', methods=['GET'])
@cross_origin(supports_credentials=True)
def state():
    sideway = User.query.all()[0].to_dict()
    return jsonify(sideway) , 200



@app.route('/journey', methods=['PATCH'])
@cross_origin(supports_credentials=True)
def edit_state():
    sideway = User.query.all()[0]
    data = request.json
    for key, value in data.items():
        setattr(sideway,key,value)
    db.session.commit()
    return jsonify(sideway.to_dict()), 200


@app.route("/destination", methods=['POST'])
def set_destination():
    sideway = User.query.all()[0]
    data = request.data
    r = requests.post('http://127.0.0.1:8080/destination', data=data)
    if r.status_code != 200:
        return r.text, 400
    else:
        return r.text, 200




if __name__ == "__main__":
    app.run(debug=True)
from flask import Flask, jsonify, request
import random 
import time
from threading import Thread
import requests
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, support_credentials=True)

state_vehicle = {'id':'PHX-001','position':'','currentState':'LIBRE', 'destination':''}

@app.route('/destination', methods=['POST'])
@cross_origin(supports_credentials=True)
def set_destination():
    answer_journey = random.random()
    if answer_journey > 0.66:
        return "El viaje no ha sido aceptado", 400
    else:
        Thread(target = travel_to, args=(request.data.decode('utf-8'),)).start()
    
    return 'El viaje ha sido aceptado'


def travel_to(destination):

    state_vehicle['position'] = f'Yendo a {destination}'
    state_vehicle['currentState'] = 'OCUPADO'  
    state_vehicle['destination'] = destination  
    t = requests.patch('http://127.0.0.1:5000/journey', json=state_vehicle)
    time.sleep(random.randrange(10,60))
    state_vehicle['position'] = 'Estacion de carga'
    state_vehicle['currentState'] = 'LIBRE' 
    state_vehicle['destination'] = ''
    t = requests.patch('http://127.0.0.1:5000/journey', json=state_vehicle)
 



@app.route('/delete/destination', methods=['POST'])
@cross_origin(supports_credentials=True)
def delete_destination():
    Thread(target = delete_travel).start()
    return "viaje cancelado"

def delete_travel():
    state_vehicle['position'] = 'Estacion de carga'
    state_vehicle['currentState'] = 'LIBRE' 
    state_vehicle['destination'] = ''
    t = requests.patch('http://127.0.0.1:5000/journey', json=state_vehicle)

    


if __name__ == "__main__":
    app.run(debug=True, port=8080)
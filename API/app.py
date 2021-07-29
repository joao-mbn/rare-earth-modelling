
from API.algoritmoOtimizacao.ETRClass import ETR
from API.algoritmoOtimizacao.ProtonClass import Proton
from typing import Union
from flask import Flask, jsonify, request, render_template
import algoritmoOtimizacao.Instancias as Instancias

app: Flask = Flask(__name__);
isoterma: dict[Union[Proton, ETR]] = Instancias.isoterma;

@app.route('/', methods=['GET', 'POST'])
def send_isotherm_results():
    return jsonify(isoterma)
    # POST request
    if request.method == 'POST':
        print('Incoming..')
        print(request.get_json())  # parse as JSON
        return 'OK', 200

    # GET request
    else:
        message = {'greeting': 'Hello from Flask!'}
        return jsonify(message)  # serialize and use JSON headers

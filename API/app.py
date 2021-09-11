from flask.wrappers import Response;
from flask import Flask, jsonify, request;
from flask_cors import CORS;
from typing import Union;
from algoritmoOtimizacao.ETRClass import ETR;
from algoritmoOtimizacao.ProtonClass import Proton;
import algoritmoOtimizacao.Instancias as Instancias;

app = Flask(__name__);
CORS(app);
    
@app.route('/simulations/get-results/', methods = ['GET'])
def get_isoterma_dto() -> Response:
    isotherm_dto: dict[Union[Proton, ETR]] = Instancias.isotherm.create_all_elements_extraction_data_dto();
    isotherm_dto_json = jsonify(isotherm_dto);
    return isotherm_dto_json;
    
@app.route('/simulations/post-conditions/', methods = ['POST'])
def post_simulation_operation_conditions() -> Response:
    response = Response();
    Instancias.isotherm.n_celulas = request.json['nStages'];
    Instancias.isotherm.rao = request.json['rao'];
    Instancias.H.ca0 = 10**-request.json['pH'];
    return response;
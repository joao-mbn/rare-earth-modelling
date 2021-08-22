from flask.wrappers import Response
from flask import Flask, jsonify
from flask_cors import CORS
from typing import Union
from algoritmoOtimizacao.ETRClass import ETR
from algoritmoOtimizacao.ProtonClass import Proton
import algoritmoOtimizacao.Instancias as Instancias

# return jsonify(isoterma)
app = Flask(__name__);
CORS(app);
    
@app.route('/')
def get_isoterma_dto() -> Response:
    isotherm_dto: dict[Union[Proton, ETR]] = Instancias.isotherm_dto;
    isotherm_dto_json = jsonify(isotherm_dto);
    return isotherm_dto_json;
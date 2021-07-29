from flask.wrappers import Response
from algoritmoOtimizacao.ETRClass import ETR
from algoritmoOtimizacao.ProtonClass import Proton
import algoritmoOtimizacao.Instancias as Instancias
from flask import Flask, jsonify
from typing import Union

# return jsonify(isoterma)
app = Flask(__name__);
    
@app.route('/')
def get_isoterma_dto() -> Response:
    isotherm_dto: dict[Union[Proton, ETR]] = Instancias.isotherm_dto;
    isotherm_dto_json = jsonify(isotherm_dto);
    return isotherm_dto_json;
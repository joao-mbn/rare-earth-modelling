import numpy as np
from ElementoClass import Elemento

class Proton(Elemento):

    def __init__(proton, nome, simbolo, preco, ca0):

        super().__init__(nome, simbolo, preco, ca0)
        proton.pH_inicial = -np.log10(ca0)

    def pH (proton, ca):

        pH = -np.log10(ca)
        return pH

    def chutes_iniciais(elemento, rao: float, n_celulas: int, valor_esperado_final: float, isExtracao: bool):

        if isExtracao:
            chutes = np.linspace(elemento.ca0, valor_esperado_final, n_celulas)
        else:
            chutes = np.linspace(valor_esperado_final, elemento.ca0, n_celulas)
            
        return chutes

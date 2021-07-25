import numpy as np
from ElementoClass import Elemento

class Proton(Elemento):

    def __init__(proton, nome, simbolo, preco, ca0):

        super().__init__(nome, simbolo, preco, ca0)
        proton.pH_inicial = -np.log10(ca0)

    def pH (proton, ca):

        pH = -np.log10(ca)
        return pH

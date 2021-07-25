import numpy as np
from CoisaFisicaClass import Coisa_Fisica

class Elemento(Coisa_Fisica):

    def __init__(elemento, nome: str, simbolo: str, preco: float, ca0: float):

        super().__init__(nome, preco)
        elemento.simbolo = simbolo
        elemento.ca0 = ca0

    def concentracoes_aquoso(elemento, chutes: list, n_celulas: int):

        cas = {'ca1': chutes[0]}

        for i in range(2, n_celulas + 1):
            cas['ca' + str(i)] = chutes[i - 1]

        return cas

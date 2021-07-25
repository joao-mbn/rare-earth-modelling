import numpy as np
from CoisaFisicaClass import Coisa_Fisica
from ProtonClass import Proton
from Instancias import isoterma


class Elemento(Coisa_Fisica):

    def __init__(elemento, nome, simbolo, preco, ca0):

        super().__init__(nome, preco)
        elemento.simbolo = simbolo
        elemento.ca0 = ca0

    def chutes_iniciais(elemento, n_celulas, valor_esperado_final):

        if isoterma.tipo == 'Extração':
            chutes = np.linspace(elemento.ca0, valor_esperado_final, n_celulas)
        else:
            if type(elemento) == Proton:
                chutes = np.linspace(valor_esperado_final, elemento.ca0, n_celulas)
            else:
                chutes = np.linspace(valor_esperado_final / isoterma.rao, elemento.con / isoterma.rao, n_celulas)
        return chutes

    def concentracoes_aquoso(elemento, chutes):

        cas = {'ca1': chutes[0]}

        for i in range(2, isoterma.n_celulas + 1):
            cas['ca' + str(i)] = chutes[i - 1]

        return cas

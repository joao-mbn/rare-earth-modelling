from CoisaFisicaClass import Coisa_Fisica

class Substancia(Coisa_Fisica):

    def __init__(substancia, nome, preco, propriedades_fisqui):
        assert type(propriedades_fisqui) == dict

        super().__init__(nome, preco)
        for key in propriedades_fisqui:
            setattr(substancia, key, propriedades_fisqui[key])

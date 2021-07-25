from ElementoClass import Elemento

class ETR(Elemento):

    def __init__(etr, nome, simbolo, preco, pureza_minima,
                 ca0, con, massa_molar_oxido, proporcao_estequiometrica, coef_ang_modelo, coef_lin_modelo):

        super().__init__(nome, simbolo, preco, ca0)
        etr.ca0_gl = ca0
        etr.con_gl = con
        etr.massa_molar_oxido = massa_molar_oxido
        etr.proporcao_estequiometrica = proporcao_estequiometrica #proporção estequiométrica entre o elemento e o seu óxido
        etr.a = coef_ang_modelo
        etr.b = coef_lin_modelo
        etr.ca0 = etr.ca0_gl * etr.proporcao_estequiometrica / etr.massa_molar_oxido
        etr.con = etr.con_gl * etr.proporcao_estequiometrica / etr.massa_molar_oxido
        etr.pureza_minima = pureza_minima

    def propriedades(etr): #o método '__dict__' ou 'vars(objeto)' fazem a mesma coisa, só que mais feio.

        print ('Nome: '
               + etr.nome
               + '\nConcentração da Alimentação Aquosa (g/L): '
               + str(etr.ca0_gl)
               + '\nConcentração da Alimentação Orgânica (g/L): '
               + str(etr.con_gl)
               + '\nMassa Molar (g/mol): '
               + str(etr.massa_molar_oxido)
               + '\nLog D =', etr.a, '* pH ', etr.b)

    def D (etr, H):

        D = H ** - etr.a * 10 ** etr.b
        return D

    def concentracoes_organico(etr, D, ca):

        co = D * ca
        return co

    def conservacao_de_massa_aq(etr, ca_anterior, ca_atual, ca_posterior, h_atual, h_posterior, rao):

        cm_etr = (
                  ca_atual * (etr.D(h_atual) + rao)
                  - ca_posterior * etr.D(h_posterior)
                  - ca_anterior * rao
                  )

        return cm_etr

    def conservacao_de_massa_org(etr, ca_anterior, ca_atual, co_inicial, h_atual, rao):

        cm_etr = (
                  ca_atual * (etr.D(h_atual) + rao)
                  - co_inicial
                  - ca_anterior * rao
                  )

        return cm_etr

from CoisaFisicaClass import Coisa_Fisica

class Celula(Coisa_Fisica):

    def __init__(celula, nome, preco, numero, tempo_depreciacao = None):

        super().__init__(nome, preco)
        celula.numero = numero
        celula.tempo_depreciacao = tempo_depreciacao

    def balanco_de_massa(celula, etr, cas_etr, cas_H, rao, n_celulas):

        if celula.numero == 1:
            bm_etr = etr.conservacao_de_massa_aq(etr.ca0,
                                                 cas_etr['ca1'],
                                                 cas_etr['ca2'],
                                                 cas_H['ca1'],
                                                 cas_H['ca2'],
                                                 rao)
        elif celula.numero == n_celulas:
            bm_etr = etr.conservacao_de_massa_org(cas_etr['ca' + str(n_celulas - 1)],
                                                  cas_etr['ca' + str(n_celulas)],
                                                  etr.con,
                                                  cas_H['ca' + str(n_celulas)],
                                                  rao)
        else:
            bm_etr = etr.conservacao_de_massa_aq(cas_etr['ca' + str(celula.numero - 1)],
                                                 cas_etr['ca' + str(celula.numero)],
                                                 cas_etr['ca' + str(celula.numero + 1)],
                                                 cas_H['ca' + str(celula.numero)],
                                                 cas_H['ca' + str(celula.numero + 1)],
                                                 rao)

        return bm_etr

    def balanco_de_carga(celula, cas_H, lista_cas_etrs, K):

        etrs_totais_celula = 0

        for cas_etr in range(len(lista_cas_etrs)):
            etr_total_celula = lista_cas_etrs[cas_etr]['ca' + str(celula.numero)]
            etrs_totais_celula += etr_total_celula

        carga_total_protons_celula = cas_H['ca' + str(celula.numero)]
        carga_total_celula = 3 * etrs_totais_celula + carga_total_protons_celula

        bc = carga_total_celula - K

        return bc

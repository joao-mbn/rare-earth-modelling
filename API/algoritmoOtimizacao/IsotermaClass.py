import numpy as np
import pandas as pd
from typing import Union
from scipy.optimize import fsolve
from ETRClass import ETR
from CelulaClass import Celula
from ProtonClass import Proton
class Isoterma():

    def __init__ (isoterma, n_celulas, rao, lista_elementos: list):

        assert type(lista_elementos) == list
        assert type(lista_elementos[0]) == Proton

        isoterma.n_celulas = n_celulas
        isoterma.rao = rao
        isoterma.lista_elementos = lista_elementos

        if isoterma.lista_elementos[1].ca0 > 0:
            isoterma.isExtracao = True
        else:
            isoterma.isExtracao = False

    def junta_chutes_iniciais(isoterma):

        proton: Proton = isoterma.lista_elementos[0]
        lista_etrs: list = isoterma.lista_elementos[1:]

        if isoterma.isExtracao:
            chutes_H = proton.chutes_iniciais(isoterma.rao, isoterma.n_celulas, 1.2 * proton.ca0, isoterma.isExtracao)
            chutes_etrs = np.concatenate(
              [etr.chutes_iniciais(isoterma.rao, isoterma.n_celulas, 0.001 * etr.ca0, isoterma.isExtracao) for etr in lista_etrs]
            )
        else:
            chutes_H = proton.chutes_iniciais(isoterma.rao, isoterma.n_celulas, 0.8 * proton.ca0, isoterma.isExtracao)
            chutes_etrs = np.concatenate(
              [etr.chutes_iniciais(isoterma.rao, isoterma.n_celulas, 0.001 * etr.con, isoterma.isExtracao) for etr in lista_etrs]
            )
        chutes = np.concatenate((chutes_H, chutes_etrs))

        return chutes

    def junta_variaveis(isoterma, chutes: list):

        proton: Proton = isoterma.lista_elementos[0]
        chutes_H: list = chutes[0 : isoterma.n_celulas]

        cas_H: list  = proton.concentracoes_aquoso(chutes_H, isoterma.n_celulas)
        cas: list = [cas_H]

        for i in range(1, len(isoterma.lista_elementos)):
            etr: ETR = isoterma.lista_elementos[i]
            chutes_etr: list = chutes[i * isoterma.n_celulas : (i + 1) * isoterma.n_celulas]
            cas_etr: list = etr.concentracoes_aquoso(chutes_etr, isoterma.n_celulas)
            cas.append(cas_etr)

        return cas

    def constante_de_carga(isoterma):

        proton = isoterma.lista_elementos[0]
        cargas_totais_etr = 0

        for etr in isoterma.lista_elementos[1:]:
            cargas_totais_etr += 3 * (etr.ca0)

        K = cargas_totais_etr + proton.ca0

        return K

    def equacoes_massa_carga(isoterma, chutes):

        rao = isoterma.rao
        n_celulas = isoterma.n_celulas
        cas_H = isoterma.junta_variaveis(chutes)[0]
        lista_cas_etrs = isoterma.junta_variaveis(chutes)[1:]
        K = isoterma.constante_de_carga()

        equacoes = []

        for numero_da_celula in range(1, n_celulas + 1):
            celula = Celula(None, None, numero_da_celula)

        #equações de balanço de massa
            for cas_etrs in range(len(lista_cas_etrs)):
                cas_etr = lista_cas_etrs[cas_etrs]
                etr = isoterma.lista_elementos[cas_etrs + 1]
                bm_etr = celula.balanco_de_massa(etr, cas_etr, cas_H, rao, n_celulas)
                equacoes.append(bm_etr)

        #equações de balanço de carga
            bc = celula.balanco_de_carga(cas_H, lista_cas_etrs, K)
            equacoes.append(bc)

        return equacoes

    def resolve_equacoes_massa_carga(isoterma):

        resultados = fsolve(isoterma.equacoes_massa_carga, isoterma.junta_chutes_iniciais())
        return resultados

    def create_isotherm_results_dto(isoterma) -> dict[Union[Proton, ETR]]:

        isotherm_results: np.array = isoterma.resolve_equacoes_massa_carga();
        isotherm_results_dto: dict = {};

        element: Union[Proton, ETR];
        index: int;
        for index, element in enumerate(isoterma.lista_elementos):
            isotherm_results_dto[element.nome] = isotherm_results[index * isoterma.n_celulas: (index + 1) * isoterma.n_celulas];
        return isotherm_results_dto;

    def monta_tabela(isoterma, uso, excel = False):

        resultados = isoterma.resolve_equacoes_massa_carga()
        tabela_externa = pd.DataFrame({'Estágio Nº': np.arange(1, isoterma.n_celulas + 1)})
        tabela_interna = pd.DataFrame({'Estágio Nº': np.arange(1, isoterma.n_celulas + 1)})

        for i in range(len(isoterma.lista_elementos)):
            elemento = isoterma.lista_elementos[i]
            simbolo_elementar = elemento.simbolo
            concentracoes_aq_molar = (resultados[isoterma.n_celulas * i: isoterma.n_celulas * (i + 1)])

            if type(elemento) != Proton:
                concentracoes_aq_gl = (concentracoes_aq_molar * elemento.massa_molar_oxido
                                       / elemento.proporcao_estequiometrica)
                D = elemento.D(tabela_externa['[' + isoterma.lista_elementos[0].simbolo + '](mol/L)'])
                concentracoes_org_molar = elemento.concentracoes_organico(D, concentracoes_aq_molar)
                concentracoes_org_gl = elemento.concentracoes_organico(D, concentracoes_aq_gl)

                tabela_interna['[' + simbolo_elementar + ']aq(mol/L)'] = concentracoes_aq_molar
                tabela_externa['[' + simbolo_elementar + ']aq(g/L)'] = concentracoes_aq_gl
                tabela_interna['[' + simbolo_elementar + ']org(mol/L)'] = concentracoes_org_molar
                tabela_externa['[' + simbolo_elementar + ']org(g/L)'] = concentracoes_org_gl
                tabela_externa['D ' + simbolo_elementar] = D

                if i > 1:
                    Beta = D / tabela_externa['D ' + isoterma.lista_elementos[i - 1].simbolo]
                    tabela_externa['Beta ' + simbolo_elementar + '/' + isoterma.lista_elementos[i - 1].simbolo] = Beta

            else:
                tabela_interna['[' + simbolo_elementar + '](mol/L)'] = concentracoes_aq_molar
                tabela_externa['[' + simbolo_elementar + '](mol/L)'] = concentracoes_aq_molar
                tabela_externa['pH'] = elemento.pH(concentracoes_aq_molar)

        tabela_externa.set_index('Estágio Nº', inplace = True)
        tabela_interna.set_index('Estágio Nº', inplace = True)

        if excel:
            tabela_externa.to_excel('Isoterma.xlsx',
                                    sheet_name = str((isoterma.rao, isoterma.n_celulas,
                                                      isoterma.lista_elementos[0].pH_inicial)))
        if uso == 'interno':
            return tabela_interna
        else:
            return tabela_externa

    def resumo(isoterma):

        tabela = isoterma.monta_tabela(uso = 'interno')

        tabela_resumida = pd.DataFrame(columns = [etr.simbolo for etr in isoterma.lista_elementos[1:]])
        tabela_resumida.loc['Alimentação aq. (mol/L)'] = [etr.ca0 for etr in isoterma.lista_elementos[1:]]
        tabela_resumida.loc['Alimentação org. (mol/L)'] = [etr.con for etr in isoterma.lista_elementos[1:]]
        tabela_resumida.loc['Rafinado (mol/L)'] = np.array(tabela.iloc[-1, 1: :2])
        tabela_resumida.loc['Carregado Orgânico (mol/L)'] = np.array(tabela.iloc[0, 2: :2])
        tabela_resumida.loc['Composição Rafinado (%)'] = (tabela_resumida.loc['Rafinado (mol/L)'] * 100
                                                          / tabela_resumida.loc['Rafinado (mol/L)'].sum())
        tabela_resumida.loc['Composição org. Carregado (%)'] = (tabela_resumida.loc['Carregado Orgânico (mol/L)']
                                                                * 100 / (tabela_resumida.loc['Carregado Orgânico (mol/L)']
                                                                .sum()))
        if isoterma.isExtracao == True:
            tabela_resumida.loc['Recuperação Rafinado (%)'] = (tabela_resumida.loc['Rafinado (mol/L)'] * 100
                                                               / tabela_resumida.loc['Alimentação aq. (mol/L)'])
        else:
            tabela_resumida.loc['Recuperação Rafinado (%)'] = ((tabela_resumida.loc['Alimentação org. (mol/L)']
                                                                - tabela_resumida.loc['Carregado Orgânico (mol/L)'])
                                                                * 100 / tabela_resumida.loc['Alimentação org. (mol/L)'])

        tabela_resumida.loc['Recuperação Orgânico (%)'] = 100 - tabela_resumida.loc['Recuperação Rafinado (%)']

        return tabela_resumida

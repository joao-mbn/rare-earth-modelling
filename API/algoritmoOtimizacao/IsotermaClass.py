import numpy as np
import pandas as pd
from typing import Union
from scipy.optimize import fsolve
from algoritmoOtimizacao.ETRClass import ETR
from algoritmoOtimizacao.CelulaClass import Celula
from algoritmoOtimizacao.ProtonClass import Proton


class Isoterma():

    def __init__(isoterma, n_celulas, rao, lista_elementos: list):

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
            chutes_H = proton.chutes_iniciais(
                isoterma.rao, isoterma.n_celulas, 1.2 * proton.ca0, isoterma.isExtracao)
            chutes_etrs = np.concatenate(
                [etr.chutes_iniciais(isoterma.rao, isoterma.n_celulas, 0.001 *
                                     etr.ca0, isoterma.isExtracao) for etr in lista_etrs]
            )
        else:
            chutes_H = proton.chutes_iniciais(
                isoterma.rao, isoterma.n_celulas, 0.8 * proton.ca0, isoterma.isExtracao)
            chutes_etrs = np.concatenate(
                [etr.chutes_iniciais(isoterma.rao, isoterma.n_celulas, 0.001 *
                                     etr.con, isoterma.isExtracao) for etr in lista_etrs]
            )
        chutes = np.concatenate((chutes_H, chutes_etrs))

        return chutes

    def junta_variaveis(isoterma, chutes: list):

        proton: Proton = isoterma.lista_elementos[0]
        chutes_H: list = chutes[0: isoterma.n_celulas]

        cas_H: list = proton.concentracoes_aquoso(chutes_H, isoterma.n_celulas)
        cas: list = [cas_H]

        for i in range(1, len(isoterma.lista_elementos)):
            etr: ETR = isoterma.lista_elementos[i]
            chutes_etr: list = chutes[i *
                                      isoterma.n_celulas: (i + 1) * isoterma.n_celulas]
            cas_etr: list = etr.concentracoes_aquoso(
                chutes_etr, isoterma.n_celulas)
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

        # equações de balanço de massa
            for cas_etrs in range(len(lista_cas_etrs)):
                cas_etr = lista_cas_etrs[cas_etrs]
                etr = isoterma.lista_elementos[cas_etrs + 1]
                bm_etr = celula.balanco_de_massa(
                    etr, cas_etr, cas_H, rao, n_celulas)
                equacoes.append(bm_etr)

        # equações de balanço de carga
            bc = celula.balanco_de_carga(cas_H, lista_cas_etrs, K)
            equacoes.append(bc)

        return equacoes

    def resolve_equacoes_massa_carga(isoterma) -> np.ndarray:

        all_elements_aqueous_concentrations: np.array = fsolve(
            isoterma.equacoes_massa_carga, isoterma.junta_chutes_iniciais())

        return all_elements_aqueous_concentrations

    def create_all_elements_extraction_data_dto(isoterma) -> dict[dict[Union[str, list]]]:

        all_elements_aqueous_concentrations: np.ndarray = isoterma.resolve_equacoes_massa_carga()

        all_elements_chart_extraction_data_dto: dict = {}
        table_extraction_data_dto: dict = {}
        extraction_data_dto: dict = {}
        element: Union[ETR, Proton]

        for index, element in enumerate(isoterma.lista_elementos):

            if index == 0:
                proton_concentrations: np.ndarray = all_elements_aqueous_concentrations[
                    index * isoterma.n_celulas: (index + 1) * isoterma.n_celulas]

                table_extraction_data_dto[element.simbolo] = {
                    element.simbolo: list(proton_concentrations),
                    'pH': list(element.pH(proton_concentrations))
                }

            else:

                single_element_D = list(map(element.D, proton_concentrations))

                single_element_aqueous_equilibrium_concentrations = list(
                    all_elements_aqueous_concentrations[index * isoterma.n_celulas: (index + 1) * isoterma.n_celulas])
                single_element_organic_equilibrium_concentrations = list(
                    map(element.concentracoes_organico, single_element_D, single_element_aqueous_equilibrium_concentrations))

                single_element_aqueous_operating_concentrations, single_element_organic_operating_concentrations = isoterma.create_operating_line(
                    element, single_element_aqueous_equilibrium_concentrations, single_element_organic_equilibrium_concentrations
                )
                single_element_aqueous_stage_concentrations, single_element_organic_stage_concentrations = isoterma.create_stage_concentrations(
                    single_element_aqueous_operating_concentrations, single_element_organic_operating_concentrations
                )

                if index >= 2:
                    previous_element: ETR = isoterma.lista_elementos[index - 1]
                    previous_element_D = np.array(
                        table_extraction_data_dto[previous_element.simbolo]['D'])

                    beta = np.array(list(single_element_D) /
                                    previous_element_D)

                all_elements_chart_extraction_data_dto[element.simbolo] = {
                    'name': element.nome,
                    'symbol': element.simbolo,
                    'aqueousEquilibriumConcentrations': single_element_aqueous_equilibrium_concentrations,
                    'organicEquilibriumConcentrations': single_element_organic_equilibrium_concentrations,
                    'aqueousOperatingConcentrations': single_element_aqueous_operating_concentrations,
                    'organicOperatingConcentrations': single_element_organic_operating_concentrations,
                    'aqueousStageConcentrations': single_element_aqueous_stage_concentrations,
                    'organicStageConcentrations': single_element_organic_stage_concentrations
                }

                table_extraction_data_dto[element.simbolo] = {
                    'name': element.nome,
                    'symbol': element.simbolo,
                    'aqueousEquilibriumConcentrations': single_element_aqueous_equilibrium_concentrations,
                    'organicEquilibriumConcentrations': single_element_organic_equilibrium_concentrations,
                    'D': single_element_D
                }

                if index >= 2:
                    table_extraction_data_dto[element.simbolo]['Beta' +
                                                               previous_element.simbolo + element.simbolo] = list(beta)

        extraction_data_dto = {
            'simulationTableDto': table_extraction_data_dto,
            'simulationChartDto': all_elements_chart_extraction_data_dto
        }

        return extraction_data_dto

    def create_operating_line(isoterma,
                              element: ETR,
                              aqueous_equilibrium_concentrations: list[float],
                              organic_equilibrium_concentrations: list[float]
                              ) -> list[float]:

        single_element_aqueous_operating_concentrations = [
            element.ca0] + aqueous_equilibrium_concentrations
        single_element_organic_operating_concentrations = organic_equilibrium_concentrations + \
            [element.con]

        return single_element_aqueous_operating_concentrations, single_element_organic_operating_concentrations

    def create_stage_concentrations(isoterma,
                                    aqueous_operating_concentrations: list[float],
                                    organic_operating_concentrations: list[float]
                                    ) -> list[float]:

        aqueous_stage_concentrations = [aqueous_operating_concentrations[0]]
        organic_stage_concentrations: list[float] = []

        for index in range(len(aqueous_operating_concentrations)):

            aqueous_stage_concentrations += 2 * \
                [aqueous_operating_concentrations[index]] if index != 0 else []
            organic_stage_concentrations += 2 * \
                [organic_operating_concentrations[index]] if index < len(
                    aqueous_operating_concentrations) - 1 else []

        organic_stage_concentrations += [organic_operating_concentrations[-1]]

        return aqueous_stage_concentrations, organic_stage_concentrations

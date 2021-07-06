import numpy as np
from sympy import *

tolerancia = 0.0001

nEstagios = 10

casDy = [3 - 2.7 * n/(nEstagios) for n in range(nEstagios + 1)]
casHo = [5 - 4.5 * n/(nEstagios) for n in range(nEstagios + 1)]
Hs = [0.8 - 0.1 * n/(nEstagios) for n in range(nEstagios + 1)]

k = casDy[0] + casHo[0] + Hs[0]
rao = 2
aDy = 3.22552
bDy = -0.99999

aHo = 3.05008
bHo = -0.68760


def geraF(listaParametros):
    ca1n0, ca1n1, ca1n2, ca2n1, ca2n2, a1, b1, rao, k = listaParametros
    if ca1n2 == 0 and ca2n2 == 0:
        return (
            ca1n1 * ((k/(3*ca1n1 + 3*ca2n1))**-a1 + 10**b1 + rao)
            - ca1n0 * rao
        )
    else:
        return (
            ca1n1 * ((k/(3*ca1n1 + 3*ca2n1))**-a1 + 10**b1 + rao)
            - ca1n2 * ((k/(3*ca1n2 + 3*ca2n2))**-a1 + 10**b1)
            - ca1n0 * rao
        )


def geraVetorFuncoes():

    vetorFuncoes = criaMatrizNula(2*nEstagios, 1)

    for n in range(1, nEstagios + 1):
        if n < nEstagios:
            vetorFuncoes[n - 1][0] = geraF([casDy[n - 1], casDy[n], casDy[n + 1], casHo[n], casHo[n + 1],
                                            aDy, bDy, rao, k])
            vetorFuncoes[nEstagios + n - 1][0] = geraF([casHo[n - 1], casHo[n], casHo[n + 1], casDy[n], casDy[n + 1],
                                                        aHo, bHo, rao, k])

        else:
            vetorFuncoes[n - 1][0] = geraF([casDy[n - 1],
                                           casDy[n], 0, casHo[n], 0, aDy, bDy, rao, k])
            vetorFuncoes[nEstagios + n - 1][0] = geraF([casHo[n - 1], casHo[n], 0, casDy[n], 0,
                                                        aHo, bHo, rao, k])

    return vetorFuncoes


def derivadaPontual(funcao, posicaoIncrementoX, listaArgumentos, incrementoX=0.0001):

    listaArgumentosIncrementada = listaArgumentos[:]
    listaArgumentosIncrementada[posicaoIncrementoX] += incrementoX
    dfdx = (funcao(listaArgumentosIncrementada) -
            funcao(listaArgumentos))/incrementoX

    return dfdx


def criaMatrizNula(nRows, nCols='não atribuído'):
    matrizNula = []

    if nCols == 'não atribuído':
        nCols = nRows

    for i in range(nRows):
        linha_i = []

        for j in range(nCols):
            termo_ij = 0
            linha_i.append(termo_ij)

        matrizNula.append(linha_i)

    return matrizNula


def criaMatrizIdentidade(n):
    matriz = criaMatrizNula(n)
    for i in range(n):
        matriz[i][i] = 1

    return matriz


def jacobiana():

    assert len(casDy) == len(casHo)

    matrizJacobiana = criaMatrizNula(2 * nEstagios)
    paramsDy = [aDy, bDy, rao, k]
    paramsHo = [aHo, bHo, rao, k]

    for n in range(1, nEstagios + 1):

        if n == 1:
            listaArgumentosDy = [casDy[n-1], casDy[n],
                                 casDy[n+1], casHo[n], casHo[n+1]] + paramsDy
            listaArgumentosHo = [casHo[n-1], casHo[n],
                                 casHo[n+1], casDy[n], casDy[n+1]] + paramsHo

            matrizJacobiana[n - 1][n -
                                   1] = derivadaPontual(geraF, 1, listaArgumentosDy)
            matrizJacobiana[n -
                            1][n] = derivadaPontual(geraF, 2, listaArgumentosDy)
            matrizJacobiana[n - 1][nEstagios + n -
                                   1] = derivadaPontual(geraF, 3, listaArgumentosDy)
            matrizJacobiana[n - 1][nEstagios +
                                   n] = derivadaPontual(geraF, 4, listaArgumentosDy)

            matrizJacobiana[nEstagios + n - 1][n -
                                               1] = derivadaPontual(geraF, 3, listaArgumentosHo)
            matrizJacobiana[nEstagios + n -
                            1][n] = derivadaPontual(geraF, 4, listaArgumentosHo)
            matrizJacobiana[nEstagios + n - 1][nEstagios + n -
                                               1] = derivadaPontual(geraF, 1, listaArgumentosHo)
            matrizJacobiana[nEstagios + n - 1][nEstagios +
                                               n] = derivadaPontual(geraF, 2, listaArgumentosHo)

        elif n == nEstagios:
            listaArgumentosDy = [casDy[n-1],
                                 casDy[n], 0, casHo[n], 0] + paramsDy
            listaArgumentosHo = [casHo[n-1],
                                 casHo[n], 0, casDy[n], 0] + paramsHo

            matrizJacobiana[n - 1][n -
                                   2] = derivadaPontual(geraF, 0, listaArgumentosDy)
            matrizJacobiana[n - 1][n -
                                   1] = derivadaPontual(geraF, 1, listaArgumentosDy)
            matrizJacobiana[n - 1][nEstagios + n -
                                   1] = derivadaPontual(geraF, 3, listaArgumentosDy)

            matrizJacobiana[nEstagios + n - 1][n -
                                               1] = derivadaPontual(geraF, 3, listaArgumentosHo)
            matrizJacobiana[nEstagios + n - 1][nEstagios + n -
                                               2] = derivadaPontual(geraF, 0, listaArgumentosHo)
            matrizJacobiana[nEstagios + n - 1][nEstagios + n -
                                               1] = derivadaPontual(geraF, 1, listaArgumentosHo)

        else:
            listaArgumentosDy = [casDy[n-1], casDy[n],
                                 casDy[n+1], casHo[n], casHo[n+1]] + paramsDy
            listaArgumentosHo = [casHo[n-1], casHo[n],
                                 casHo[n+1], casDy[n], casDy[n+1]] + paramsHo

            matrizJacobiana[n - 1][n -
                                   2] = derivadaPontual(geraF, 0, listaArgumentosDy)
            matrizJacobiana[n - 1][n -
                                   1] = derivadaPontual(geraF, 1, listaArgumentosDy)
            matrizJacobiana[n -
                            1][n] = derivadaPontual(geraF, 2, listaArgumentosDy)
            matrizJacobiana[n - 1][nEstagios + n -
                                   1] = derivadaPontual(geraF, 3, listaArgumentosDy)
            matrizJacobiana[n - 1][nEstagios +
                                   n] = derivadaPontual(geraF, 4, listaArgumentosDy)

            matrizJacobiana[nEstagios + n - 1][n -
                                               1] = derivadaPontual(geraF, 3, listaArgumentosHo)
            matrizJacobiana[nEstagios + n -
                            1][n] = derivadaPontual(geraF, 4, listaArgumentosHo)
            matrizJacobiana[nEstagios + n - 1][nEstagios + n -
                                               2] = derivadaPontual(geraF, 0, listaArgumentosHo)
            matrizJacobiana[nEstagios + n - 1][nEstagios + n -
                                               1] = derivadaPontual(geraF, 1, listaArgumentosHo)
            matrizJacobiana[nEstagios + n - 1][nEstagios +
                                               n] = derivadaPontual(geraF, 2, listaArgumentosHo)

    return matrizJacobiana


# 'lj' é a linha a ser modificada, 'li' a modificadora e 'i' é o elemento a ser zerado
def muda_linha(li, lj, razaoPivotamento):

    li_modificador = []

    for elemento in li:
        elemento = elemento * razaoPivotamento
        li_modificador.append(elemento)

    for i in range(len(lj)):
        lj[i] = lj[i] - li_modificador[i]

    return lj


def escalonaInferior(matrizOriginal, matrizInversa):
    # ela vai escalonar a matriz até zerar a diagonal de baixo

    for n in range(len(matrizOriginal)):  # vai passar p/ próximo pivô
        l = 1
        # vai zerar todos os termos de uma coluna que estão abaixo da diagonal
        while (l + n) < (len(matrizOriginal)):
            razaoPivotamento = matrizOriginal[n + l][n] / matrizOriginal[n][n]
            matrizOriginal[n + l] = muda_linha(matrizOriginal[n],
                                               matrizOriginal[n + l], razaoPivotamento)
            matrizInversa[n + l] = muda_linha(matrizInversa[n],
                                              matrizInversa[n + l], razaoPivotamento)
            l += 1

    return matrizOriginal, matrizInversa


def escalonaSuperior(matrizOriginal, matrizInversa):
    # ela vai escalonar a diagonal de cima, partindo da diagonal de baixo zerada

    for n in range(len(matrizOriginal) - 1, -1, -1):
        l = 1
        while l <= n:  # vai passar p/ pivô anterior
            razaoPivotamento = matrizOriginal[n - l][n] / matrizOriginal[n][n]
            matrizOriginal[n - l] = muda_linha(matrizOriginal[n],
                                               matrizOriginal[n - l], razaoPivotamento)
            matrizInversa[n - l] = muda_linha(matrizInversa[n],
                                              matrizInversa[n - l], razaoPivotamento)
            l += 1

    return matrizOriginal, matrizInversa


def transformaEscalonadaEmIdentidade(matrizOriginal, matrizInversa):

    for i in range(len(matrizInversa)):
        for j in range(len(matrizInversa)):
            matrizInversa[i][j] = matrizInversa[i][j]/matrizOriginal[i][i]

    return matrizOriginal, matrizInversa


def inverteMatriz(matrizOriginal):

    matrizInversa = criaMatrizIdentidade(len(matrizOriginal))
    matrizOriginalTriangularSuperior, matrizInversaTriangularSuperior = escalonaInferior(
        matrizOriginal, matrizInversa)
    matrizOriginalEscalonada, matrizInversaEscalonada = escalonaSuperior(matrizOriginalTriangularSuperior,
                                                                         matrizInversaTriangularSuperior)
    matrizIdentidade, matrizOriginalInvertida = transformaEscalonadaEmIdentidade(matrizOriginalEscalonada,
                                                                                 matrizInversaEscalonada)
    return matrizOriginalInvertida


def multiplicacaoMatrizes(matrizA, matrizB):
    # A X B = C
    assert len(matrizA[0]) == len(matrizB)

    matrizC = criaMatrizNula(len(matrizA), len(matrizB[0]))

    for i in range(len(matrizA)):
        for j in range(len(matrizB[0])):
            for n in range(len(matrizB)):
                matrizC[i][j] += matrizA[i][n] * matrizB[n][j]

    return matrizC


def updateVetores(vetorNovo):

    for i in range(int(len(vetorNovo)/2)):
        casDy[i + 1] -= vetorNovo[i][0]
        casHo[i + 1] -= vetorNovo[i + nEstagios][0]

    return casDy, casHo


def verificaConvergencia(vetor, tolerancia):

    for i in range(len(vetor)):
        if vetor[i][0] > tolerancia:
            return False

    return True


def newtonRaphsonSistema():

    convergencia = False
    n = 0

    while not convergencia or n > 100:

        matrizJacobiana = jacobiana()
        jacobianaInversa = inverteMatriz(matrizJacobiana)
        vetorFuncoes = geraVetorFuncoes()
        vetorNovo = multiplicacaoMatrizes(jacobianaInversa, vetorFuncoes)
        casDy, casHo = updateVetores(vetorNovo)
        print(casDy, casHo)
        convergencia = verificaConvergencia(vetorNovo, tolerancia)
        if convergencia:
            return casDy, casHo
        n += 1

    return 'não convergiu em ' + str(n) + ' iterações.'


def displayMatriz(matriz):
    for i in range(len(matriz)):
        for j in range(len(matriz)):
            matriz[i][j] = round(matriz[i][j], 1)
    return Matrix(matriz)

# <span style='color:yellow'> Projeto Final </span>
---
---
## <span style='color:yellow'> Um Modelo Não-Linear para a Otimização de um Processo de Separação de Elementos de Terras-Raras (ETR) </span>
---

O problema central de um modelo para um processo de extração é conseguir prever razoavelmente a [razão de distribuição (D)](https://pt.wikipedia.org/wiki/Coeficiente_de_parti%C3%A7%C3%A3o) das espécies a serem separadas. Quando um produto comercial só possui valor com purezas altíssimas, digamos 99%, ou 99.9% (até mesmo 99.999% para algumas aplicações), uma mínima incongruência do modelo com a realidade pode gerar uma mínima diferença entre a meta de pureza e o resultado obtido suficiente para acabar com o valor do produto.

Ao longo do curso, muito se falou sobre etapas no processo de extração e separação, principalmente no contexto dos elementos de terras-raras. Ao longo do curso, apresentou-se modelos lineares (Semana 6 - Problemas 1, 2 e 3) e não-lineares (Semana 2 - Problema 2).

A classe de modelos lineares é muito conveniente de se utilizar, porque resolver um grande conjunto de equações lineares é uma tarefa relativamente simples (como vimos nas Semanas 6 e 7). Entretanto, eles caem por terra para quase todas as aplicações, sobretudo porque as condições que preveem uma razão de distribuição constante (premissa do modelo linear), não se mantém para quase todos os processos.

O modelo não-linear apresentado na Semana 2 sofre do problema de demandar uma bateria muito grande de experimentos, e uma incerteza associada muito grande, ambos porque ele trabalha com três variáveis (pH, concentração dos cátions $ETR^{3+}$ e concentração de extratante livre), passíveis de alterar a razão de distribuição das espécies.

Para alguns casos, entretanto, um modelo não-linear, porém mais simples, pode ser desenhado, que conta com uma robustez maior que o modelo linear, mas é simples o suficiente para não demandar uma carga de experimentos muito grande. Em meios bem ácidos (pH < 2), com uma concentração de ETRs na fase aquosa bem inferior à saturação e uma alta concentração de extratante na fase orgânica, um modelo de D função apenas do pH (ou melhor, de $[H^{+}]$) pode ser elaborado com uma capacidade de predição relativamente alta ($R^2 \approx 0.95 \sim 0.99$).

Um modelo deste tipo foi criado para a separação de dois elementos de terras-raras: disprósio (Dy) e hólmio (Ho). O disprósio é um elemento de altíssimo valor agregado e a sua obtenção puro, no nosso país, ainda é um desafio e é incentivado por programas de financiamento federal para produção de ímãs especiais, com aplicações em motores elétricos de carros e turbinas eólicas, por exemplo.

No processo, hólmio é um elemento com maior afinidade pelo extratante orgânico, de forma que o disprósio deverá sair puro pelo rafinado, e o hólmio carregado pela fase orgânica.

Para cada estágio (ou célula) de extração, temos duas equações e duas variáveis. Entretanto, pelos balanços de massa, as equações de um estágio são interdependentes com as do próximo e do anterior. Dessa forma, um sistema com 10 estágios possui 20 equações e 20 variáveis (as concentrações de Dy e Ho em cada célula).

A dedução completa das equações, abaixo, obtidas a partir do modelo, pode ser conferida $\huge {\red {aqui}}$.

<span style='font-size: 1.2em; color:rgb(101, 227, 243)'>
Para qualquer estágio que não seja o último:
</span>

$$
\large
\begin{cases}
Dy_n  \Bigg(\bigg({K \over 3 (Dy_n + Ho_n)} \bigg)^{-a_{Dy}} \cdot 10^{b_{Dy}} + R \Bigg) - Dy_{n+1}  \Bigg(\bigg({K \over 3 (Dy_{n+1} + Ho_{n+1})} \bigg)^{-a_{Dy}} \cdot 10^{b_{Dy}} \Bigg) - Dy_{n-1} \cdot R = 0 \\[4ex]
Ho_n  \Bigg(\bigg({K \over 3 (Dy_n + Ho_n)} \bigg)^{-a_{Ho}} \cdot 10^{b_{Ho}} + R \Bigg) - Ho_{n+1}  \Bigg(\bigg({K \over 3 (Dy_{n+1} + Ho_{n+1})} \bigg)^{-a_{Ho}} \cdot 10^{b_{Ho}} \Bigg) - Ho_{n-1} \cdot R = 0 \\
\end{cases}
$$
<span style='font-size: 1.2em; color:rgb(101, 227, 243)'>
Para o último estágio:
</span>

$$
\large
\begin{cases}
Dy_n  \Bigg(\bigg({K \over 3 (Dy_n + Ho_n)} \bigg)^{-a_{Dy}} \cdot 10^{b_{Dy}} + R \Bigg) - Dy_{n-1} \cdot R = 0 \\[4ex]
Ho_n  \Bigg(\bigg({K \over 3 (Dy_n + Ho_n)} \bigg)^{-a_{Ho}} \cdot 10^{b_{Ho}} + R \Bigg) - Ho_{n-1} \cdot R = 0 \\
\end{cases}
$$

- $Dy$ e $Ho$ são as respectivas concentrações dos cátions $[Etr^{3+}]$. Opte por trabalhar na unidade de mol/L, para o cálculo da constante de cargas, mais abaixo.
- $n$ é o subscrito para o estágio atual. $n+1$ o estágio da frente e $n-1$ o estágio de trás. Para o primeiro estágio, haverá um $n_0$, que será a corrente de alimentação.
- $a$ e $b$ são parâmetros empíricos obtidos dos modelos.
- K é o número total de cargas (positivas ou negativas), que, pelo balanço de carga, será o mesmo para qualquer estágio, pois a fase orgânica é neutra.

$$ K = [H^+] + 3[Dy^{3+}] + 3[Ho^{3+}]$$

Lembrando que: $pH = -log[H^+]$ e $[H^+] = 10^{-pH}$.

---
---
## <span style='color:yellow'> Resolvendo um Sistema de Equações Não-Lineares </span>

---

### <span style='color:yellow'> Teoria </span>

Para obter as raízes de um sistema de equações não lineares, o método Newton-Raphson pode ser usado. Da mesma forma que o usamos na Semana 3 para encontrar as raízes de uma equação, o usaremos agora para encontrar as raízes de um sistema delas.

A dificuldade extra desse problema vem do fato de as equações serem interdependentes, o que requer alguns passos extras.

Considere o sistema de equações não-lineares:

$$
\large
\begin{cases}
f_3(x_1, x_2, x_3,  \dots, x_n) = 0 \\
f_2(x_1, x_2, x_3,  \dots, x_n) = 0 \\
f_1(x_1, x_2, x_3,  \dots, x_n) = 0 \\
\vdots \\
f_n(x_1, x_2, x_3,  \dots, x_n) = 0 \\
\end{cases}
$$

Para esse sistema, temos que:

$\underline{f}(\underline{x}) = \underline{0}$ , onde:

Onde a barra embaixo indica um vetor coluna.

Tendo um vetor de x's ($\underline{x}$), como chute inicial, da mesma forma que se havia um ponto x como chute inicial, quando lidávamos com apenas uma função, podemos obter o próximo conjunto de pontos em $\underline{x}$ calculando as funções e suas respectivas derivadas.

Se você notar, o próximo chute é apenas traçar uma reta, com a inclinação igual à derivada da função, até o próximo ponto em que $f(x) = 0$.

Isso é essencialmente, extrapolar o comportamento em $f(x^{(0)})$ para $f(x^{(1)})$, truncando a função no primeiro termo da série de Taylor, que vimos na semana 6. Como essa aproximação geralmente não é boa, $x^{(1)}$ costuma não se suficiente, sendo necessário repetir o processo, para com $x^{(1)}$ gerar $x^{(2)}$ e assim por diante.  

*O número sobrescrito faz referência ao número da iteração.*

Se para uma função com uma raíz tínhamos que:

$$ \large
x^{(n+1)} = x^{(n)} - { f( x^{ (n) } ) \over f'( x^{ (n) } ) }$$

Agora temos que:

$$\large \underline{x}^{(n+1)} = \underline{x}^{(n)} - (\underline{\underline{J}}^{(n)})^{-1} \cdot \underline{f}(\underline{x}^{(n)})$$ (1)

$$\large (\underline{\underline{J}}^{(n)})^{-1} \cdot \underline{f}(\underline{x}^{(n)}) = \Delta \underline{x}^{(n)} $$ (2)

- Onde J é a matriz Jacobiana do sistema.
- O sobrescrito $-1$ indica que é a matriz inversa.
- O sobrescrito $n$ indica a n-ésima iteração.
- O duplo traço embaixo da matriz é uma notação comum para indicar uma matriz (bidimensional, em distinção ao vetor, com apenas um traço, que é unidimensional).
- Jogando $\underline{x}^{(n)}$ em (1) para a esquerda, (2) é obviamente verificável.

A matriz Jacobiana de um sistema de equações, conforme o exposto acima, será dado por:

$$
\Large
J =
\begin{bmatrix}
  \frac{\partial f_1}{\partial x_1} &
    \frac{\partial f_1}{\partial x_2} &
    \frac{\partial f_1}{\partial x_3} &
    \dots &
    \frac{\partial f_1}{\partial x_n}
    \\[1ex]
  \frac{\partial f_2}{\partial x_1} &
    \frac{\partial f_2}{\partial x_2} &
    \frac{\partial f_2}{\partial x_3} &
    \dots &
    \frac{\partial f_2}{\partial x_n}
    \\[1ex]
  \frac{\partial f_3}{\partial x_1} &
    \frac{\partial f_3}{\partial x_2} &
    \frac{\partial f_3}{\partial x_3} &
    \dots &
    \frac{\partial f_3}{\partial x_n} \\[1ex]
  \vdots & \vdots & \vdots & \ddots & \\
  \frac{\partial f_n}{\partial x_1} &
    \frac{\partial f_n}{\partial x_2} &
    \frac{\partial f_n}{\partial x_3} &
    \dots &
    \frac{\partial f_n}{\partial x_n} \\[1ex]
\end{bmatrix}
$$

Nesse algoritmo, a atualização de um determinado x em $\underline{x}$ é dado não só pelo comportamento dele em particular com uma função, mas o comportamento de todo o $\underline{x}$ em relação a todo o $\underline{f}(\underline{x})$. O algoritmo termina quando $\Delta \underline{x}^{(n)} \rightarrow t$ , onde $t$ é a tolerância do método, que indica o quão pequeno um erro deve ser, para que em termos práticos o resultado tenha sido o mesmo que encontrar as raízes ($\underline{f}(\underline{x}) \rightarrow \underline{0}$).

Quando isso acontece, significa que houve uma convergência. O algoritmo é enviesado, porque ele irá achar a raíz mais próxima, não a que você quer ou todas elas.

---
### <span style='color:yellow'> Construindo um algoritmo para a resolução do sistema </span>

*Esta é uma sugestão de construção, lembrando que existem inúmeras soluções para um mesmo problemas, que podem ser, inclusive, melhores do que aquela aqui apresentada.*

1. <span style='font-size: 1.2em; color:rgb(101, 227, 243)'> Criar o vetor **coluna** com os chutes iniciais de $x$ ($\underline{x}$).</span>

2. <span style='font-size: 1.2em; color:rgb(101, 227, 243)'> Construir um montador de equações.</span>
   1. A ideia desse montador é gerar equações $f(\underline{x}) = \underline{0}$.  
   *O lado direito da equação será omitido no método. Tudo deve ser passado para o lado esquerdo.*

3. <span style='font-size: 1.2em; color:rgb(101, 227, 243)'> Construir um montador de vetores **coluna** de $f$.</span>
   1. A ideia desse montador de vetores é chamar o montador de equações tantas vezes quanto houver estágios, para gerar o vetor de funções $\underline{f}(\underline{x})$.

4. <span style='font-size: 1.2em; color:rgb(101, 227, 243)'> Construir a matriz Jacobiana.</span>
   1. Criar uma função que gera uma matriz quadrada *template*, que só possui zeros, que será do mesmo tamanho que a matriz Jacobiana final.

   2. Construir uma função que recebe $f_n(x_j)$ e retorna $\large {\partial f_n \over \partial x_j}$.  
   *$i$ e $j$ são valores inteiros genéricos entre 1 e $n$, da matriz Jacobiana mostrada*.

   3. Atualizar a matriz de zeros com os valores de $\large {\partial f_n \over \partial x_j}$ obtidos.  
   *É muito importante que você escreva sua matriz Jacobiana de forma que todas as linhas possuam um [pivô](https://en.wikipedia.org/wiki/Pivot_element). Para o nosso caso, isso significa dizer que $\large {\partial f_n \over \partial x_n} \neq 0$. Do contrário, a eliminação Gaussiana (ver adiante) não irá funcionar.*

5. <span style='font-size: 1.2em; color:rgb(101, 227, 243)'> Construir a [matriz inversa](https://www.purplemath.com/modules/mtrxinvr.htm) da Jacobiana.</span>
   1. Use a função que cria uma matriz template de zeros para criar uma matriz identidade com o mesmo tamanho da matriz Jacobiana.
   2. Construir um algoritmo de [Eliminação Gaussiana](https://pt.wikipedia.org/wiki/Elimina%C3%A7%C3%A3o_de_Gauss).
      1. Criar uma função que zera os elementos da coluna do pivô.  
      *Seja $L_n$ o pivô da linha i ($l_n$). Seja $L_j$ um elemento da linha j ($l_j$)na mesma coluna de $L_n$. Nós podemos zerar $L_j$, atualizando a $l_j$ com o resultado da seguinte operação:*  
      $$\large l_j = l_j - l_n \cdot {L_j \over L_n}$$
      2. Criar uma função que utiliza 5.2.1 para zerar a diagonal de inferior da matriz.
      3. Criar uma função que recebe o resultado de 5.2.2 e utiliza 5.2.1 para zerar a diagonal superior.  
      4. Agora que só existem elementos na diagonal, a matriz inversa será finalmente obtida no lado direito dividindo cada linha por si mesmo, de forma a obter a matriz identidade do lado esquerdo.  
      *Toda operação que você fizer na matriz Jacobiana em 5.2.1, ao longo de 5.2.2 e 5.2.3, a matriz identidade criada em 5.1.1 deverá seguir, um espelhamento. Igualmente, as divisões em 5.2.4 deverão ser aplicadas na matriz do lado direito.*  

              A matriz deverá entrar assim em 5.2.2:

      $$
      \large
      M =
      \begin{bmatrix}
      a_{11} & a_{12} & a_{13} & a_{14} & | & 1 & 0 & 0 & 0 \\
      a_{21} & a_{22} & a_{23} & a_{24} & | & 0 & 1 & 0 & 0 \\
      a_{31} & a_{32} & a_{33} & a_{34} & | & 0 & 0 & 1 & 0 \\
      a_{41} & a_{42} & a_{43} & a_{44} & | & 0 & 0 & 0 & 1 \\
      \end{bmatrix}
      $$

          A matriz deverá sair assim de 5.2.2, e entrar da mesma forma em 5.2.3:

      $$
      \large
      M =
      \begin{bmatrix}
      a_{11} & a_{12} & a_{13} & a_{14} & | & 1 & 0 & 0 & 0 \\
      0 & b_{22} & b_{23} & b_{24} & | & z_{21} & 1 & 0 & 0 \\
      0 & 0 & b_{33} & b_{34} & | & z_{31} & z_{32} & 1 & 0 \\
      0 & 0 & 0 & b_{44} & | & z_{41} & z_{42} & z_{43} & 1 \\
      \end{bmatrix}
      $$  

          A matriz deverá sair assim de 5.2.3, e entrar da mesma forma em 5.2.4:

      $$
      \large
      M =
      \begin{bmatrix}
      a_{11} & 0 & 0 & 0 & | & z_{11} & z_{12} & z_{13} & z_{14} \\
      0 & b_{22} & 0 & 0 & | & z_{21} & z_{22} & z_{23} & z_{24} \\
      0 & 0 & b_{33} & 0 & | & z_{31} & z_{32} & z_{33} & z_{34} \\
      0 & 0 & 0 & b_{44} & | & z_{41} & z_{42} & z_{43} & 1 \\
      \end{bmatrix}
      $$

          A matriz deverá sair de 5.2.4 assim:

      $$
      \large
      M =
      \begin{bmatrix}
      1 & 0 & 0 & 0 & | & {z_{11} \over a_{11}} & {z_{12} \over a_{11}} & {z_{13} \over a_{11}} & {z_{14} \over a_{11}} \\[1ex]
      0 & 1 & 0 & 0 & | & {z_{21} \over b_{22}} & {z_{22} \over b_{22}} & {z_{23} \over b_{22}} & {z_{24} \over b_{22}} \\[1ex]
      0 & 0 &  1 & 0 & | & {z_{31} \over b_{33}} & {z_{32} \over b_{33}} & {z_{33} \over b_{33}} & {z_{34} \over b_{33}} \\[1ex]
      0 & 0 & 0 & 1 & | & {z_{41} \over b_{44}} & {z_{42} \over b_{44}} & {z_{43} \over b_{44}} & {1 \over b_{44} } \\[1ex]
      \end{bmatrix}
      $$

      *As novas letras apenas denotam uma mudança de valor.*

6. <span style='font-size: 1.2em; color:rgb(101, 227, 243)'> Criar uma função que faz a [multiplicação das matrizes](https://en.wikipedia.org/wiki/Matrix_multiplication):</span>
$$\large (\underline{\underline{J}}^{(n)})^{-1} \cdot \underline{f}(\underline{x}^{(n)})$$

7. <span style='font-size: 1.2em; color:rgb(101, 227, 243)'> Construir a função principal (Newton-Raphson):</span>
   1. Criar as funções suporte:
      1. Criar uma função que analisa a convergência.
      *Ela irá analisar o vetor produzido por $(\underline{\underline{J}}^{(n)})^{-1} \cdot \underline{f}(\underline{x}^{(n)})$ e verificar se todos os elementos do vetor são menores do que zero.*
      1. Criar uma função que atualiza $\underline{x}^{(n)}$ com $\Delta \underline{x}^{(n)}$, para gerar $\underline{x}^{(n+1)}$.
   2. Enquanto não houver convergência dos valores ela deverá:
      1. Gerar o vetor $\underline{x}^{(n)}$
      2. Gerar o vetor $\underline{f}(\underline{x}^{(n)})$
      3. Gerar a matriz jacobiana
      4. Inverter a matriz
      5. Gerar $\Delta \underline{x}^{(n)} = (\underline{\underline{J}}^{(n)})^{-1} \cdot \underline{f}(\underline{x}^{(n)})$
      6. Decidir se houve convergência.
      7. Atualizar os valores de $\underline{x} \rightarrow \underline{x}^{(n+1)} = \underline{x}^{(n)} + \Delta \underline{x}^{(n)}$

---

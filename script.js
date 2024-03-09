const perguntas = [ //Declara uma matriz de objetos contendo perguntas, opções de respostas e as respostas corretas associadas.
  {
    pergunta: "Qual é a forma correta de declarar uma variável em JavaScript?",
    respostas: [
      "var myVar;", //tem valor 0
      "let myVar;", //tem valor 1
      "const myVar;" //tem valor 2
    ],
    correta: 2
  },
  {
    pergunta: "Como se escreve um comentário de uma única linha em JavaScript?",
    respostas: [
      "// Este é um comentário",
      "# Este é um comentário",
      "/* Este é um comentário */"
    ],
    correta: 0
  },
  {
    pergunta: "O que o operador '===' verifica em JavaScript?",
    respostas: [
      "Igualdade de valor e tipo",
      "Igualdade de valor apenas",
      "Igualdade de tipo apenas"
    ],
    correta: 0
  },
  {
    pergunta: "Qual é a finalidade do comando 'console.log()' em JavaScript?",
    respostas: [
      "Exibir uma mensagem de erro",
      "Imprimir dados no console",
      "Criar uma variável"
    ],
    correta: 1
  },
  {
    pergunta: "Qual é a função do método 'addEventListener' em JavaScript?",
    respostas: [
      "Criar uma nova variável",
      "Adicionar um elemento HTML",
      "Adicionar um ouvinte de eventos"
    ],
    correta: 2
  },
  {
    pergunta: "O que é um array em JavaScript?",
    respostas: [
      "Um tipo de dado para armazenar um único valor",
      "Uma coleção ordenada de valores",
      "Um operador matemático"
    ],
    correta: 1
  },
  {
    pergunta: "O que é o DOM em JavaScript?",
    respostas: [
      "Um modelo de design para páginas da web",
      "Uma linguagem de programação",
      "Uma representação da estrutura da página web"
    ],
    correta: 2
  },
  {
    pergunta: "Qual é a função do método 'querySelector'?",
    respostas: [
      "Selecionar um elemento HTML pelo ID",
      "Selecionar vários elementos HTML",
      "Selecionar um elemento HTML pelo nome da tag"
    ],
    correta: 0
  },
  {
    pergunta: "O que significa o acrônimo 'JSON' em JavaScript?",
    respostas: [
      "JavaScript Object Notation",
      "JavaScript Online Network",
      "JavaScript Oriented Namespace"
    ],
    correta: 0
  },
  {
    pergunta: "Como você converte uma string para um número em JavaScript?",
    respostas: [
      "parseInt()",
      "toString()",
      "toUpperCase()"
    ],
    correta: 0
  },
  {
    pergunta: "O que é uma função em JavaScript?",
    respostas: [
      "Um tipo de dado",
      "Um bloco de código reutilizável",
      "Uma variável global"
    ],
    correta: 1
  },
  {
    pergunta: "Qual é a diferença entre 'let' e 'const' na declaração de variáveis?",
    respostas: [
      "Nenhuma, são sinônimos",
      "let é usado para valores constantes, const para variáveis",
      "let permite reatribuição, const cria variáveis imutáveis"
    ],
    correta: 2
  },
  {
    pergunta: "Qual é a diferença entre 'null' e 'undefined' em JavaScript?",
    respostas: [
      "São iguais, usados de forma intercambiável",
      "'null' representa a ausência de valor, 'undefined' é atribuído explicitamente",
      "Ambos representam valores vazios"
    ],
    correta: 1
  },
  {
    pergunta: "Como se adiciona um evento a um elemento HTML usando JavaScript?",
    respostas: [
      "Apenas com CSS",
      "Usando o atributo 'event'",
      "Através do método 'addEventListener'"
    ],
    correta: 2
  },
  {
    pergunta: "Como se realiza uma iteração sobre os elementos de um array em JavaScript?",
    respostas: [
      "Usando a estrutura 'if-else'",
      "Com a declaração 'switch'",
      "Utilizando loops como 'for' ou 'forEach'"
    ],
    correta: 2
  }
];

const quiz = document.querySelector('#quiz') //Seleciona o elemento com o ID "quiz" e armazena na variável quiz.
const template = document.querySelector('template') //Seleciona o elemento <template> e armazena na variável template.

const corretas = new Set() //Cria um conjunto para armazenar as perguntas corretas.
const totalDePerguntas = perguntas.length //Calcula o número total de perguntas.
const mostrarTotal = document.querySelector('#acertos span') //Seleciona o elemento <span> dentro do elemento com o ID "acertos" e armazena na variável mostrarTotal.
mostrarTotal.textContent = corretas.size + ' de ' + totalDePerguntas //atualiza o conteúdo do elemento identificado por mostrarTotal para exibir o número de respostas corretas seguido por " de " e o total de perguntas, indicando quantas perguntas foram respondidas corretamente em relação ao número total de perguntas no quiz. 

for (const item of perguntas) {
  //Inicia um loop for...of para iterar sobre cada objeto na matriz perguntas.
  const quizItem = template.content.cloneNode(true) //Clona o conteúdo do elemento <template> (definido anteriormente) para criar uma cópia do modelo. Essa cópia será preenchida dinamicamente com os detalhes de cada pergunta.
  quizItem.querySelector('h3').textContent = item.pergunta //Define o texto do elemento <h3> dentro da cópia do modelo com a pergunta atual.

  for (let resposta of item.respostas) {
    //Inicia outro loop for...of para iterar sobre as opções de resposta para a pergunta atual.
    const dt = quizItem.querySelector('dl dt').cloneNode(true)
    //Clona o primeiro elemento <dt> (termo da lista de definição) do modelo. Este elemento será usado para representar cada opção de resposta.
    dt.querySelector('span').textContent = resposta
    //Define o texto da opção de resposta atual no elemento <span> dentro do elemento clonado.
    dt.querySelector('input').setAttribute('name', 'pergunta-' + perguntas.indexOf(item))
    //Define o atributo name do botão de opção para garantir que apenas uma opção seja selecionada por pergunta.
    dt.querySelector('input').value = item.respostas.indexOf(resposta)
    //Define o valor associado a essa opção de resposta com base na posição da resposta na matriz.
    
    //Associa uma função ao evento onchange do botão de opção. Essa função verifica se a resposta do usuário está correta e atualiza o conjunto corretas e o elemento HTML mostrarTotal conforme necessário.
    dt.querySelector('input').onchange = (event) => {
      const estaCorreta = event.target.value == item.correta

      corretas.delete(item)
      if (estaCorreta) {
        corretas.add(item)
      }

      mostrarTotal.textContent = corretas.size + ' de ' + totalDePerguntas
    }

    //Adiciona o elemento clonado (representando a opção de resposta) à lista de definição (<dl>) na cópia do modelo.
    quizItem.querySelector('dl').appendChild(dt)
  }

  //Remove o primeiro elemento <dt> (termo da lista de definição) da cópia do modelo. Isso elimina o primeiro bloco de opções de resposta, uma vez que este é usado apenas como modelo.
  quizItem.querySelector('dl dt').remove()

  // Adiciona a cópia do modelo (representando uma pergunta e suas opções de resposta) ao elemento com o ID "quiz" no documento HTML.
  quiz.appendChild(quizItem)
}
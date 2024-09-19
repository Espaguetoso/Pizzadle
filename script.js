// script.js

const amigos = [
  {
    nome: "JP",
    altura: 1.78,
    peso: 86,
    drogas: ["Maconha", "Álcool", "Nicotina"],
    estadoCivil: "Casado",
    time: "Corinthians",
    orientacaoSexual: "Heterossexual",
    tamanhoRola: 17
  },
  {
    nome: "Cabeça",
    altura: 1.81,
    peso: 80,
    drogas: ["Maconha", "Álcool", "Nicotina"],
    estadoCivil: "Casado",
    time: "Inter",
    orientacaoSexual: "Heterossexual",
    tamanhoRola: 24
  },
  {
    nome: "Delvio",
    altura: 1.77,
    peso: 66,
    drogas: ["Maconha", "Álcool", "Nicotina", "MD"],
    estadoCivil: "Solteiro",
    time: "Inter",
    orientacaoSexual: "Homossexual",
    tamanhoRola: 15
  },
  {
    nome: "Gat",
    altura: 1.77,
    peso: 88,
    drogas: ["Álcool"],
    estadoCivil: "Casado",
    time: "Fluminense",
    orientacaoSexual: "Meio bixa",
    tamanhoRola: 16
  },
  {
    nome: "Enzo",
    altura: 1.85,
    peso: 40,
    drogas: ["Álcool", "Maconha", "Nicotina", "MD", "Bala", "Loló"],
    estadoCivil: "Solteiro",
    time: "Santos",
    orientacaoSexual: "Meio bixa",
    tamanhoRola: 19
  },
  {
    nome: "Vina",
    altura: 1.85,
    peso: 88,
    drogas: ["Álcool", "Maconha", "Nicotina", "MD", "Bala", "Loló"],
    estadoCivil: "Solteiro",
    time: "Corinthians",
    orientacaoSexual: "Meio bixa",
    tamanhoRola: 12
  },
  {
    nome: "Marcola",
    altura: 1.83,
    peso: 84,
    drogas: ["Álcool", "Maconha", "Nicotina", "MD", "Bala", "Loló", "Cogumelo"],
    estadoCivil: "Solteiro",
    time: "Inter",
    orientacaoSexual: "Heterossexual",
    tamanhoRola: 16.5
  },
  {
    nome: "Greg",
    altura: 1.77,
    peso: 80,
    drogas: ["Álcool", "Nicotina", "Maconha"],
    estadoCivil: "Solteiro",
    time: "Vasco",
    orientacaoSexual: "Heterossexual",
    tamanhoRola: 15
  }
];

let amigoSecreto = amigos[Math.floor(Math.random() * amigos.length)];
let tentativas = 3;

function fazerChute() {
  if (tentativas <= 0) {
    alert('Você esgotou todas as tentativas!');
    return;
  }

  const nomeChute = document.getElementById('chute').value.trim();
  const amigoChute = amigos.find(amigo => amigo.nome.toLowerCase() === nomeChute.toLowerCase());

  if (!amigoChute) {
    alert('Amigo não encontrado. Tente novamente.');
    document.getElementById('chute').value = '';
    return;
  }

  tentativas--;
  atualizarTentativas();

  exibirFeedback(amigoChute);

  document.getElementById('chute').value = '';
}

function exibirFeedback(chute) {
  const tabela = document.getElementById('feedbackTable');
  const mensagemFinal = document.getElementById('mensagemFinal');

  tabela.innerHTML = ''; // Limpa o feedback anterior
  mensagemFinal.textContent = ''; // Limpa a mensagem anterior

  // Adiciona o nome do amigo chutado no topo da tabela
  const headerRow = tabela.insertRow();
  const headerCell = headerRow.insertCell(0);
  headerCell.colSpan = 3;
  headerCell.innerHTML = `<strong>Amigo chutado: ${chute.nome}</strong>`;
  headerCell.style.backgroundColor = '#ddd';

  // Verifica se o jogador acertou o amigo
  const acertou = chute.nome === amigoSecreto.nome;

  // Função auxiliar para criar linhas da tabela
  function criarLinha(campo, valorChute, feedback) {
    const row = tabela.insertRow();
    const cellCampo = row.insertCell(0);
    const cellValor = row.insertCell(1);
    const cellFeedback = row.insertCell(2);

    cellCampo.textContent = campo;
    cellValor.textContent = valorChute;
    cellFeedback.innerHTML = feedback;
  }

  // Função para obter o feedback
  function obterFeedback(condicao, valorCorreto, valorChute) {
    if (acertou) {
      return '<span class="correct">Correto</span>';
    } else if (condicao) {
      return '<span class="correct">Correto</span>';
    } else if (valorChute > valorCorreto) {
      return '<span class="arrow">↓</span>';
    } else {
      return '<span class="arrow">↑</span>';
    }
  }

  // Comparação de Altura
  let feedbackAltura = obterFeedback(chute.altura === amigoSecreto.altura, amigoSecreto.altura, chute.altura);
  criarLinha('Altura', chute.altura + ' m', feedbackAltura);

  // Comparação de Peso
  let feedbackPeso = obterFeedback(chute.peso === amigoSecreto.peso, amigoSecreto.peso, chute.peso);
  criarLinha('Peso', chute.peso + ' kg', feedbackPeso);

  // Comparação de Drogas
  let feedbackDrogas = '';
  if (acertou) {
    feedbackDrogas = '<span class="correct">Todas corretas</span>';
  } else {
    const drogasCorretas = amigoSecreto.drogas;
    const drogasChutadas = chute.drogas;
    const drogasEmComum = drogasChutadas.filter(droga => drogasCorretas.includes(droga));

    if (drogasEmComum.length === drogasCorretas.length && drogasChutadas.length === drogasCorretas.length) {
      feedbackDrogas = '<span class="correct">Todas corretas</span>';
    } else if (drogasEmComum.length > 0) {
      feedbackDrogas = `<span class="partial">Parcial (${drogasEmComum.join(', ')})</span>`;
    } else {
      feedbackDrogas = '<span class="incorrect">Nenhuma correta</span>';
    }
  }
  criarLinha('Drogas', chute.drogas.join(', '), feedbackDrogas);

  // Comparação de Estado Civil
  let feedbackEstadoCivil = (acertou || chute.estadoCivil === amigoSecreto.estadoCivil)
    ? '<span class="correct">Correto</span>'
    : '<span class="incorrect">Incorreto</span>';
  criarLinha('Estado Civil', chute.estadoCivil, feedbackEstadoCivil);

  // Comparação de Time
  let feedbackTime = (acertou || chute.time === amigoSecreto.time)
    ? '<span class="correct">Correto</span>'
    : '<span class="incorrect">Incorreto</span>';
  criarLinha('Time', chute.time, feedbackTime);

  // Comparação de Orientação Sexual
  let feedbackOrientacao = (acertou || chute.orientacaoSexual === amigoSecreto.orientacaoSexual)
    ? '<span class="correct">Correta</span>'
    : '<span class="incorrect">Incorreta</span>';
  criarLinha('Orientação Sexual', chute.orientacaoSexual, feedbackOrientacao);

  // Comparação de Tamanho Especulado da Rola
  let feedbackTamanhoRola = obterFeedback(chute.tamanhoRola === amigoSecreto.tamanhoRola, amigoSecreto.tamanhoRola, chute.tamanhoRola);
  criarLinha('Tamanho', chute.tamanhoRola + ' cm', feedbackTamanhoRola);

  if (acertou) {
    mensagemFinal.textContent = 'Parabéns! Você acertou o integrante do Pizza!';
    tentativas = 0; // Termina o jogo
  } else if (tentativas === 0) {
    mensagemFinal.textContent = `Fim de jogo! O amigo secreto era: ${amigoSecreto.nome}`;
  }
}

function atualizarTentativas() {
  const tentativasDiv = document.getElementById('tentativasRestantes');
  tentativasDiv.textContent = `Tentativas restantes: ${tentativas}`;
}

function reiniciarJogo() {
  tentativas = 3;
  amigoSecreto = amigos[Math.floor(Math.random() * amigos.length)];
  document.getElementById('chute').value = '';
  document.getElementById('feedbackTable').innerHTML = '';
  document.getElementById('mensagemFinal').textContent = '';
  atualizarTentativas();
}

// Inicializa o contador de tentativas
atualizarTentativas();

const tabuleiro = document.querySelectorAll('td');
const ganhador = document.querySelector('p');
const reiniciar = document.querySelector('a');

let jogador = "O";
let numeroJogadas = 0;
let jogoAcabou = false;

tabuleiro.forEach(casa => {
  casa.addEventListener("click", () => {
    if (jogadaValida(casa, jogador)) {
      jogador = jogador === "O" ? "X" : "O";
      numeroJogadas++;
    } 
    ganhador.innerText = verificaVencedor(tabuleiro);
  });
});

reiniciar.addEventListener("click", (event) => {
  event.preventDefault();
  tabuleiro.forEach(casa => {
    casa.innerText = "";
    jogador = "O";
    ganhador.innerText = "-> Ganhador Aqui <-";
    numeroJogadas = 0;
    jogoAcabou = false;
  });
});

function jogadaValida(casa, jogador) {
  if (!jogoAcabou) {
    if (casa.innerHTML === "" && !jogoAcabou) {
      casa.innerText = jogador;
      return true;
    } else {
      alert("Casa já preenchida!");
      return false;
    }
  } else {
    alert("Jogo acabou!");
    return false;
  }

}

function verificaVencedor(tabuleiro) {
  const combinacoesVitoria = [
    [0, 1, 2], // Linha 1
    [3, 4, 5], // Linha 2
    [6, 7, 8], // Linha 3
    [0, 3, 6], // Coluna 1
    [1, 4, 7], // Coluna 2
    [2, 5, 8], // Coluna 3
    [0, 4, 8], // Diagonal principal
    [2, 4, 6]  // Diagonal secundária
  ];

  for (let combinacao of combinacoesVitoria) {
    const [a, b, c] = combinacao;
    if (
      tabuleiro[a].innerText !== "" &&
      tabuleiro[a].innerText === tabuleiro[b].innerText &&
      tabuleiro[a].innerText === tabuleiro[c].innerText
    ) {
      jogoAcabou = true;
      return tabuleiro[a].innerText + " venceu!";
    }
  }

  if (numeroJogadas === 9) {
    jogoAcabou = true;
    return "Deu velha!";
  }
  
  return "-> Ganhador Aqui <-";
}
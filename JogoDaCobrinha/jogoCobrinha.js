const quadroJogo = document.querySelector(".quadro-jogo");
const elementoPontuacao = document.querySelector(".pontos");
const elementoMaiorPontuacao = document.querySelector(".maior-pontuacao");
const controles = document.querySelectorAll(".controles i");

let fimDeJogo = false;
let posXComida, posYComida;
let posXCobra = 5, posYCobra = 5;
let velocidadeX = 0, velocidadeY = 0;
let corpoCobra = [];
let idIntervalo;
let pontuacao = 0;

let maiorPontuacao = localStorage.getItem("maiorPontuacao") || 0;
elementoMaiorPontuacao.innerText = `Maior pontuação: ${maiorPontuacao}`;

const atualizarPosicaoComida = () => {
    posXComida = Math.floor(Math.random() * 30) + 1;
    posYComida = Math.floor(Math.random() * 30) + 1;
}

const lidarFimDeJogo = () => {
    clearInterval(idIntervalo);
    alert("Fim de Jogo! Pressione OK para reiniciar...");
    location.reload();
}

const mudarDirecao = e => {
    if (e.key === "setaParaCima" && velocidadeY != 1) {
        velocidadeX = 0;
        velocidadeY = -1;
    } else if (e.key === "setaParaBaixo" && velocidadeY != -1) {
        velocidadeX = 0;
        velocidadeY = 1;
    } else if (e.key === "setaParaEsquerda" && velocidadeX != 1) {
        velocidadeX = -1;
        velocidadeY = 0;
    } else if (e.key === "setaParaDireita" && velocidadeX != -1) {
        velocidadeX = 1;
        velocidadeY = 0;
    }
}

controles.forEach(botao => botao.addEventListener("click", () => mudarDirecao({ key: botao.dataset.key })));

const iniciarJogo = () => {
    if (fimDeJogo) return lidarFimDeJogo();
    let html = `<div class="comida" style="grid-area: ${posYComida} / ${posXComida}"></div>`;

    if (posXCobra === posXComida && posYCobra === posYComida) {
        atualizarPosicaoComida();
        corpoCobra.push([posYComida, posXComida]);
        pontuacao++;
        maiorPontuacao = pontuacao >= maiorPontuacao ? pontuacao : maiorPontuacao;

        localStorage.setItem("maiorPontuacao", maiorPontuacao);
        elementoPontuacao.innerText = `Pontuação: ${pontuacao}`;
        elementoMaiorPontuacao.innerText = `Maior pontuação: ${maiorPontuacao}`;
    }

    posXCobra += velocidadeX;
    posYCobra += velocidadeY;

    for (let i = corpoCobra.length - 1; i > 0; i--) {
        corpoCobra[i] = corpoCobra[i - 1];
    }

    corpoCobra[0] = [posXCobra, posYCobra];

    if (posXCobra <= 0 || posXCobra > 30 || posYCobra <= 0 || posYCobra > 30) {
        return fimDeJogo = true;
    }

    for (let i = 0; i < corpoCobra.length; i++) {
        html += `<div class="cobra" style="grid-area: ${corpoCobra[i][1]} / ${corpoCobra[i][0]}"></div>`;

        if (i !== 0 && corpoCobra[0][1] === corpoCobra[i][1] && corpoCobra[0][0] === corpoCobra[i][0]) {
            fimDeJogo = true;
        }
    }
    quadroJogo.innerHTML = html;
}

atualizarPosicaoComida();
idIntervalo = setInterval(iniciarJogo, 100);
document.addEventListener("keyup", mudarDirecao);

const botaoVoltar = document.querySelector('#botaoVoltar');

botaoVoltar.addEventListener('click', function(event) {
  event.preventDefault();
  window.location.href = '/index.html';
});

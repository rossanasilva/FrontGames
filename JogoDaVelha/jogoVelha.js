var turnoJogador, jogadas, jogoTerminado, spans, botaoReiniciar;
turnoJogador = "x";
jogadas = 0;
jogoTerminado = false;
spans = document.getElementsByTagName("span");
botaoReiniciar = '<button onclick="jogarNovamente()"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16"><path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/><path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/></svg></button>';

function jogar(y) {
    if (y.dataset.player == "none" && window.jogoTerminado == false) {
        y.innerHTML = turnoJogador;
        y.dataset.player = turnoJogador;
        jogadas++;
        if (turnoJogador == "x") {
            turnoJogador = "o";
        } else if (turnoJogador == "o") {
            turnoJogador = "x";
        }
    }

    verificarVencedor(1, 2, 3);
    verificarVencedor(4, 5, 6);
    verificarVencedor(7, 8, 9);
    verificarVencedor(1, 4, 7);
    verificarVencedor(2, 5, 8);
    verificarVencedor(3, 6, 9);
    verificarVencedor(1, 5, 9);
    verificarVencedor(3, 5, 7);

    if (jogadas == 9 && jogoTerminado == false) { empate(); }

}

function verificarVencedor(a, b, c) {
    a--;
    b--;
    c--;
    if ((spans[a].dataset.player === spans[b].dataset.player) && (spans[b].dataset.player === spans[c].dataset.player) && (spans[a].dataset.player === spans[c].dataset.player) && (spans[a].dataset.player === "x" || spans[a].dataset.player === "o") && jogoTerminado == false) {
        spans[a].parentNode.classList.add("activeBox");
        spans[b].parentNode.classList.add("activeBox");
        spans[c].parentNode.classList.add("activeBox");
        fimDeJogo(a);
    }
}

function jogarNovamente() {
    document.querySelector(".alert").parentNode.removeChild(document.querySelector(".alert"));
    resetarJogo();
    window.jogoTerminado = false;
    for (var k = 0; k < spans.length; k++) {
        spans[k].parentNode.classList.remove("activeBox");
    }
}

function resetarJogo() {
    for (var i = 0; i < spans.length; i++) {
        spans[i].dataset.player = "none";
        spans[i].innerHTML = "&nbsp;";
    }
    turnoJogador = "x";
}

function fimDeJogo(a) {
    var mensagemFimDeJogo = "<b>Fim de Jogo </b><br><br> Jogador " + spans[a].dataset.player.toUpperCase() + ' Venceu !!! <br><br>' + botaoReiniciar;
    var div = document.createElement("div");
    div.className = "alert";
    div.innerHTML = mensagemFimDeJogo;
    document.body.appendChild(div);
    window.jogoTerminado = true;
    jogadas = 0;
}

function empate() {
    var mensagemEmpate = '<b>EMPATE!!!</b><br><br>' + botaoReiniciar;
    var div = document.createElement("div");
    div.className = "alert";
    div.innerHTML = mensagemEmpate;
    document.body.appendChild(div);
    window.jogoTerminado = true;
    jogadas = 0;
}

const botaoVoltar = document.querySelector('#botaoVoltar');

botaoVoltar.addEventListener('click', function(event) {
  event.preventDefault();
  window.location.href = '/index.html';
});

const grid = document.getElementById("grid");
let lockGame = false;
const testMode = false;
gerarGrade();

function gerarGrade() {
    lockGame = false;
    grid.innerHTML = "";
    for (var i = 0; i < 10; i++) {
        row = grid.insertRow(i);
        for (var j = 0; j < 10; j++) {
            cell = row.insertCell(j);
            cell.onclick = function () { init(this); };
            var mina = document.createAttribute("mine");
            mina.value = "false";
            cell.setAttributeNode(mina);
        }
    }
    gerarMinas();
}

function gerarMinas() {
    for (var i = 0; i < 20; i++) {
        var row = Math.floor(Math.random() * 10);
        var col = Math.floor(Math.random() * 10);
        var cell = grid.rows[row].cells[col];
        cell.setAttribute("mine", "true");
        if (testMode) {
            cell.innerHTML = "X";
        }
    }
}

function revelarMinas() {
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var cell = grid.rows[i].cells[j];
            if (cell.getAttribute("mine") == "true") {
                cell.className = "mine";
            }
        }
    }
}

function verificaJogoCompleto() {
    var jogoCompleto = true;
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            if ((grid.rows[i].cells[j].getAttribute("mine") == "false") && (grid.rows[i].cells[j].innerHTML == "")) {
                jogoCompleto = false;
            }
        }
    }
    if (jogoCompleto) {
        alert("Parabéns, você não achou nenhuma mina!");
        revelarMinas();
    }
}

function init(cell) {
    if (lockGame) {
        return;
    } else {
        if (cell.getAttribute("mine") == "true") {
            revelarMinas();
            lockGame = true;
        } else {
            cell.className = "active";
            var minaCount = 0;
            var cellRow = cell.parentNode.rowIndex;
            var cellCol = cell.cellIndex;
            for (var i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++) {
                for (var j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 9); j++) {
                    if (grid.rows[i].cells[j].getAttribute("mine") == "true") {
                        minaCount++;
                    }
                }
            }
            cell.innerHTML = minaCount;
            if (minaCount == 0) {
                for (var i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++) {
                    for (var j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 9); j++) {
                        if (grid.rows[i].cells[j].innerHTML == "") {
                            init(grid.rows[i].cells[j]);
                        }
                    }
                }
            }
            verificaJogoCompleto();
        }
    }

}

const backButton = document.querySelector('#botaoVoltar');

backButton.addEventListener('click', function(event) {
  event.preventDefault();
  window.location.href = '/index.html';
});
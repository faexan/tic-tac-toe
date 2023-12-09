const boxes = document.querySelectorAll(".sq");
let player1t = true;
let player2t = false;
let player1 = player1t;
let player2 = player2t;
boxes.forEach((box) => {
  box.addEventListener("click", (e) => {
    if (player1 == true && (e.target.innerText != "X" && e.target.innerText != "O")) {
      e.target.innerText = "X";
      player2 = true;
      player1 = false;
      Gameboard[Number(e.target.id[0])].splice(Number(e.target.id[1]), 1, "X");
      checkWinner(Gameboard[0], Gameboard[1], Gameboard[2]);
    } else if (player2 == true && (e.target.innerText != "X" && e.target.innerText != "O")) {
      e.target.innerText = "O";
      player1 = true;
      player2 = false;
      Gameboard[Number(e.target.id[0])].splice(Number(e.target.id[1]), 1, "O");
      checkWinner(Gameboard[0], Gameboard[1], Gameboard[2]);
    }
  })
})

let Gameboard = [["00", "01", "02"], ["10", "11", "12"], ["20", "21", "22"]];
function checkWinner(arr1, arr2, arr3) {
  if (arr1[0] == arr1[1] && arr1[1] == arr1[2]) {
    winner(arr1[0]);
  } else if (arr2[0] == arr2[1] && arr2[1] == arr2[2]) {
    winner(arr2[0]);
  } else if (arr3[0] == arr3[1] && arr3[1] == arr3[2]) {
    winner(arr3[0]);
  } else if (arr1[0] == arr2[0] && arr2[0] == arr3[0]) {
    winner(arr1[0]);
  } else if (arr1[1] == arr2[1] && arr2[1] == arr3[1]) {
    winner(arr1[1]);
  } else if (arr1[2] == arr2[2] && arr2[2] == arr3[2]) {
    winner(arr1[2]);
  } else if (arr1[0] == arr2[1] && arr2[1] == arr3[2]) {
    winner(arr1[0]);
  } else if (arr1[2] == arr2[1] && arr2[1] == arr3[0]) {
    winner(arr1[2]);
  } else {
    checkDraw(Gameboard);
  }
}


function winner(n) {
  updateScoreboard(n)
  const gameOverWin = document.querySelector(".game-over-window");
  const p = document.createElement("p");
  p.innerText = "The Winner is"
  const h1 = document.createElement("h1");
  h1.innerText = `${n}`;
  gameOverWin.appendChild(p);
  gameOverWin.appendChild(h1);
  gameOverWin.style.display = "unset";
  const con = document.querySelector(".container");
  con.style.filter = "blur(5px)";
  con.style.pointerEvents = "none"; 
  Restart();
}


function checkDraw(arr) {
  
  let draw = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (arr[i][j] != "X" && arr[i][j] != "O") {
        draw.push(true)
      }
    }
  }
  if (draw.length == 0) {
    const gameOverWin = document.querySelector(".game-over-window");
    const h1 = document.createElement("h1");
    h1.innerText = "Tie";
    gameOverWin.appendChild(h1);
    gameOverWin.style.display = "unset";
    const con = document.querySelector(".container");
    con.style.filter = "blur(5px)";
    con.style.pointerEvents = "none"; 
    updateScoreboard("draw");
    Restart();
  }
}

function Restart() {
  if (player1t == true) {
    player1t = false;
    player2t = true;
  } else if (player2t == true ) {
    player2t = false; 
    player1t = true;
  };
  const gameOverWin = document.querySelector(".game-over-window");
  const btnRestart = document.createElement("button");
  btnRestart.innerText = "Restart";
  btnRestart.classList.add("restart-btn");
  gameOverWin.appendChild(btnRestart);
  btnRestart.addEventListener("click", ()=> {
    boxes.forEach((box) => {
      box.innerText = "";
    })
    const con = document.querySelector(".container");
    con.style.filter = "blur(0px)";
    gameOverWin.style.display = "none";
    con.style.pointerEvents = "auto"; 
    Gameboard = [["00", "01", "02"], ["10", "11", "12"], ["20", "21", "22"]];
    while(gameOverWin.firstChild) {
      gameOverWin.removeChild(gameOverWin.firstChild);
    }
  })
}




// Scoreboard 

playerXBoard = document.querySelector(".scorex");
playerOBoard = document.querySelector(".scoreo");
drawBoard = document.querySelector(".draw");
function updateScoreboard(player) {
  if (player == "X") {
  playerXBoard.innerText = `${Number(playerXBoard.innerText) + 1}`;
  } else if (player == "O") {
    playerOBoard.innerText = `${Number(playerOBoard.innerText) + 1}`;
  } else if (player == "draw") {
    drawBoard.innerText = `${Number(drawBoard.innerText) + 1}`;
  }
}
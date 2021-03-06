window.addEventListener('load', event => {
  let gameBoard = [[,,,],[,,,],[,,,]];
  let turn = 0;
  let solution = [,,,];
  let wins = {
    0: 0,
    1: 0
  }
  let players = {
    0: prompt('Player 1 Name', 'Player 1') || 'Player 1',
    1: prompt('Player 1 Name', 'Player 2') || 'Player 2',
  }
  let lastwinner = 0;

  document.querySelector('.player1').innerHTML = players[0];
  document.querySelector('.player2').innerHTML = players[1];
  document.querySelector('.status').innerHTML = players[0] + "'s turn";
  let reset = () => {
    gameBoard = [[,,,],[,,,],[,,,]];
    turn = 0;
    let elements = [...document.getElementsByClassName('cell')];
    elements.forEach(el => {
      el.classList.remove('set', 'correct');
      el.innerHTML = "";
    });
    document.querySelector('.board').classList.remove('tie');
    document.querySelector('.status').innerHTML = players[lastwinner] + "'s turn";
  }

  let checkHorizontals = (board) => {
    for (let i = 0; i<3; i++) {
      let winner = board[i][0]
      if (winner === undefined) {
        continue;
      }
      if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        solution = [[i,0],[i,1],[i,2]];
        return winner;
      }
    }
  }

  let checkVerticals = (board) => {
    for (let i = 0; i<3; i++) {
      let winner = board[0][i]
      if (winner === undefined) {
        continue;
      }
      if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        solution = [[0,i],[1,i],[2,i]];
        return winner;
      }
    }
  }

  let checkDiagonals = (board) => {
    let winner = board[0][0];
    if (winner !== undefined) {
      if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        solution = [[0,0],[1,1],[2,2]];
        return winner;
      }
    }
    winner = board[2][0];
    if (winner !== undefined) {
      if (board[2][0] === board[1][1] && board[1][1] === board[0][2]) {
        solution = [[2,0],[1,1],[0,2]];
        return winner;
      }
    }
  }

  let checkFull = (board) => {
    for (let r = 0; r < 3; r++) {
      for(let c = 0; c < 3; c++) {
        if (board[r][c] === undefined) {
          return false;
        }
      }
    }
    return true;
  }

  let checkSolution = (board) => {
    let winner = checkHorizontals(board);
    if (winner === undefined) {
      winner = checkVerticals(board);
    }
    if (winner === undefined) {
      winner = checkDiagonals(board);
    }
    if (winner === undefined) {
      if(checkFull(board)) {
        winner = 'tie'
      }
    }
    return winner;
  }

  let highlightSolution = () => {
    for (let i = 0; i < solution.length; i++) {
      let cell = document.querySelector(`[row="${solution[i][0]}"][col="${solution[i][1]}"]`);
      cell.classList.add('correct');
    }
  }

  document.querySelector('.reset').addEventListener('click', event => {
    console.log('Resetting board');
    reset();
  });

  document.querySelector('.board').addEventListener('click', event => {
    let row = event.target.getAttribute('row');
    let col = event.target.getAttribute('col');
    if (event.target.classList.contains('set') === false && gameBoard[row][col] === undefined) {
      let player = turn % 2
      gameBoard[row][col] = player;
      event.target.classList.add('set');
      event.target.innerHTML = (player === 0) ? 'X' : 'O';
      let winner = checkSolution(gameBoard);
      let status = '';
      if (winner === 'tie') {
        status = 'No winner - Tie';
        document.querySelector('.board').classList.add('tie');
      } else if (winner !== undefined) {
        status = players[winner] + " wins!";
        lastwinner = winner;
        wins[winner]++;
        document.querySelector('.p1wins').innerHTML = wins[0];
        document.querySelector('.p2wins').innerHTML = wins[1];
        highlightSolution();
        let elements = [...document.getElementsByClassName('cell')];
        elements.forEach(el => el.classList.add('set'));
      } else {
        status = players[++turn % 2] + "'s turn";
      }
      document.querySelector('.status').innerHTML = status;
    } else {
      console.log('that space is already taken');
    }

  });
});

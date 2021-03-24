window.addEventListener('load', event => {
  let gameBoard = [[,,,],[,,,],[,,,]];
  let turn = 0;
  let players = {
    0: 'Player 1',
    1: 'Player 2',
    tie: 'Tie'
  }

  let reset = () => {
    gameBoard = [[,,,],[,,,],[,,,]];
    turn = 0;
    document.querySelector('.status').innerHTML = "Player 1's turn";
  }

  let checkHorizontals = (board) => {
    for (let i = 0; i<3; i++) {
      let winner = board[i][0]
      if (winner === undefined) {
        continue;
      }
      if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
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
        return winner;
      }
    }
  }

  let checkDiagonals = (board) => {
    let winner = board[0][0];
    if (winner !== undefined) {
      if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return winner;
      }
    }
    winner = board[2][0];
    if (winner !== undefined) {
      if (board[2][0] === board[1][1] && board[1][1] === board[0][2]) {
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
    return players[winner];
  }

  document.querySelector('.reset').addEventListener('click', event => {
    console.log('Resetting board');
    reset();
  });

  document.querySelector('.board').addEventListener('click', event => {
    console.log(gameBoard);
    let row = event.target.getAttribute('row');
    let col = event.target.getAttribute('col');
    if (event.target.classList.contains('set') === false && gameBoard[row][col] === undefined) {
      let player = turn++ % 2
      gameBoard[row][col] = player;
      event.target.classList.add('set');
      let winner = checkSolution(gameBoard);
      console.log(winner);
      let status = '';
      if (winner === 'tie') {
        status = 'No winner - Tie';
      } else if (winner !== undefined) {
        status = winner + " wins!";
        let elements = [...document.getElementsByClassName('cell')];
        elements.forEach(el => el.classList.add('set'));
      } else {
        status = players[player] + "'s turn";
      }
      document.querySelector('.status').innerHTML = status;
    } else {
      console.log('that space is already taken');
    }

  });
});

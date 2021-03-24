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

  document.querySelector('.reset').addEventListener('click', event => {
    console.log('Resetting board');
    reset();
  });

});

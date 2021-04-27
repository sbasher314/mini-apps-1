import React from "react";
import Column from "./column.jsx";
class Board extends React.Component {
  constructor (props) {
    super(props);

    this.state = this.init(props);
    this.state.players = [
      prompt('Player 1s Name', 'Player 1'),
      prompt('Player 2s Name', 'Player 2')
    ]
  }

  init(props) {
    return {
      turn: 0,
      board: this.initBoard(props.cols, props.rows),
      winner: false
    }
  }

  initBoard(cols, rows) {
    const board = [];
    for (let col = 0; col < cols; col++) {
      board[col] = [];
      for (let row = 0; row < rows; row++) {
        board[col][row] = '';
      }
    }
    return board;
  }

  restart() {
    this.setState(this.init(this.props));
  }

  checkSpaces(col, row) {
    col = Number(col);
    row = Number(row);

    const board = this.state.board;

    const checkCol = () => {
      const down = this.props.rows - row;
      const piece = board[col][row];
      let count = 0;
      if (down >= 4) {
        for (let i = row; i < this.props.rows; i++) {
          if (board[col][i] === piece) {
            count++
          } else {
            break;
          }
        }
      }
      return count >= 4 ? piece : false;
    }

    const checkRow = () => {
      let piece = board[col][row];
      let count = 0;
      for (let i = 0; i < this.props.cols; i++) {
        const next = i + 1;
        if (board[i][row] === piece) {
          count++;
          if (count >= 4) {
            break;
          }
        } else {
          count = 1;
          piece = board[i][row];
        }
        if (board[next] !== undefined && board[next][row] === '') {
          count = 0;
        }
      }
      return (count >= 4) ? piece : false;
    }

    const checkMajorDiagonal = () => {
      let top = row - col;
      if (top < 0) {
        top = 0;
      }
      let left = col - (row - top);
      let count = 0;
      let piece = board[col][row];
      for (let offset = 0; (top + offset) < this.props.rows && (left + offset < this.props.cols); offset++) {
        const c = left + offset;
        const r = top + offset;
        const current = board[c][r];
        if (current === "") {
          count = 0;
          continue;
        }
        if (current === piece) {
          count++;
          if (count >= 4) {
            break;
          }
        } else {
          count = 1;
          piece = current;
        }
      }
      return (count >= 4) ? piece : false;
    }

    const checkMinorDiagonal = () => {
      if ((col + row) >= (this.props.cols - 4 + +this.props.rows) || (col + row) < 3) {
        //bottom right and top left corner don't need to be checked
        return false;
      }
      const bottom = row + col;
      const left = 0;
      let count = 0;
      let piece = board[0][bottom];;
      for (let offset = 0; offset < this.props.cols; offset++) {
        const c = left + offset;
        const r = bottom - offset;
        if (r >= this.props.rows ) {
          continue;
        }
        const current = board[c][r];
        if (current === "") {
          count = 0;
          continue;
        }
        if (current === piece) {
          count++;
          if (count >= 4) {
            break;
          }
        } else {
          count = 1;
          piece = current;
        }
      }
      return (count >= 4) ? piece : false;
    }

    if (this.state.turn >= 6) {
      return (
        checkCol() !== false ||
        checkRow() !== false  ||
        checkMajorDiagonal() !== false ||
        checkMinorDiagonal() !== false);
    } else {
      return false;
    }
  }

  clickHandler(column) {
    const col = column.currentTarget.dataset.col;
    const board = this.state.board;
    const turn = this.state.turn;
    let row = 0;
    if (this.state.winner === false) {
      if (board[col][0] === '') {
        //run column placement and checking logic
        for (let i = this.props.cols - 1; i >= 0; i--) {
          //if we find the first available (lowest) row...
          if (board[col][i] === "") {
            row = i;
            board[col][i] = turn % 2;
            break;
          }
        }
        this.setState({
          turn : (turn + 1),
          board
        });
        const winner = this.checkSpaces(col, row);
        if (winner !== false) {
          this.setState({winner: board[col][row]});
        }
      } else {
        console.log('That column is full!');
      }
    } else {
      console.log(`Winner ${this.state.winner} found, please restart game`);
    }
  }

  render() {
    const grid = [];
    for (let col = 0; col < this.props.cols; col++) {
      grid[col] = <Column key={`column-${col}`} pieces={this.state.board[col]} col={col} rows={this.props.rows} turn={this.state.turn} clickHandler={(col) => this.clickHandler(col)}/>
    }
    const winner = this.state.winner !== false;
    return (
      <div className = "container">
        <h1>Connect 4</h1>
        <div className = "board" data-enabled={!winner}>
        {grid.map(gridItems => gridItems)}
        </div>
        {!winner &&
          <h3>{this.state.turn % 2 ? this.state.players[1] + ' (yellow)': this.state.players[0] +  ' (red)'}'s turn</h3>
        }
        {winner &&
          <h3>Winner - {this.state.players[this.state.winner]}!</h3>
        }
        <input type="button" onClick={() => this.restart()} value="Restart" style={{"maxWidth": "24em"}}/>

      </div>


    );
  }
}

export default Board;
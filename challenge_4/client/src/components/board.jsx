import React from "react";
import Column from "./column.jsx";
class Board extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    let grid = [];
    for (let col = 0; col < this.props.cols; col++) {
      grid[col] = <Column key={`column-${col}`} col={col} rows={this.props.rows}/>
    }
    return (
      <div className="board">
        {grid.map(gridItems => gridItems)}
      </div>
    );
  }
}

export default Board;
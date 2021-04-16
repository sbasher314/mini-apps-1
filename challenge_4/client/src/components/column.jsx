import React from "react";
import Square from "./square.jsx";

class Column extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  setPiece(player) {

  }

  render() {
    let column = [];
    let col = this.props.col;
    for (let row = 0; row < this.props.rows; row++) {
      column.push(<Square key={`row-${row}-col-${col}`} x={col} y={row} />);
    }
    return (
      <div key={'col-'+col} className="col">
        {column.map(item => item)}
      </div>
    );
  }
}

export default Column;
import React from "react";
import Square from "./square.jsx";

class Column extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      enabled: true
    }

  }

  render() {
    if (this.props.pieces[0] !== '') {
      this.state.enabled = false;
    }
    if (this.props.turn === 0) {
      this.state.enabled = true;
    }
    let column = [];
    let col = this.props.col;
    for (let row = 0; row < this.props.rows; row++) {
      column.push(<Square key={`row-${row}-col-${col}`} x={col} y={row} piece={this.props.pieces[row]} />);
    }
    return (
      <div key={'col-'+col} className="col" data-col={col} data-enabled={this.state.enabled} onClick={this.props.clickHandler}>
        {column.map(item => item)}
      </div>
    );
  }
}

export default Column;
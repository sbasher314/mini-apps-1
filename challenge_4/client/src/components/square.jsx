import React from "react";

class Square extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      x: props.x,
      y: props.y,
      piece: ''
    }
  }

  setPiece(player) {
    this.state.setState({
      piece: (this.state.piece === '') ? player : this.state.piece
    })
  }

  render() {
    return (
      <div className="square" data-x={this.state.x} data-y={this.state.y}>
        <div className="piece" data-piece={this.state.piece}></div>
      </div>
    );
  }
}

export default Square;
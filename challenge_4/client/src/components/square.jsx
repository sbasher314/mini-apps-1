import React from "react";

class Square extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      x: props.x,
      y: props.y,
      piece: props.piece
    }
  }

  render() {
    return (
      <div className="square" data-x={this.state.x} data-y={this.state.y}>
        <div className="piece" data-piece={this.props.piece}></div>
      </div>
    );
  }
}

export default Square;
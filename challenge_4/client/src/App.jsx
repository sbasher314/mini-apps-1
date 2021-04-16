
import React from "react";
import Board from "./components/board.jsx";
class App extends React.Component {
  render() {
    return (
      <Board rows="6" cols="7" />
    );
  }
}

export default App;
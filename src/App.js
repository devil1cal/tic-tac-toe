import React from "react";
//import ReactDOM from "react-dom";
import "./styles.css";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    const n = 9;

    return [...Array(n)].map((e, i) => (
      <div>
        <Square
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
        />
      </div>
    ));
  }
  render() {
    return (
      <div className="board">
        <tb className="board-row">{this.renderSquare()}</tb>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  /* Following the clicks */
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  toggleMoves = () => {
    const toggle = !this.state.toggle;
    this.setState({
      toggle: toggle
    });
  };

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }
  /* Following the clicks */
  render() {
    /* History tab */
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? "go to move # " + move : "go to game start";

      return (
        <div>
          <li key={move}>
            {" "}
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        </div>
      );
    });

    /* History tab */

    /* winning status */
    let status;
    let count = this.state.stepNumber;
    if (winner) {
      status = "winner " + winner;
    } else if (count >= 9 && !winner) {
      status = "draw";
    } else if (count <= 9 && !winner) {
      status = "next player " + (this.state.xIsNext ? "X" : "0");
    }
    /* winning status */

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>

          <button onClick={() => this.toggleMoves()}>Toggle</button>

          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

/* Line calculation */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

/*Line calculation */

export default Game;

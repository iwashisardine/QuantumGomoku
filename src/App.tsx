import { useState } from "react";
import React from 'react';

const size = 19;

type squareProps = {
  value: number,
  i: number,
  j: number,
  p2: number,
  onSquareClick: () => void
}
const Square = ({ value, i, j, p2, onSquareClick }: squareProps) => {
  if (value === 100 || value === 0) {
    const fillColor: string = "#" + Math.round(((100 - value) / 100) * 15).toString(16).repeat(3);

    return (
      <button className="square" onClick={onSquareClick}>
        <svg width="34" height="34">
          <circle cx="17" cy="17" r="15" fill={fillColor} stroke="#888" strokeWidth="1"></circle>
        </svg>
      </button>
    );
  } else if (value !== null) {
    const fillColor: string = "#" + Math.round(((100 - value) / 100) * 15).toString(16).repeat(3);

    const textColor: string = value >= p2 ? "white" : "black";

    return (
      <button className="square" onClick={onSquareClick}>
        <svg width="34" height="34">
          <circle cx="16" cy="16" r="15" fill={fillColor} stroke="#888" strokeWidth="1"></circle>
          <text x="16" y="20" fontFamily="Verdana" fontSize="12" textAnchor="middle" fill={textColor}>
            {value}
          </text>
        </svg>
      </button>
    );
  } else if ( i === 0 && j === 0) {
    // top left
    return (
      <button className="square" onClick={onSquareClick}>
        <svg width="34" height="34">
          <line x1="17" y1="17" x2="34" y2="17" stroke="#000" strokeWidth="2"/>
          <line x1="17" y1="17" x2="17" y2="34" stroke="#000" strokeWidth="2"/>
        </svg>
      </button>
    )
  } else if ( i === 0 && j === (size -1) ) {
    // top_right
    return (
      <button className="square" onClick={onSquareClick}>
        <svg width="34" height="34">
          <line x1="0" y1="17" x2="17" y2="17" stroke="#000" strokeWidth="2"/>
          <line x1="17" y1="17" x2="17" y2="34" stroke="#000" strokeWidth="2"/>
        </svg>
      </button>
    )
  } else if ( i === (size -1) && j === 0 ) {
    // bottom_left
    return (
      <button className="square" onClick={onSquareClick}>
        <svg width="34" height="34">
          <line x1="17" y1="0" x2="17" y2="17" stroke="#000" strokeWidth="2"/>
          <line x1="17" y1="17" x2="34" y2="17" stroke="#000" strokeWidth="2"/>
        </svg>
      </button>
    )
  } else if ( i === (size -1) && j === (size -1) ) {
    // bottom_right
    return (
      <button className="square" onClick={onSquareClick}>
        <svg width="34" height="34">
          <line x1="17" y1="0" x2="17" y2="17" stroke="#000" strokeWidth="2"/>
          <line x1="0" y1="17" x2="17" y2="17" stroke="#000" strokeWidth="2"/>
        </svg>
      </button>
    )
  } else if ( i === 0 ) {
    // top
    return (
      <button className="square" onClick={onSquareClick}>
        <svg width="34" height="34">
          <line x1="0" y1="17" x2="34" y2="17" stroke="#000" strokeWidth="2"/>
          <line x1="17" y1="17" x2="17" y2="34" stroke="#000" strokeWidth="2"/>
        </svg>
      </button>
    )
  } else if ( i === (size -1) ) {
    // bottom
    return (
      <button className="square" onClick={onSquareClick}>
        <svg width="34" height="34">
          <line x1="0" y1="17" x2="34" y2="17" stroke="#000" strokeWidth="2"/>
          <line x1="17" y1="0" x2="17" y2="17" stroke="#000" strokeWidth="2"/>
        </svg>
      </button>
    )
  } else if ( j === 0 ) {
    // left
    return (
      <button className="square" onClick={onSquareClick}>
        <svg width="34" height="34">
          <line x1="17" y1="17" x2="34" y2="17" stroke="#000" strokeWidth="2"/>
          <line x1="17" y1="0" x2="17" y2="34" stroke="#000" strokeWidth="2"/>
        </svg>
      </button>
    )
  } else if ( j === (size -1) ) {
    // right
    return (
      <button className="square" onClick={onSquareClick}>
        <svg width="34" height="34">
          <line x1="0" y1="17" x2="17" y2="17" stroke="#000" strokeWidth="2"/>
          <line x1="17" y1="0" x2="17" y2="34" stroke="#000" strokeWidth="2"/>
        </svg>
      </button>
    )
  } else {
    // cross
    return (
      <button className="square" onClick={onSquareClick}>
        <svg width="34" height="34">
          <line x1="0" y1="17" x2="34" y2="17" stroke="#000" strokeWidth="2"/>
          <line x1="17" y1="0" x2="17" y2="34" stroke="#000" strokeWidth="2"/>
        </svg>
      </button>
    )
  }
}

type boardProps = {
  history: number[][],
  currentMove: number,
  isObserved: boolean,
  observationCount: number[];
  p1: number,
  p2: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onPlay: any
}
const Board = ({ history, currentMove, isObserved, observationCount, p1, p2, onPlay }: boardProps) => {
  const squares = history[currentMove];
  function handleClick(i: number) {
    if(isObserved) return; // 観測中ならスキップ
    if(squares[i]) return; // 置かれているならスキップ
    const nextSquares = squares.slice();
    let whatIsNext = 90;
    const adjustment = 2 * (observationCount[0] + observationCount[1]);
    if((currentMove - adjustment) % 4 === 0) whatIsNext = p1;
    else if((currentMove - adjustment) % 4 === 1) whatIsNext = 100 - p1;
    else if((currentMove - adjustment) % 4 === 2) whatIsNext = p2;
    else if((currentMove - adjustment) % 4 === 3) whatIsNext = 100 - p2;
    nextSquares[i] = whatIsNext;
    onPlay(nextSquares);
  } 
  
  let status: string;

  if(isObserved) {
    const blackIsNext = (currentMove - 1) % 2 === 0;
    status = "Next Player: " + (blackIsNext ? "BLACK" : "WHITE");
  } else {
    const blackIsNext = currentMove % 2 === 0;
    status = "Next Player: " + (blackIsNext ? "BLACK" : "WHITE");
  }

  const observationInfo = `Observation Counts: BLACK ${observationCount[0]} WHITE ${observationCount[1]}`

  return (
    <>
      <div className="status">{status}</div>
      <div className="observationInfo">{observationInfo}</div>
      {
        Array(size).fill(0).map((value_i, i) => {
          return (
            <div className="board-row" key={i}>
              {
                Array(size).fill(0).map((value_j, j) => {
                    return(
                      <React.Fragment key={j}>
                        <Square value={squares[i * size + j]} i={i} j={j} p2={p2} onSquareClick={() => handleClick(i * size + j)} />
                      </React.Fragment>
                    );
                })
              }
            </div>
          );
        })
      }
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(size * size).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isObserved, setIsObserved] = useState(false);
  const [observationCount, setObservationCount] = useState([0, 0]);
  const [p1, setP1] = useState(90);
  const [p2, setP2] = useState(70);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: string[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  function handleObserve() {
    if(isObserved){
      const nextSquares = history[currentMove - 1].slice();
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);
      setIsObserved(!isObserved);
    } else {
      const observedSquares = currentSquares.slice();
      for (let i = 0; i < size * size; i++) {
        const rand = Math.floor(Math.random() * 100);
        if(observedSquares[i]) {
          if (rand <= observedSquares[i]){
            observedSquares[i] = 100;
          } else {
            observedSquares[i] = 0;
          }
        }
      }
      const nextHistory = [...history.slice(0, currentMove + 1), observedSquares];
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);
      setIsObserved(!isObserved);

      observationCount[currentMove % 2] += 1;
      setObservationCount(observationCount);
    }
  }

  const moves = history.map((squares, move) =>{
    let description;
    
    if(move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }

    return (
      <li key={move}>
        <button disabled={isObserved} onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  });
  
  function undo(){
    if(currentMove === 0) return;
    setCurrentMove(currentMove - 1);
  }

  function redo() {
    if(currentMove === history.length - 1) return;
    setCurrentMove(currentMove + 1);
  }
  
  return (
    <div className="game">
      <div className="game-board">
        <Board history={history} currentMove={currentMove} isObserved={isObserved} observationCount={observationCount} p1={p1} p2={p2} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button className="observe" onClick={handleObserve}>{isObserved ? "UNOBSERVE" : "OBSERVE!"}</button>
        <div>
          <label>Change Moves: </label>
          <button className="undo" onClick={undo} disabled={isObserved}>←</button>
          <button className="redo" onClick={redo} disabled={isObserved}>→</button>
        </div>
        <div>
          <label>p1 = </label>
          <input
            type="text"
            value={p1}
            onChange={event => setP1(Number(event.target.value))}
          />
          <label>, p2 = </label>
          <input
            type="text"
            value={p2}
            onChange={event => setP2(Number(event.target.value))}
          />
        </div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}
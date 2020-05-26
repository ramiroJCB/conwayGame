import React, { useState, useCallback, useRef, useEffect } from "react";
import { Buttons, Cells, GridCage } from "./styles";

const surroundingCells = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

const App = () => {
  //Cols ,Rows and grid states
  const [numRows, setNumRows] = useState(30);
  const [numCols, setNumCols] = useState(50);
  const [Intervals, setIntervals] = useState(1000);

  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }

    return rows;
  });

  //Making Reference to Know when it´s running
  const [running, setRunning] = useState(false);

  const runningRef = useRef(running);
  runningRef.current = running;

  //
  const generateEmptyGrid = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }

    return rows;
  };

  //
  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid((currentGrid) => {
      let gridCopy = currentGrid.slice();

      for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
          let neighbors = 0;
          surroundingCells.forEach(([x, y]) => {
            const newI = i + x;
            const newJ = j + y;
            if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
              neighbors += currentGrid[newI][newJ];
            }
          });

          if (neighbors < 2 || neighbors > 3) {
            gridCopy[i][j] = 0;
          } else if (currentGrid[i][j] === 0 && neighbors === 3) {
            gridCopy[i][j] = 1;
          }
        }
      }
      return gridCopy;
    });

    setTimeout(runSimulation, Intervals);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex" }}>
        <Buttons
          onClick={() => {
            setRunning(!running);
            if (!running) {
              runningRef.current = true;
              runSimulation();
            }
          }}
        >
          {running ? "stop" : "start"}
        </Buttons>
        <Buttons
          onClick={() => {
            const rows = [];
            for (let i = 0; i < numRows; i++) {
              rows.push(
                Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0))
              );
            }

            setGrid(rows);
          }}
        >
          random
        </Buttons>
        <Buttons
          onClick={() => {
            setGrid(generateEmptyGrid());
          }}
        >
          clear
        </Buttons>
      </div>
      <GridCage Cols={numCols}>
        {grid &&
          grid.map((rows, i) =>
            rows.map((col, key) => (
              <Cells
                state={grid[i][key]}
                key={`${i + key + col}`}
                onClick={() => {
                  const newGrid = grid.slice();
                  newGrid[i][key] = grid[i][key] ? 0 : 1;
                  setGrid(newGrid);
                }}
              />
            ))
          )}
      </GridCage>
    </div>
  );
};

export default App;

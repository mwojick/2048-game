import React, { useState, useEffect, useRef } from "react";
import { SGrid, colors } from "./styles";
import Hammer from "hammerjs";

import Tile from "./Tile";

let arr = [0, 0, 2, 8, 64, 32, 0, 2, 16, 128, 256, 512, 1024, 2048, 4096, 8192];
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const handleMoved = newNumbers => {
  // assign random zero spot to 2
  let flat = newNumbers.flat();
  let zeroIndexes = [];
  flat.forEach((el, ind) => {
    if (el === 0) {
      zeroIndexes.push(ind);
    }
  });
  if (zeroIndexes.length !== 0) {
    let index = zeroIndexes[Math.floor(Math.random() * zeroIndexes.length)];
    let x = index % 4;
    let y = (index - x) / 4;
    newNumbers[y][x] = 2;
  }
};

const Grid = props => {
  const gridRef = useRef(null);
  const [numbers, setNumbers] = useState(
    Array(4)
      .fill(0)
      .map(a => new Array(4).fill(0))
  );

  useEffect(() => {
    let randIndexX = getRandomInt(4);
    let randIndexY = getRandomInt(4);
    let randIndexX2 = getRandomInt(4);
    let randIndexY2 = getRandomInt(4);
    let newNumbers = Object.assign([], numbers);
    newNumbers[randIndexY][randIndexX] = 2;
    newNumbers[randIndexY2][randIndexX2] = 2;
    setNumbers(newNumbers);
    console.log(newNumbers);

    let grid = gridRef.current;
    let hammer = new Hammer(grid);

    hammer.get("swipe").set({ direction: Hammer.DIRECTION_ALL });

    hammer.on("swipedown", function(e) {
      let moved = false;
      let newNumbers = Object.assign([], numbers);
      for (let i = numbers.length - 2; i >= 0; i--) {
        for (let j = 0; j < numbers[i].length; j++) {
          if (numbers[i][j] !== 0) {
            let moveTo = i + 1;
            while (moveTo < numbers.length - 1 && numbers[moveTo][j] === 0) {
              moveTo++;
            }
            console.log(moveTo);

            let num = numbers[i][j];
            if (num === numbers[moveTo][j]) {
              moved = true;
              newNumbers[moveTo][j] *= 2;
              newNumbers[i][j] = 0;
            } else if (numbers[moveTo][j] === 0) {
              moved = true;
              newNumbers[moveTo][j] = num;
              newNumbers[i][j] = 0;
            } else if (numbers[moveTo - 1][j] === 0) {
              moved = true;
              newNumbers[moveTo - 1][j] = num;
              newNumbers[i][j] = 0;
            }
          }
        }
      }

      if (moved) {
        handleMoved(newNumbers);
      }

      setNumbers(newNumbers);
      console.log("down");
      console.log(e);
    });
    hammer.on("swipeup", function(e) {
      console.log("up");
      console.log(e);
    });
    hammer.on("swiperight", function(e) {
      console.log("right");
      console.log(e);
    });
    hammer.on("swipeleft", function(e) {
      console.log("left");
      console.log(e);
    });
  }, []);

  return (
    <SGrid ref={gridRef}>
      {numbers.flat().map((a, i) => {
        let num = a === 0 ? "" : a;
        let styles = colors[4096];
        if (colors[a]) {
          styles = colors[a];
        }
        return <Tile num={num} styles={styles} key={i} />;
      })}
    </SGrid>
  );
};

export default Grid;

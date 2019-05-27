import React, { useState, useEffect, useRef, useCallback } from "react";
import { SGrid, colors } from "./styles";
import Hammer from "hammerjs";

import Tile from "./Tile";

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

  const handleSwipe = useCallback(direction => {
    let moved = false;
    let newNumbers = Object.assign([], numbers);
    let newScore = 0;

    // get values we need
    for (let i = 0; i < numbers.length; i++) {
      let arr = [];
      for (let j = 0; j < numbers.length; j++) {
        if (direction === "down" || direction === "up") {
          arr.push(numbers[j][i]);
        } else {
          arr.push(numbers[i][j]);
        }
      }

      // check if it will move based on zeroes
      let sawNonZero = false;
      if (direction === "down" || direction === "right") {
        for (let k = 0; k < arr.length; k++) {
          if (!sawNonZero && arr[k] !== 0) {
            sawNonZero = true;
          } else if (arr[k] === 0 && sawNonZero) {
            moved = true;
          }
        }
      } else {
        for (let k = arr.length - 1; k >= 0; k--) {
          if (!sawNonZero && arr[k] !== 0) {
            sawNonZero = true;
          } else if (arr[k] === 0 && sawNonZero) {
            moved = true;
          }
        }
      }

      // filter and collapse array
      let newArr = arr.filter(el => el !== 0);

      if (newArr.length > 1) {
        let collapsible = true;
        while (collapsible) {
          collapsible = false;

          if (direction === "down" || direction === "right") {
            for (let k = newArr.length - 1; k > 0; k--) {
              if (newArr[k] === newArr[k - 1]) {
                let temp = newArr[k] * 2;
                newScore += temp;
                newArr.splice(k - 1, 2, temp);
                moved = true;
                collapsible = true;
                break;
              }
            }
          } else {
            for (let k = 0; k < newArr.length - 1; k++) {
              if (newArr[k] === newArr[k + 1]) {
                let temp = newArr[k] * 2;
                newScore += temp;
                newArr.splice(k, 2, temp);
                moved = true;
                collapsible = true;
                break;
              }
            }
          }
        }
      }

      // pad front with 0s
      while (newArr.length !== numbers.length) {
        if (direction === "down" || direction === "right") {
          newArr.unshift(0);
        } else {
          newArr.push(0);
        }
      }

      if (direction === "down" || direction === "up") {
        for (let k = 0; k < newArr.length; k++) {
          newNumbers[k][i] = newArr[k];
        }
      } else {
        for (let k = 0; k < newArr.length; k++) {
          newNumbers[i][k] = newArr[k];
        }
      }
    }

    if (moved) {
      handleMoved(newNumbers);
      setNumbers(newNumbers);
      props.setScore(newScore);
    }
  }, []);

  useEffect(() => {
    let randIndexX = getRandomInt(4);
    let randIndexY = getRandomInt(4);
    let randIndexX2 = getRandomInt(4);
    let randIndexY2 = getRandomInt(4);
    let newNumbers = Object.assign([], numbers);
    newNumbers[randIndexY][randIndexX] = 2;
    newNumbers[randIndexY2][randIndexX2] = 2;
    setNumbers(newNumbers);

    let grid = gridRef.current;
    let hammer = new Hammer(grid);

    hammer.get("swipe").set({ direction: Hammer.DIRECTION_ALL });

    hammer.on("swipedown", function(e) {
      handleSwipe("down");
    });

    hammer.on("swipeup", function(e) {
      handleSwipe("up");
    });

    hammer.on("swiperight", function(e) {
      handleSwipe("right");
    });

    hammer.on("swipeleft", function(e) {
      handleSwipe("left");
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

import React, { useState, useEffect, useRef } from "react";
import { SGrid, colors } from "./styles";
import Hammer from "hammerjs";

import Tile from "./Tile";

let arr = [0, 0, 2, 8, 64, 32, 0, 2, 16, 128, 256, 512, 1024, 2048, 4096, 8192];
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

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
    console.log(hammer);

    hammer.get("swipe").set({ direction: Hammer.DIRECTION_ALL });

    hammer.on("swipedown", function(e) {
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

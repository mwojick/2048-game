import React, { useState, useEffect } from "react";
import { SGrid, colors } from "./styles";

import Tile from "./Tile";

let arr = [0, 0, 2, 8, 64, 32, 0, 2, 16, 128, 256, 512, 1024, 2048, 4096, 8192];
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const Grid = props => {
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
  }, []);

  return (
    <SGrid>
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

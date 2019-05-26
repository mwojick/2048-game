import React from "react";
import { STile, Content, Number } from "./styles";

const Tile = ({ num, styles }) => {
  return (
    <STile styles={styles}>
      <Content>
        <Number>{num}</Number>
      </Content>
    </STile>
  );
};

export default Tile;

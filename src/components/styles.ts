import styled from "@emotion/styled";
import { keyframes } from "@emotion/core";

let margin = 10;

export const Main = styled.div`
  padding: ${margin}px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 24px;
`;

export const SGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;

  width: calc(100% - ${2 * margin}px);
  max-width: 330px;
  margin-top: 20px;

  background-color: rgb(187 173 160);
  border-radius: 5px;
  padding: 10px;

  &:hover {
    cursor: pointer;
  }
`;

export const STile = styled.div`
  position: relative;
  border-radius: 5px;
  background: rgb(204 192 179);
  &:before {
    content: "";
    display: block;
    padding-top: 100%;
  }
`;

export const Content = styled.div`
  color: ${props => props.styles.color};
  background-color: ${props => props.styles.background};
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  z-index: 10;
  /* -ms-transform: translate(50px, 0px);  */
  /* -webkit-transform: translate(50px, 0px); */

  /* &:hover {
    transition: 0.2s ease-in;
    transform: translate(calc(100% * 4 - 10px * 4), 0px);
  } */
`;

export const Number = styled.div`
  font-size: 26px;
  font-weight: bold;
  width: auto;
  height: auto;

  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
`;

export const colors = {
  0: {
    color: "rgb(119	110	101)",
    background: "rgba(204	192	179,0	)"
  },
  2: {
    color: "rgb(119	110	101)",
    background: "rgb(238 228 218)"
  },
  4: {
    color: "rgb(119	110	101)",
    background: "rgb(237 224 200)"
  },
  8: {
    color: "rgb(249	246	242)",
    background: "rgb(242 177 121)"
  },
  16: {
    color: "rgb(249	246	242)",
    background: "rgb(245	149	99	)"
  },
  32: {
    color: "rgb(249	246	242)",
    background: "rgb(246	124	95	)"
  },
  64: {
    color: "rgb(249	246	242)",
    background: "rgb(246	94	59	)"
  },
  128: {
    color: "rgb(249	246	242)",
    background: "rgb(237	207	114	)"
  },
  256: {
    color: "rgb(249	246	242)",
    background: "rgb(237	204	97	)"
  },
  512: {
    color: "rgb(249	246	242)",
    background: "rgb(237	200	80	)"
  },
  1024: {
    color: "rgb(249	246	242)",
    background: "rgb(237	197	63	)"
  },
  2048: {
    color: "rgb(249	246	242)",
    background: "rgb(237	194	45	)"
  },
  4096: {
    color: "rgb(249	246	242)",
    background: "rgb(62	57 51)"
  }
};

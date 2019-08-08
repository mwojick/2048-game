import * as React from "react";
import { render } from "react-dom";
import App from "./components/App";
import "./index.scss";

const rend = () => {
  render(<App />, document.getElementById("root"));
};

rend();

if ((module as any).hot) {
  (module as any).hot.accept(() => {
    rend();
  });
}

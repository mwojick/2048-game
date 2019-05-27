import React, { useState, useReducer } from "react";
import { Main } from "./styles";

import Grid from "./Grid";

const initialScore = { score: 0 };

function reducer(state, action) {
  return { score: state.score + action.newScore };
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialScore);

  return (
    <Main>
      <div>2048</div>
      <div>Score: {state.score}</div>
      <Grid
        score={state.score}
        setScore={newScore => dispatch({ newScore: newScore })}
      />
    </Main>
  );
};

export default App;

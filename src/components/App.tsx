import React, { useState } from "react";
import { Main } from "./styles";

import Grid from "./Grid";

const App = () => {
  const [score, setScore] = useState(0);

  return (
    <Main>
      <div>2048</div>
      <div>Score: {score}</div>
      <Grid score={score} setScore={setScore} />
    </Main>
  );
};

export default App;

import { useState } from "react";
import "./App.css";
import Tip from "./component/Tip";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Tip />
    </>
  );
}

export default App;

import { useState } from "react";

const App = () => {
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    setCounter(counter + 1);
  };
  // setTimeout(() => setCounter(counter + 1), 1000);

  return (
    <div>
      <button onClick={handleClick}>+</button>
      <p>{counter}</p>
    </div>
  );
};

export default App;

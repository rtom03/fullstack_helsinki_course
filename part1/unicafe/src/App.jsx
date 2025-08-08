import { useState } from "react";
import Statistic from "./components/Statistic";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const goodFeedback = () => {
    const updatedGood = good + 1;
    const updatedTotal = updatedGood + neutral + bad;

    setGood(updatedGood);
    setTotal(updatedGood + neutral + bad);
    setPositive((updatedGood / updatedTotal) * 100);
    setAverage((updatedGood * 1 + neutral * 0 + bad * -1) / updatedTotal);
  };

  const neutralFeedback = () => {
    const updatedNeutral = neutral + 1;
    const updatedTotal = updatedNeutral + good + bad;

    setNeutral(updatedNeutral);
    setTotal(updatedNeutral + good + bad);
    setPositive((good / updatedTotal) * 100);
    setAverage((good * 1 + updatedNeutral * 0 + bad * -1) / updatedTotal);
  };

  const badFeedback = () => {
    const updatedBad = bad + 1;
    const updatedTotal = updatedBad + good + neutral;

    setBad(updatedBad);
    setTotal(updatedBad + good + neutral);
    setPositive((good / updatedTotal) * 100);
    setAverage((good * 1 + neutral * 0 + updatedBad * -1) / updatedTotal);
  };

  return (
    <div>
      <h1>Feed Back</h1>
      <button onClick={goodFeedback}>good</button>
      <button onClick={neutralFeedback}>neutral</button>
      <button onClick={badFeedback}>bad</button>
      <br />
      <h3>Statistic</h3>
      {total != 0 ? (
        <>
          <table>
            <tr>
              <td>good</td>
              <td>{good}</td>
            </tr>
            <tr>
              <td>neutral</td>
              <td>{neutral}</td>
            </tr>{" "}
            <tr>
              <td>bad</td>
              <td>{bad}</td>
            </tr>
            <tr>
              <td>all</td>
              <td>{total}</td>
            </tr>
          </table>
          <Statistic average={average} positive={positive} />
        </>
      ) : (
        <>
          <h2>No Feedback</h2>
        </>
      )}
    </div>
  );
};

export default App;

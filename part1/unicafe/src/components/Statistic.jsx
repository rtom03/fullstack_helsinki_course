import React from "react";

const Statistic = ({ average, positive }) => {
  return (
    <div>
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive} />
    </div>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <table>
      <tr>
        <td>
          {text} {value}
        </td>
      </tr>
    </table>
  );
};
export default Statistic;

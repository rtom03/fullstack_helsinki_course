import React from "react";

const Total = ({ course }) => {
  return (
    <div>
      <h1>
        {" "}
        Number of exercises{" "}
        {course.parts.reduce((sum, part) => sum + part.exercises, 0)}
      </h1>
    </div>
  );
};

export default Total;

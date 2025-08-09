import Header from "./Header";

const Content = ({ course }) => {
  console.log("Content", course);
  const total = course[0].parts.reduce((sum, item) => sum + item.exercises, 0);
  const total1 = course[1].parts.reduce((sum, item) => sum + item.exercises, 0);

  //   console.log(total);
  return (
    <div>
      {course[0].parts.map((cs) => (
        <Part key={cs.id} name={cs.name} exercises={cs.exercises} />
      ))}
      {`total of ${total} of exercises`}

      <Header header={course[1].name} />
      {course[1].parts.map((cs) => (
        <Part key={cs.id} name={cs.name} exercises={cs.exercises} />
      ))}
      {`total of ${total1} of exercises`}
    </div>
  );
};

const Part = ({ name, exercises, id }) => {
  return (
    <div key={id}>
      {name} {exercises}
    </div>
  );
};

export default Content;

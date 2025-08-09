const Content = ({ parts }) => {
  //   console.log(parts);
  const total = parts.reduce((sum, item) => sum + item.exercises, 0);
  //   console.log(total);
  return (
    <div>
      {parts.map((cs) => (
        <Part key={cs.id} name={cs.name} exercises={cs.exercises} />
      ))}
      {`total of ${total} of exercises`}
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

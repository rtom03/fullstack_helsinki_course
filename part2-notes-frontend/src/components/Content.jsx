const Content = ({ parts }) => {
  console.log(parts);
  return (
    <div>
      {parts.map((cs) => (
        <Part key={cs.id} name={cs.name} exercises={cs.exercises} />
      ))}
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

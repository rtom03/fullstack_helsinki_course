import Content from "./Content";
import Header from "./Header";

const Course = ({ course }) => {
  //   console.log(course);
  return (
    <div>
      <Header header={course.name} />
      <Content parts={course.parts} />
    </div>
  );
};

export default Course;

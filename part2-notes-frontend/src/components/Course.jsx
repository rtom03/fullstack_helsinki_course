import Content from "./Content";
import Header from "./Header";

const Course = ({ course }) => {
  // console.log("Course:", course);
  return (
    <div>
      <h3>Web development curriculum</h3>
      {/* {course[0].map((cs) => ( */}
      <Header header={course[0].name} />
      {/* ))} */}
      <Content course={course} />
    </div>
  );
};

export default Course;

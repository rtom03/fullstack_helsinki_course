const dummy = (array, value) => {
  return array.indexOf(value); // returns the index of the value
};

const totalLikes = (likes) => {
  return likes.reduce((sum, blog) => sum + blog.likes, 0);
};

const favouriteBlog = (blogs) => {
  return Math.max(...blogs.map((blog) => blog.likes));
};

const mostBlogs = (blogs) => {
  const top = blogs.reduce((prev, current) =>
    current.blogs.length > prev.blogs.length ? current : prev
  );
  return { author: top.author, blogs: top.blogs.length };
};
export { dummy, totalLikes, favouriteBlog, mostBlogs };

// const blogs = [
//   {
//     author: "rtom",
//     blogs: [
//       {
//         _id: "68a4b2b9107d3b764742a255",
//         title: "Web Development",
//         url: "http://localhost:8000/api-post",
//         likes: 100,
//         __v: 0,
//       },
//       {
//         _id: "68a4b2b9107d3b764742a255",
//         title: "Web Development",
//         url: "http://localhost:8000/api-post",
//         likes: 100,
//         __v: 0,
//       },
//       {
//         _id: "68a4b2b9107d3b764742a255",
//         title: "Web Development",
//         url: "http://localhost:8000/api-post",
//         likes: 100,
//         __v: 0,
//       },
//     ],
//   },
//   {
//     author: "garland",
//     blogs: [
//       {
//         _id: "68a4b2b9107d3b764742a255",
//         title: "Web Development",
//         url: "http://localhost:8000/api-post",
//         likes: 100,
//         __v: 0,
//       },
//       {
//         _id: "68a4b2b9107d3b764742a255",
//         title: "Web Development",
//         url: "http://localhost:8000/api-post",
//         likes: 100,
//         __v: 0,
//       },
//     ],
//   },
// ];
// console.log(mostBlogs(blogs));

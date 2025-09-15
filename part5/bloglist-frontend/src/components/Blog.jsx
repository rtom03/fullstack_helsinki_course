import { useState } from "react";
import { deleteBlog, updateBlog } from "../services/blogs.js";

const Blog = ({ blog, onUpdate }) => {
  const [hide, setHide] = useState(true);
  // const [likes, setLikes] = useState(0);

  const blogStyle = {
    paddingLeft: 2,
  };

  const blogHideStyle = {
    display: "none",
  };

  const handleLikes = () => {
    try {
      const updateLike = { likes: blog.likes++ };
      updateBlog(blog.id, updateLike).then((response) => {
        onUpdate(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = () => {
    try {
      window.confirm("are you sure you want to delete this item?");
      deleteBlog(blog.id).then((response) => response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ borderWidth: 1, border: "solid", marginBottom: 5 }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <p>{blog.title}</p>
        <button onClick={() => setHide(!hide)} style={{ height: 20 }}>
          {hide ? "view" : "hide"}
        </button>
      </div>
      <div style={hide ? blogHideStyle : blogStyle}>
        <p>{blog.author}</p>
        <p>{blog.url}</p>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button onClick={handleLikes}>likes</button>
          <p>{blog.likes}</p>
        </div>
        <button style={{ backgroundColor: "red" }} onClick={handleRemove}>
          remove
        </button>
      </div>
    </div>
  );
};

export default Blog;

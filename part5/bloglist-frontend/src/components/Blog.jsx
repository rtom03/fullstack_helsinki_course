// import { useState } from "react";

const Blog = ({ blog, handleLikes, handleRemove, handleView, view }) => {
  const blogStyle = {
    paddingLeft: 2,
  };

  const blogHideStyle = {
    display: "none",
  };

  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  // console.log(user.user);
  return (
    <div style={{ borderWidth: 1, border: "solid", marginBottom: 5 }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <p>{blog.title}</p>
        <button onClick={handleView} style={{ height: 20 }} id="view">
          {view ? "view" : "hide"}
        </button>
      </div>
      <div style={view ? blogHideStyle : blogStyle}>
        <p>{blog.author}</p>
        <p>{blog.url}</p>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button onClick={handleLikes}>like</button>
          <p>{blog.likes}</p>
        </div>
        {user.user.id === blog.user && (
          <button style={{ backgroundColor: "red" }} onClick={handleRemove}>
            remove
          </button>
        )}
      </div>
    </div>
  );
};

export default Blog;

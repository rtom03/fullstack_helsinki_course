import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import { createBlog, baseUrl, getAll, setToken } from "./services/blogs";
import axios from "axios";
import ErrorNoti from "./components/ErrorNoti";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  // const newObject = { title, author, url };
  const [message, setMessage] = useState("");
  const [vissible, setVissible] = useState(true);
  const [formData, setFormData] = useState({ title: "", author: "", url: "" });

  const hideVissibility = { display: vissible ? "none" : "" };
  const showVissibity = { display: vissible ? "" : "none" };

  useEffect(() => {
    getAll().then((blogs) => setBlogs(blogs.data));
    // setMessage("New blog successfully posted");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const request = await axios.post(`${baseUrl}/login`, {
        username,
        password,
      });
      setUser(request.data);
      setMessage(request.data.message);
      setTimeout(() => {
        setMessage("");
      }, 3000);
      window.localStorage.setItem("user", JSON.stringify(request.data));
      // console.log(user.name);
      setToken(request.data.token);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
      setMessage(error.message);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  useEffect(() => {
    try {
      const loggedUser = window.localStorage.getItem("user");
      if (loggedUser) {
        const user = JSON.parse(loggedUser);
        // console.log(user.data.name);
        setUser(user);
        setToken(user.token);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleCreatePost = (e) => {
    e.preventDefault();
    try {
      createBlog(formData).then((response) => {
        setBlogs((prevBlogs) => [...prevBlogs, response.data]);
        setMessage("New blog successfully posted");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      });
      setFormData({ title: "", author: "", url: "" });
    } catch (error) {
      console.log(error);
      setMessage(error);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("user");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateBlog = (updatedBlog) => {
    setBlogs((prevBlogs) => {
      const updatedList = prevBlogs.map((b) =>
        b.id === updatedBlog.id ? updatedBlog : b
      );
      // sort by likes in descending order (most likes first)
      return updatedList.sort((a, b) => b.likes - a.likes);
    });
  };

  return (
    <div>
      {message && <ErrorNoti message={message} />}

      {!user && (
        <form onSubmit={handleLogin}>
          <label htmlFor="">
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label htmlFor="">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submits">login</button>
        </form>
      )}

      {user && (
        <div>
          <button onClick={() => console.log(user.token)}>click</button>
          <p>{user.user.name || "user"} logged in</p>
          <button onClick={handleLogout}>logout</button>
        </div>
      )}
      <h2>blogs</h2>
      <div style={showVissibity}>
        <button onClick={() => setVissible(false)}>create new blog</button>
      </div>
      <div style={hideVissibility}>
        <BlogForm
          handleCreatePost={handleCreatePost}
          title={formData.title}
          author={formData.author}
          url={formData.url}
          handleChange={handleChange}
        />
      </div>
      <button onClick={() => setVissible(true)}>cancel</button>
      {blogs.map((blog) => (
        <div key={blog.id || blog._id}>
          {/* <h1>{blog.url}</h1> */}
          <Blog blog={blog} onUpdate={handleUpdateBlog} />
        </div>
      ))}
    </div>
  );
};

export default App;

import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService, { baseUrl } from "./services/blogs";
import axios from "axios";
import ErrorNoti from "./components/ErrorNoti";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const newObject = { title, author, url };
  const [message, setMessage] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs.data));
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
      blogService.setToken(request.data.token);
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
        blogService.setToken(user.token);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleCreatePost = (e) => {
    e.preventDefault();
    try {
      blogService.createBlog(newObject).then((response) => {
        setBlogs((prevBlogs) => [...prevBlogs, response.data]);
        setMessage("New blog successfully posted");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      });
      setTitle("");
      setAuthor("");
      setUrl("");
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
      <form onSubmit={handleCreatePost}>
        <label>
          title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          author
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </label>
        <label>
          url:
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
        <button>submit</button>
      </form>
      {blogs.map((blog) => (
        <div key={blog.id || blog._id}>
          {/* <h1>{blog.url}</h1> */}
          <Blog blog={blog} />
        </div>
      ))}
    </div>
  );
};

export default App;

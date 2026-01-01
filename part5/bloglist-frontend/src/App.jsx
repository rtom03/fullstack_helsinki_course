import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import {
  baseUrl,
  createBlog,
  deleteBlog,
  getAll,
  setToken,
  updateBlog,
} from "./services/blogs";
import axios from "axios";
import ErrorNoti from "./components/ErrorNoti";
import BlogForm from "./components/BlogForm";
import SuccessNoti from "./components/SuccessNoti";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [hide, setHide] = useState({});
  const [formData, setFormData] = useState({ title: "", author: "", url: "" });

  const handleView = (id) => {
    setHide((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    getAll().then((blogs) => setBlogs(blogs.data));
    // setMessage("New blog successfully posted");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${baseUrl}/login`,
        {
          username,
          password,
        },
        { withCredentials: true }
      );
      console.log(response);
      setUser(response.data);
      setMessage(response.data.message);
      setTimeout(() => {
        setMessage("");
      }, 3000);
      window.localStorage.setItem("user", JSON.stringify(response.data));
      // console.log(user.name);
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
        setUser(user);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("user");
  };

  const handleLikes = (blog) => {
    try {
      const updateLike = { likes: blog.likes++ };
      updateBlog(blog.id, updateLike).then((response) => {
        handleUpdateBlog(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = (blog) => {
    try {
      window.confirm("are you sure you want to delete this item?");
      deleteBlog(blog.id)
        .then(() => getAll())
        .then((blogs) => setBlogs(blogs.data));
      setMessage("Item deleted successfully");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.log(error);
      setMessage("an error occured while deleting item");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  const handleUpdateBlog = (updatedBlog) => {
    setBlogs((prevBlogs) => {
      const updatedList = prevBlogs.map((b) =>
        b.id === updatedBlog.id ? updatedBlog : b
      );
      return updatedList.sort((a, b) => b.likes - a.likes);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
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

  return (
    <div>
      {message && <SuccessNoti message={message} />}
      {!user && (
        <LoginForm
          handleLogin={handleLogin}
          setUsername={setUsername}
          username={username}
          setPassword={setPassword}
          password={password}
        />
      )}
      {user && (
        <div>
          <p>{user.user.name || "user"} logged in</p>
          <button onClick={handleLogout}>logout</button>
          <div>
            <h2>blogs</h2>
            <Togglable>
              <BlogForm
                handleChange={handleChange}
                handleCreatePost={handleCreatePost}
                title={formData.title}
                author={formData.author}
                url={formData.url}
              />
            </Togglable>
            {blogs.map((blog) => (
              <div key={blog.id}>
                <Blog
                  blog={blog}
                  handleLikes={() => {
                    handleLikes(blog);
                  }}
                  handleRemove={() => {
                    handleRemove(blog);
                  }}
                  handleView={() => handleView(blog.id)}
                  view={!hide[blog.id]}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

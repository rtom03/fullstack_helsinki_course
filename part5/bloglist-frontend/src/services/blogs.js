import axios from "axios";
export const baseUrl = "http://localhost:8000/api";

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
  return newToken;
};

const getAll = async () => {
  const request = axios.get(`${baseUrl}/blogs`);
  return request.then((response) => response.data);
};

const createBlog = (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.post(`${baseUrl}/create-blog`, newObject, config);
  return request.then((response) => response.data);
};

const updateBlog = (id, newObject) => {
  const request = axios.put(`${baseUrl}/update-blog/${id}`, newObject);
  return request.then((response) => response.data);
};

const deleteBlog = (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.delete(`${baseUrl}/delete-blog/${id}`, config);
  return request.then((response) => response.data);
};

export { getAll, createBlog, setToken, updateBlog, deleteBlog };

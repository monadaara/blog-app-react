import http from "./http";

const apiEndpoint = "posts";

const getAllPost = async () => {
  const { data } = await http.get(apiEndpoint);
  console.log("data", data.data);
  return data.data;
};

const getBlog = async (id) => {
  const { data } = await http.get(`${apiEndpoint}/${id}`);
  return data.data;
};
const getMyBlogs = async () => {
  const { data } = await http.get(`${apiEndpoint}/me`);

  return data.data;
};

const getReletedBlogs = (tag) => {
  return http.get(`tags?tag=${tag}`);
};

const getTags = () => {
  return http.get(`tags`);
};

const createBlog = (formData) => {
  return http.post(apiEndpoint, formData);
};
const updateBlog = (id, formData) => {
  return http.put(`${apiEndpoint}/${id}`, formData);
};

const deleteBlog = (id) => {
  return http.delete(`${apiEndpoint}/${id}`);
};

export default {
  deleteBlog,
  updateBlog,
  getAllPost,
  getReletedBlogs,
  getBlog,
  createBlog,
  getTags,
  getMyBlogs,
};

import http from "./http";

const apiEndpoint = "posts";

const getAllPost = () => {
  return http.get(apiEndpoint);
};

const getBlog = (id) => {
  return http.get(`${apiEndpoint}/${id}`);
};
const getMyBlogs = () => {
  return http.get(`${apiEndpoint}/me`);
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

export default {
  getAllPost,
  getReletedBlogs,
  getBlog,
  createBlog,
  getTags,
  getMyBlogs,
};

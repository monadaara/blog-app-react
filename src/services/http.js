import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000/api/";

const setjwt = (jwt) => {
  axios.defaults.headers.common["x-auth-token"] = jwt;
};

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setjwt,
};

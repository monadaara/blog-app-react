import http from "./http";

const apiEndPoint = "users";

export const register = async (data) => {
  return http.post(apiEndPoint, {
    name: data.name,
    email: data.email,
    password: data.password,
    profile: data.profile,
  });
};

export default {
  register,
};

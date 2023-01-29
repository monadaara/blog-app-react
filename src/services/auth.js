import http from "./http";
import jwtDecode from "jwt-decode";

const apiEndPoint = "/auth";
const token = "token";

http.setjwt(getJwt());

export const login = async (data) => {
  const { data: jwt } = await http.post(apiEndPoint, {
    email: data.email,
    password: data.password,
  });

  if (jwt) {
    localStorage.setItem(token, jwt.data);
  }
};

export const loginWithJwt = (jwt) => {
  localStorage.setItem(token, jwt);
};

export function getJwt() {
  return localStorage.getItem(token);
}

export const getCurrentUser = async () => {
  try {
    const { data } = await http.get(`users/me`);
    return data.data;
  } catch (error) {
    return error;
  }
};
export const authUser = () => {
  const jwt = localStorage.getItem(token);
  return jwtDecode(jwt);
};

export default {
  getJwt,
  login,
  getJwt,
  loginWithJwt,
  getCurrentUser,
  authUser,
};

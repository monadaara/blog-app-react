import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Signup from "./components/Signup";

import Login from "./components/Login";
import Profile from "./components/Profile";
import User from "./components/User";
import Blogs from "./components/Blogs";
import auth from "./services/auth";
import Picture from "./components/Picture";
import blog from "./services/blog";
import Blog from "./components/Blog";
import Spinner from "./components/common/Spinner";
import Footer from "./components/Footer";
import NewBlogForm from "./components/NewBlogForm";
import Tags from "./components/Tags";
import FilterByTag from "./components/FilterByTag";
import About from "./components/About";
import PrivateRoute from "./components/common/PrivateRoute";

function App(props) {
  const [currentUser, setCurrentUser] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [loading, setloading] = useState(false);

  const getCurrentUser = async () => {
    try {
      const { data } = await auth.getCurrentUser();
      setCurrentUser(data.data);
    } catch (error) {
      return error;
    }
  };

  const getAllBlogs = async () => {
    try {
      setloading(true);
      const { data } = await blog.getAllPost();
      setBlogs(data.data);
      setloading(false);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getCurrentUser();
    getAllBlogs();
  }, []);

  if (loading) return <Spinner loading={loading} />;

  return (
    <>
      <Routes>
        <Route path="/" element={<NavBar currentUser={currentUser} />}>
          <Route index element={<Home blogs={blogs} setBlogs={setBlogs} />} />
          <Route
            path="user"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          >
            <Route index element={<User currentUser={currentUser} />} />
            <Route path="blogs" element={<Blogs />} />
            <Route
              path="profile"
              element={<Picture currentUser={currentUser} />}
            />
          </Route>
          <Route
            path="blog/:id"
            element={
              <PrivateRoute>
                <Blog />
              </PrivateRoute>
            }
          />
          <Route
            path="new-blog"
            element={
              <PrivateRoute>
                <NewBlogForm />
              </PrivateRoute>
            }
          />
          <Route path="tags" element={<Tags />} />
          <Route path="tags/:tag" element={<FilterByTag />} />
          <Route path="about" element={<About />} />
        </Route>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

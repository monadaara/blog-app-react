import React from "react";
import { Route, Routes } from "react-router-dom";
import { useQuery } from "react-query";
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
import ScrollToTop from "./components/ScrollToTop";
import UpdateBlog from "./components/UpdateBlog";

function App(props) {
  const user = useQuery("user", auth.getCurrentUser);
  const blogs = useQuery("allBlogs", blog.getAllPost);

  if (blogs.isLoading) return <Spinner loading={true} />;
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<NavBar currentUser={user} />}>
          <Route index element={<Home blogs={blogs} />} />
          <Route
            path="user"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          >
            <Route index element={<User currentUser={user} />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="profile" element={<Picture currentUser={user} />} />
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
          <Route
            path="update-blog/:blogId"
            element={
              <PrivateRoute>
                <UpdateBlog />
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

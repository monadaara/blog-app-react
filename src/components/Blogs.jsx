import React, { useState, useEffect } from "react";
import blog from "../services/blog";
import BlogCard from "./BlogCard";

function Blogs(props) {
  const [blogs, setBlogs] = useState([]);

  const getData = async () => {
    try {
      const { data } = await blog.getMyBlogs();
      setBlogs(data.data);
    } catch (error) {}
  };
  useEffect(() => {
    getData();
  }, []);

  console.log(blogs);

  return (
    <div className=" grid grid-cols-1  md:grid-cols-2 gap-10 px-10 py-10 ">
      <BlogCard blogs={blogs} />
    </div>
  );
}

export default Blogs;

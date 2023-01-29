import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import blog from "../services/blog";
import BlogCard from "./BlogCard";

function Blogs(props) {
  // fetching data using useQuery
  const blogs = useQuery("myblogs", blog.getMyBlogs);

  return (
    <div className=" grid grid-cols-1  md:grid-cols-2 gap-10 px-10 py-10 ">
      <BlogCard blogs={blogs} />
    </div>
  );
}

export default Blogs;

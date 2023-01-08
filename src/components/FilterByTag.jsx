import React, { useState, useEffect } from "react";
import blog from "../services/blog";
import { useParams } from "react-router-dom";
import BlogCard from "./BlogCard";
function FilterByTag(props) {
  const [blogs, setBlogs] = useState([]);

  const params = useParams();

  const getData = async (tag) => {
    try {
      const { data } = await blog.getReletedBlogs(tag);
      setBlogs(data);
    } catch (error) {}
  };
  useEffect(() => {
    getData(params.tag);
  }, []);

  return (
    <div className="px-5 py-5  lg:px-40 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
      <BlogCard blogs={blogs} />
    </div>
  );
}

export default FilterByTag;

import React from "react";
import { Link } from "react-router-dom";

function BlogCard({ blogs }) {
  console.log("melkel", blogs);
  return (
    blogs &&
    blogs.map((blog) => (
      <div className=" w-1/1" key={blog._id}>
        <Link to={`/blog/${blog._id}`}>
          <img className=" w-full rounded-2xl" src={blog.cover.url} alt="" />
        </Link>
        <div className=" flex gap-4 my-1">
          {blog.tags.map((tag) => (
            <Link
              to={"/tags/" + tag}
              className=" bg-slate-300 text-violet font-semibold rounded-full   py-1 px-3 text-xs"
              key={tag}
            >
              {tag}
            </Link>
          ))}
        </div>
        <h1 className=" mb-2 font-bold text-xl hover:underline cursor-pointer">
          {blog.title}
        </h1>
        <p className=" text-justify"> {blog.summary}</p>
      </div>
    ))
  );
}

export default BlogCard;

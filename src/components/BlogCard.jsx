import React from "react";
import { Link } from "react-router-dom";

function BlogCard({ blogs }) {
  return (
    blogs &&
    blogs.map((blog) => (
      <div className=" w-1/1" key={blog._id}>
        <Link
          to={`/blog/${blog._id}`}
          className=" group block rounded-2xl  overflow-hidden relative"
        >
          <img
            className=" w-full rounded-2xl transition ease-in-out  group-hover:scale-125  "
            src={blog.cover.url}
            alt=""
          />
          <div className=" group-hover:absolute group-hover:top-0 w-full h-full group-hover:bg-violet group-hover:opacity-50"></div>
        </Link>
        <div className=" flex gap-1 sm:gap-3 my-1">
          {blog.tags.map((tag) => (
            <Link
              to={"/tags/" + tag}
              className=" bg-slate-300 text-violet font-normal rounded-full   py-1 px-3 text-xs"
              key={tag}
            >
              {tag}
            </Link>
          ))}
        </div>
        <h1 className=" mb-2 font-bold text-lg hover:underline cursor-pointer">
          {blog.title}
        </h1>
        <p className=" text-justify truncate text-sm"> {blog.summary}</p>
        <p className="mt-2 text-xs">by {blog.user.name}</p>
      </div>
    ))
  );
}

export default BlogCard;

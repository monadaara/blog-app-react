import React from "react";
import { Link } from "react-router-dom";

function NewBlog(props) {
  return (
    <div className=" my-10 flex items-center justify-center">
      <Link
        to={"new-blog"}
        className=" block w-1/2 bg-spring 
         py-3 text-lg px-3 rounded-lg text-center hover:ring-2 hover:ring-violet hover:ring-offset-2 "
      >
        Add new Blog
      </Link>
    </div>
  );
}

export default NewBlog;

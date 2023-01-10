import React from "react";
import { Link } from "react-router-dom";

function NewBlog(props) {
  return (
    <form className=" my-10 flex items-center justify-center">
      <input
        placeholder="Search"
        className=" block w-1/2 
         py-3 text-lg px-3 rounded-lg border border-slate-400  "
      />
    </form>
  );
}

export default NewBlog;

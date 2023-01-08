import React from "react";

function SearchBlog(props) {
  return (
    <form className=" my-10 text-center">
      <input
        type="text"
        placeholder="search a blog..."
        className=" w-1/2 border 
              border-slate-400
         py-3 text-lg px-3 rounded-lg"
      />
    </form>
  );
}

export default SearchBlog;

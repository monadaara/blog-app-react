import React from "react";
import AllBlogs from "./AllBlogs";
import SearchBlog from "./SearchBlog";
import NewBlog from "./NewBlog";

function Home({ blogs }) {
  return (
    <div className="px-5 py-5  lg:px-40">
      <NewBlog />
      <AllBlogs blogs={blogs} />
    </div>
  );
}

export default Home;

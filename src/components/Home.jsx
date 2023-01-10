import React, { useState } from "react";
import AllBlogs from "./AllBlogs";

function Home({ blogs, setBlogs }) {
  const [search, setSeach] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (search) {
      const result = blogs.filter((blog) =>
        blog.title.toLowerCase().startsWith(search)
      );
      setBlogs(result);
    } else {
      window.location = "/";
    }
    setSeach("");
  };

  return (
    <div className="px-5 py-5  lg:px-40">
      <form
        onSubmit={handleSubmit}
        action=""
        className=" my-10 flex items-center justify-center"
      >
        <input
          value={search}
          onChange={(e) => setSeach(e.target.value)}
          placeholder="Search"
          className=" block w-1/2 
         py-3 text-lg px-3 rounded-lg border border-slate-600  "
        />
      </form>
      <AllBlogs blogs={blogs} />
    </div>
  );
}

export default Home;

import React, { useState, useEffect } from "react";
import AllBlogs from "./AllBlogs";

function Home({ blogs }) {
  const [search, setSeach] = useState("");
  const [filtered, setFiltered] = useState(blogs);

  useEffect(() => {
    if (search) {
      const result = filtered.filter((blog) =>
        blog.title.toLowerCase().startsWith(search)
      );

      setFiltered(result);
    } else {
      setFiltered(blogs);
    }
  }, [search]);

  return (
    <div className="px-5 py-5  lg:px-40">
      <form action="" className=" my-10 flex items-center justify-center">
        <input
          value={search}
          onChange={(e) => setSeach(e.target.value)}
          placeholder="Search"
          className=" block w-1/2 
         py-3 text-lg px-3 rounded-lg border border-slate-600  "
        />
      </form>
      <AllBlogs blogs={filtered} />
    </div>
  );
}

export default Home;

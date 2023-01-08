import React, { useState, useEffect } from "react";

import BlogCard from "./BlogCard";

function AllBlogs({ blogs }) {
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
      <BlogCard blogs={blogs} />
    </div>
  );
}

export default AllBlogs;

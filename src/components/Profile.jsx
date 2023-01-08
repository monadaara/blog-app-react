import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function Profile(props) {
  return (
    <div className=" bg-slate-300 h-full pb-20">
      <div className=" flex  gap-10 items-start   px-40 py-5">
        <div className=" w-1/4 flex justify-start flex-col gap-4 text-lg bg-white shadow-md rounded-md px-5 py-10">
          <NavLink className={""} to={""}>
            personal info
          </NavLink>
          <NavLink to={"/user/profile"}>Profile</NavLink>
          <NavLink to={"/user/blogs"}>Blogs</NavLink>
        </div>
        <div className=" flex-1 col-span-2 shadow-md bg-white rounded-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Profile;

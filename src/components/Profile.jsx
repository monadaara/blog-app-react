import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function Profile(props) {
  const logout = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };
  return (
    <div className=" bg-slate-300 h-full pb-20">
      <div className=" sm:flex  sm:gap-10 sm:items-start   lg:px-40 px-5 py-5">
        <div className=" sm:w-1/4 w-full mb-10 sm:mb-0 flex justify-start flex-col gap-4 text-lg bg-white shadow-md rounded-md px-5 py-10">
          <NavLink className={""} to={""}>
            personal info
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "text-spring" : "")}
            to={"/user/profile"}
          >
            Profile
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "text-spring" : "")}
            to={"/user/blogs"}
          >
            Blogs
          </NavLink>
          <button
            onClick={logout}
            className=" bg-red-500 text-white px-3 rounded-md py-2"
          >
            Logout
          </button>
        </div>
        <div className=" flex-1 col-span-2 shadow-md bg-white rounded-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Profile;

import React from "react";
import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";

function NavBar({ currentUser }) {
  //
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <>
      <div className=" bg-violet flex  justify-between items-center px-5 py-5  lg:px-40">
        <div className=" font-pacifico font-medium text-xl  text-spring sm:text-3xl">
          <Link to={"/"}>Blogger</Link>
        </div>
        <div className="flex gap-2 justify-between items-center lg:gap-10 sm:text-lg">
          <NavLink
            className={
              " text-white hover:bg-spring px-3 py-1 rounded-sm hover:text-violet"
            }
            to={"/"}
          >
            Home
          </NavLink>
          <NavLink
            className={
              " text-white hover:bg-spring px-3 py-1 rounded-sm hover:text-violet"
            }
            to={"/tags"}
          >
            Tags
          </NavLink>
          <NavLink
            className={
              " text-white hover:bg-spring px-3 py-1 rounded-sm hover:text-violet"
            }
            to={"/about"}
          >
            About
          </NavLink>
        </div>
        {currentUser && Object.keys(currentUser) == 0 ? (
          <div className="flex justify-between items-center gap-4 sm:gap-10 sm:text-lg">
            <button className=" text-spring">
              <Link to={"/register"}>Signup</Link>
            </button>
            <button className=" bg-spring px-3 py-1 text-violet rounded-sm sm:px-10 sm:py-2 sm:rounded-md">
              <Link to={"/login"}>Login</Link>
            </button>
          </div>
        ) : (
          <div className=" flex justify-between gap-4">
            <Link to={"user"}>
              <img
                className=" w-10 rounded-full"
                src={currentUser && currentUser.profile.url}
                alt=""
              />
            </Link>
            <button
              className="bg-spring px-3 py-1 text-violet rounded-sm sm:px-10 sm:py-2 sm:rounded-md"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default NavBar;

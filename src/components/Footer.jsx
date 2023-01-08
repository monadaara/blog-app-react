import React from "react";
import { Link } from "react-router-dom";
import { BsTwitter, BsGithub, BsFacebook } from "react-icons/bs";

function Footer(props) {
  const navigate = (url) => {
    window.open(url);
  };
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3   place-items-center sm:gap-10 sm:divide-x sm:divide-slate-200 mt-5 bg-violet tetx-white h-96 ">
      <div className=" font-pacifico font-medium text-5xl  text-spring">
        <Link to={"/"}>Blogger</Link>
      </div>
      <div className=" flex gap-5 sm:flex-col pl-5 text-white text-2xl ">
        <Link to={"/"}>Home</Link>
        <Link to={"/"}>Tags</Link>
        <Link to={"/"}>Contact</Link>
      </div>
      <div className=" text-2xl pl-5 flex gap-5 sm:flex-none">
        <BsGithub
          className=" text-spring my-4 block"
          onClick={() => navigate("https://github.com/DevNadaara")}
        />

        <BsFacebook
          className=" text-spring my-4 block"
          onClick={() => navigate("https://twitter.com/Dev_Nadaara")}
        />

        <BsTwitter
          className=" text-spring my-4 block"
          onClick={() => navigate("https://github.com/DevNadaara")}
        />
      </div>
    </div>
  );
}

export default Footer;

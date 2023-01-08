import React from "react";
import banner from "../assets/banner.webp";

function About(props) {
  return (
    <div className="px-5 py-5  lg:px-40 relative">
      <img
        src={banner}
        className=" w-full h-72 object-cover rounded-lg relative "
        alt=""
      />
      <h1 className=" absolute font-pacifico top-32 right-96 z-10 text-5xl text-violet ">
        About us
      </h1>
      <div className=" grid grid-cols-1 mt-5 divide-y-2">
        <p className=" py-3">Mohamed Abdirahman Ahmed C119704</p>
        <p className=" py-3">Yahye Mohamed Abdi C119011</p>
        <p className=" py-3">Sabirin Ali mohamed C119007</p>
        <p className=" py-3">Maxamed said maxamed C119046</p>
        <p className=" py-3">Zahra abdi daahir c118618</p>
        <p className=" py-3">Abdinuur Ibrahim ahmed C119734</p>
      </div>
    </div>
  );
}

export default About;

import React from "react";
import Joi from "joi";

function User({ currentUser }) {
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    name: Joi.string().min(3).max(20).required(),
    password: Joi.string().required(),
  });

  const doSubmit = async () => {};
  return (
    <form action="" className="px-5 py-10">
      <h1 className=" text-lg mb-4">Personal Info</h1>
      <div className="mb-4">
        <input
          className=" border  border-slate-400 w-full px-2 py-3 rounded-sm"
          type="text"
          value={currentUser && currentUser.name}
        />
      </div>
      <div className="mb-4">
        <input
          disabled={true}
          className="  border border-slate-400 w-full px-2 py-3 rounded-sm"
          type="email"
          value={currentUser && currentUser.email}
        />
      </div>

      <div className=" flex justify-end">
        <button
          className=" bg-spring px-10 rounded-md py-2 text-violet"
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default User;

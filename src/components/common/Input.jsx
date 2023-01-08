import React, { useContext, useEffect } from "react";
import { FormContext } from "./FomContext";

function Input({ type = "text", label, name, placeholder }) {
  const { formData, handleChange, formError } = useContext(FormContext);
  useEffect(() => {}, [formData]);
  return (
    <div className=" mt-5">
      <label className=" block mb-1" htmlFor="name">
        {label}
      </label>
      <input
        className={`w-full border ${
          formError && formError[name] ? "border-red-400" : "border-slate-400"
        }  py-3 text-lg px-3 rounded`}
        name={name}
        type={type}
        value={formData[name]}
        onChange={(e) => handleChange(e)}
        placeholder={placeholder}
      />
      {formError && (
        <span className=" text-red-500 text-xs">{formError[name]}</span>
      )}
    </div>
  );
}

export default Input;

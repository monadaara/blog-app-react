import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FormContext } from "./FomContext";

function Form({
  children,
  initialValues,
  btnLabel,
  path,
  schema,
  doSubmit,
  loading,
  setLoading,
  loginError,
}) {
  const [formData, setFormData] = useState(initialValues);
  const [formError, setFormError] = useState();

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errors = {};
    const { error } = schema.validate(formData, { abortEarly: false });

    if (!error) return null;

    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //validation

    const errors = validate();
    setFormError(errors || {});

    if (errors) return;

    ///submit

    doSubmit(formData);
    if (Object.keys(loginError)) setFormError(loginError);
  };

  return (
    <FormContext.Provider value={{ formData, handleChange, formError }}>
      <form
        onSubmit={handleSubmit}
        className=" shadow-lg bg-white rounded-md px-7 py-5 w-96 mt-1"
      >
        {children}

        <button
          disabled={loading}
          className=" bg-spring w-full mt-4 py-3 text-lg rounded"
          type="submit"
        >
          {btnLabel}
        </button>
        {path === "login" ? (
          <h1 className="my-1">
            I've an account{" "}
            <Link className="text-spring" to={"/login"}>
              {path}
            </Link>{" "}
          </h1>
        ) : (
          <h1 className="my-1">
            I havn't got an account{" "}
            <Link className="text-spring" to={"/register"}>
              {path}
            </Link>{" "}
          </h1>
        )}
      </form>
    </FormContext.Provider>
  );
}

export default Form;

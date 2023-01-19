import React, { useState, useEffects, CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import Form from "./common/Form";
import Input from "./common/Input";
import { register } from "./../services/register";
import auth from "./../services/auth";
import HashLoader from "react-spinners/HashLoader";

function Signup(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const initialValues = {
    name: "",
    email: "",
    password: "",
    profile:
      "https://res.cloudinary.com/nadaara/image/upload/v1672437616/profiles/avatar_unut5y.jpg",
  };

  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    name: Joi.string().min(3).max(20).required(),
    password: Joi.string().required(),
    profile: Joi.string(),
  });

  const doSubmit = async (formData) => {
    try {
      setLoading(true);
      const response = await register(formData);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      setLoading(false);
      window.location = "/";
    } catch (error) {
      return error;
    }
  };

  return (
    <div className=" flex justify-center flex-col items-center min-h-screen bg-yellow-50">
      <Form
        btnLabel="Register"
        initialValues={initialValues}
        schema={schema}
        doSubmit={doSubmit}
        path="login"
        loading={loading}
        setLoading={setLoading}
      >
        <div className=" font-pacifico font-medium   text-violet text-center text-3xl my-3">
          Blogger
        </div>
        <Input placeholder={"fullname"} label="name" name={"name"} />
        <Input
          placeholder={"nadaara@gmail.com"}
          label="Email"
          name={"email"}
          type="email"
        />
        <Input
          placeholder={"password"}
          label="Password"
          name={"password"}
          type="password"
        />
      </Form>
    </div>
  );
}

export default Signup;

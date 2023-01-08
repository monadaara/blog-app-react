import React, { useState } from "react";
import Joi from "joi";
import Form from "./common/Form";
import Input from "./common/Input";
import auth from "../services/auth";
import { useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";

function Login(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const initialValues = {
    email: "",
    password: "",
  };
  const errors = {};

  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: Joi.string().min(5).max(10),
  });

  const doSubmit = async (formData) => {
    try {
      setLoading(true);
      await auth.login(formData);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      const { data } = error.response;
      errors.email = data;
      errors.password = data;
    }
  };
  return (
    <div className=" flex justify-center flex-col items-center h-screen bg-yellow-50">
      <HashLoader
        color={"#64F58D"}
        loading={loading}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <Form
        btnLabel="Login"
        initialValues={initialValues}
        schema={schema}
        doSubmit={doSubmit}
        path="register"
        loginError={errors}
      >
        <div className=" font-pacifico font-medium   text-violet text-center text-3xl my-3">
          Blogger
        </div>
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

export default Login;

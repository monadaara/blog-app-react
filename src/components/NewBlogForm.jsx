import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FormContext } from "./common/FomContext";
import Input from "./common/Input";
import Joi from "joi";
import HashLoader from "react-spinners/HashLoader";

import blog from "../services/blog";

const schema = Joi.object({
  title: Joi.string().min(3).required(),
  summary: Joi.string().min(3).required(),
  tags: Joi.string().max(60).required(),
  body: Joi.string().required(),
  cover: Joi.string(),
});

function NewBlogForm(props) {
  const [formData, setFormData] = useState({
    title: "",
    tags: [],
    summary: "",
    body: "",
    cover: "",
  });

  const [formError, setFormError] = useState();
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    console.log("file", target);

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const doSubmit = async (formData) => {
    try {
      setLoading(true);
      await blog.createBlog(formData);
      setLoading(false);
      navigate("/");
    } catch (error) {
      return error;
    }
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
  };
  return (
    <FormContext.Provider value={{ formData, handleChange, formError }}>
      <HashLoader
        color={"#64F58D"}
        loading={loading}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <form onSubmit={handleSubmit} className="px-5 py-5  lg:px-40">
        <Input placeholder="title" name="title" label={"Title"} />
        <Input
          placeholder="tags separated by space"
          name="tags"
          label={"Tags"}
        />
        <div className=" mt-5">
          <CKEditor
            editor={ClassicEditor}
            data={formData.body}
            onChange={(event, editor) => {
              const data = editor.getData();
              setFormData((prev) => ({ ...prev, body: data }));
            }}
          />
        </div>
        <Input placeholder="summary" name="summary" label={"Summary"} />
        <Input type="file" name="cover" label={"Picture"} />

        <button
          className=" bg-spring w-full mt-4 py-3 text-lg rounded"
          type="submit"
        >
          Save
        </button>
      </form>
    </FormContext.Provider>
  );
}

export default NewBlogForm;

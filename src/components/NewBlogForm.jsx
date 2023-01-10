import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  cover: Joi.object().required(),
});

function NewBlogForm(props) {
  const [formData, setFormData] = useState({
    title: "",
    tags: "",
    summary: "",
    body: "",
    cover: null,
  });

  const [formError, setFormError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    if (name !== "cover") {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (target.files)
      setFormData((prev) => ({ ...prev, cover: target.files[0] }));
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

    const data = new FormData();

    data.append("title", formData.title);
    data.append("tags", formData.tags.trim());
    data.append("summary", formData.summary);
    data.append("cover", formData.cover);
    data.append("body", formData.body);
    doSubmit(data);
  };

  // console.log(formData);
  return (
    <FormContext.Provider
      className=" flex flex-col items-center"
      value={{ formData, handleChange, formError }}
    >
      <div className=" absolute bottom-1 left-60 z-10">
        <HashLoader
          color={"#0C0A3E"}
          loading={loading}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="px-5 py-5  lg:px-40 relative"
      >
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
        <div className="mt-5">
          <label className=" block mb-1" htmlFor="cover">
            Picture
          </label>
          <input
            className="py-3 text-lg px-3 rounded border-slate-400"
            type="file"
            name="cover"
            onChange={(e) => handleChange(e)}
            label={"Picture"}
          />
          {formError && (
            <span className=" text-red-500 text-xs">{formError.cover}</span>
          )}
        </div>

        <button
          disabled={loading}
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

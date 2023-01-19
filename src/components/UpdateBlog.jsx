import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FormContext } from "./common/FomContext";
import Input from "./common/Input";
import Joi from "joi";
import HashLoader from "react-spinners/HashLoader";

import blog from "../services/blog";
import Spinner from "./common/Spinner";

const schema = Joi.object({
  title: Joi.string().min(3).required(),
  summary: Joi.string().min(3).required(),
  tags: Joi.string().max(60).required(),
  body: Joi.string().required(),
});

function UpdateBlog(props) {
  const [formData, setFormData] = useState({
    title: "",
    tags: "",
    summary: "",
    body: "",
  });

  const [formError, setFormError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { blogId } = useParams();

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getData = async (id) => {
    try {
      setLoading(true);
      const { data } = await blog.getBlog(id);
      setFormData({
        title: data.data.title,
        summary: data.data.summary,
        body: data.data.body,
        tags: data.data.tags.join(","),
      });
      setLoading(false);
    } catch (error) {}
  };

  const doSubmit = async (blogId, formData) => {
    try {
      setLoading(true);
      await blog.updateBlog(blogId, formData);
      setLoading(false);
      window.location = "/";
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

    console.log("called");
    doSubmit(blogId, formData);
  };

  useEffect(() => {
    getData(blogId);
  }, []);
  console.log(formData);
  if (loading) <Spinner loading={loading} />;

  return (
    <FormContext.Provider
      className=" flex flex-col items-center relative"
      value={{ formData, handleChange, formError }}
    >
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
        <div className=" absolute bottom-8 left-60 z-10">
          <HashLoader
            color={"#0C0A3E"}
            loading={loading}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
        <button
          disabled={loading}
          className=" bg-spring w-full mt-4 py-3 text-lg rounded"
          type="submit"
        >
          Update
        </button>
      </form>
    </FormContext.Provider>
  );
}

export default UpdateBlog;

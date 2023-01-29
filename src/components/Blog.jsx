import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import parse from "html-react-parser";
import moment from "moment/moment";
import { Link, useParams, useNavigate } from "react-router-dom";
import blog from "../services/blog";
import auth from "../services/auth";
import HashLoader from "react-spinners/HashLoader";
import Spinner from "./common/Spinner";

function Blog(props) {
  const params = useParams();
  const token = auth.authUser();

  const article = useQuery(["blog", params.id], () => blog.getBlog(params.id));

  const handleDelete = async (id) => {
    await blog.deleteBlog(id);

    window.location = "/";
  };

  if (article.isLoading) return <Spinner loading={true} />;
  return (
    <div className="px-5 py-5  lg:px-40 ">
      {article.isSuccess && article.data.title && (
        <div className="">
          <h1 className=" sm:mx-20  text-4xl font-bold leading-normal">
            {" "}
            {article.data.title}
          </h1>
          <p className=" sm:mx-20  text-lg  my-1 italic">
            {article.data.summary}
          </p>
          <div className=" sm:mx-20 flex gap-4 my-3 ">
            {article.data.tags.map((tag) => (
              <Link
                className="bg-slate-200 text-violet font-semibold rounded-full   py-1 px-3 text-xs"
                key={tag}
                to={"/tags/" + tag}
              >
                {tag}
              </Link>
            ))}
          </div>
          <div className="border-b-2 py-2 my-4 sm:mx-20 flex justify-between items-center">
            <div className=" flex items-center justify-start  ">
              <img
                className=" rounded-full w-12"
                src={article.data.user.profile && article.data.user.profile.url}
                alt="pict"
              />
              <div className=" text-sm font-semibold leading-4">
                <span className=" mb-0 p-0 block">
                  {article.data.user.name}
                </span>
                <span className=" mb-0 p-0 block">
                  {article.data.createdAt === article.data.updatedAt
                    ? `${moment(article.data.createdAt).format("MMMM DD YYYY")}`
                    : `${moment(article.data.updatedAt).format(
                        "MMMM DD YYYY"
                      )}`}
                </span>
              </div>
            </div>

            <div>
              <HashLoader
                color={"#64F58D"}
                loading={false}
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>

            {article.data.user.email === token.email && (
              <div>
                <Link
                  className="bg-violet mr-5 text-white px-4 py-2 rounded-md"
                  to={`/update-blog/${article.data._id}`}
                >
                  Update
                </Link>
                <button
                  disabled={false}
                  onClick={() => handleDelete(article.data._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
          <img
            className=" w-full rounded-2xl"
            src={article.data.cover.url}
            alt=""
          />

          <div className="my-10">
            <p>{parse(article.data.body)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Blog;

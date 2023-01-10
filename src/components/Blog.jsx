import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import { Link, useParams } from "react-router-dom";
import blog from "../services/blog";
import moment from "moment/moment";

function Blog(props) {
  const params = useParams();
  const [article, setArticle] = useState({});
  const [releted, setReleted] = useState([]);
  const getData = async (id) => {
    try {
      const { data } = await blog.getBlog(id);
      setArticle(data.data);
    } catch (error) {}
  };

  const getReleted = async () => {
    article &&
      article.tags &&
      article.tags.map(async (tag) => {
        try {
          const { data } = await blog.getReletedBlogs(tag);
          console.log(data);
        } catch (error) {}
      });
  };

  useEffect(() => {
    getData(params.id);
    getReleted();
  }, []);

  console.log(blog);

  return (
    <div className="px-5 py-5  lg:px-40 ">
      {article && article.title && (
        <div className="">
          <h1 className=" sm:ml-28  text-4xl font-bold leading-normal">
            {" "}
            {article.title}
          </h1>
          <p className=" sm:ml-28  text-lg  my-1 italic">{article.summary}</p>
          <div className=" sm:ml-28 flex gap-4 my-3 ">
            {article.tags.map((tag) => (
              <Link
                className="bg-slate-200 text-violet font-semibold rounded-full   py-1 px-3 text-xs"
                key={tag}
                to={"/tags/" + tag}
              >
                {tag}
              </Link>
            ))}
          </div>
          <div className=" flex items-center justify-start sm:ml-28 border-b-2 py-2 my-4">
            <img
              className=" rounded-full w-12"
              src={article.user.profile && article.user.profile.url}
              alt="pict"
            />
            <div className=" text-sm font-semibold leading-4">
              <span className=" mb-0 p-0 block">{article.user.name}</span>
              <span className=" mb-0 p-0 block">
                {article.createdAt === article.updatedAt
                  ? `${moment(article.createdAt).format("MMMM DD YYYY")}`
                  : `${moment(article.updatedAt).format("MMMM DD YYYY")}`}
              </span>
            </div>
          </div>
          <img className=" w-full rounded-2xl" src={article.cover.url} alt="" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            <div className="col-span-2">
              <p>{parse(article.body)}</p>
            </div>
            <div>
              <h1>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
                distinctio voluptatum eos iusto nostrum illum! At sed dolor
                porro officiis blanditiis excepturi quis et asperiores obcaecati
                facilis? Quis, doloremque magni.
              </h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Blog;

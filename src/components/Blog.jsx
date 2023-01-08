import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import { Link, useParams } from "react-router-dom";
import blog from "../services/blog";

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

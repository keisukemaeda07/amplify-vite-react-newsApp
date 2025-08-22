import React from "react";
import { useEffect, useState } from "react";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Article } from "../models/models";
import ArticleItem from "../componets/ArticleItem";
import "../App.css";
import Loading from "../componets/Loading";

const client = generateClient<Schema>();

const HomePage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchHeadLineNews();
  }, []);

  const fetchHeadLineNews = async () => {
    try {
      const result = await fetch(
        "https://ds63nxzwohyrebaxtuaqzzyfwu0guffv.lambda-url.ap-southeast-2.on.aws/"
      );
      if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`);
      }

      const favoriteArticles = (await client.models.Article.list()).data;

      const data = await result.json();
      const filteredArticles = data.articles.filter(
        (article: Article) =>
          !favoriteArticles.some((fav) => fav.title === article.title)
      );
      console.log("action");
      setArticles(filteredArticles);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <h1 className="text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
        Headlines
      </h1>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="py-4 flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl ">
            {articles.map((article, index) => (
              <ArticleItem
                article={article}
                articles={articles}
                setArticles={setArticles}
                key={index}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;

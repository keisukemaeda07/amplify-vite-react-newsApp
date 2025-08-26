import React from "react";
import { useState } from "react";
import SearchForm from "../componets/SearchForm";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Article } from "../models/models";
import Loading from "../componets/Loading";
import ArticleItem from "../componets/ArticleItem";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import SearchOffIcon from "@mui/icons-material/SearchOff";

const client = generateClient<Schema>();

const SearchPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [url, setUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasData, setHasData] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const fetchEveryNews = async () => {
    try {
      setIsLoading(true);
      const result = await fetch(url);
      if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`);
      }

      const favoriteArticles = (await client.models.Article.list()).data;

      const data = await result.json();

      const filteredArticles: Article[] = data.articles.filter(
        (article: Article) =>
          !favoriteArticles.some((fav) => fav.title === article.title)
      );
      if (filteredArticles.length) {
        setHasData(true);
        setArticles(filteredArticles);
      }
    } catch (err) {
      console.error("Error:", err);
      setHasData(false);
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <div className="flex flex-wrap items-center justify-between">
        <h1 className="text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
          Search
        </h1>

        {isVisible ? (
          <button
            onClick={() => setIsVisible(!isVisible)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-blue-500 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <SearchOffIcon />
          </button>
        ) : (
          <button
            onClick={() => setIsVisible(!isVisible)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-blue-500 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <ManageSearchIcon />
          </button>
        )}
      </div>

      {isVisible && (
        <SearchForm setUrl={setUrl} fetchEveryNews={fetchEveryNews} />
      )}

      {isLoading ? (
        <Loading />
      ) : hasData ? (
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
      ) : (
        <div className="flex justify-center p-20">
          <h3 className="text-4xl">No Articles</h3>
        </div>
      )}
    </div>
  );
};

export default SearchPage;

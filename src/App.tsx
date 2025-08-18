import { useEffect, useState } from "react";
// import { useAuthenticator } from "@aws-amplify/ui-react";
// import type { Schema } from "../amplify/data/resource";
// import { generateClient } from "aws-amplify/data";
import { Article } from "./models/models";
import ArticleItem from "./componets/ArticleItem";
import "./App.css";

function App() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetchHeadLineNews();
  }, []);

  const fetchHeadLineNews = async () => {
    const result = await fetch(
      `${import.meta.env.VITE_NEWS_API_URL}?country=us`,
      {
        method: "GET",
        headers: {
          "X-Api-Key": import.meta.env.VITE_NEWS_API_KEY,
        },
      }
    );
    const data = await result.json();
    setArticles(data.articles);
  };

  return (
    <main>
      <h1>News Library</h1>
      <div className="item-box">
        {articles.map((article, index) => (
          <ArticleItem article={article} key={index} />
        ))}
      </div>
    </main>
  );
}

export default App;

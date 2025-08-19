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
    try {
      const result = await fetch(
        "https://ds63nxzwohyrebaxtuaqzzyfwu0guffv.lambda-url.ap-southeast-2.on.aws/"
      );
      if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`);
      }
      const data = await result.json();
      console.log(data);
      setArticles(data.articles);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <main>
      <h1>News Library</h1>
      <div className="p-6 flex justify-center">
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl ">
          {articles.map((article, index) => (
            <ArticleItem article={article} key={index} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;

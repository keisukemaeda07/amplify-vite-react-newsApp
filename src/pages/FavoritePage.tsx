import React from "react";
import { useEffect, useState } from "react";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import FavoriteItem from "../componets/FavoriteItem";

const client = generateClient<Schema>();

const FavoritePage: React.FC = () => {
  const [favoriteArticles, setFavoriteArticles] = useState<
    Array<Schema["Article"]["type"]>
  >([]);

  useEffect(() => {
    client.models.Article.observeQuery().subscribe({
      next: (data) => setFavoriteArticles([...data.items]),
    });
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <h1 className="text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
        Favorite Articles
      </h1>

      <div className="py-4 flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl ">
          {favoriteArticles.map((article, index) => (
            <FavoriteItem
              article={article}
              favoriteArticles={favoriteArticles}
              setFavoriteArticles={setFavoriteArticles}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoritePage;

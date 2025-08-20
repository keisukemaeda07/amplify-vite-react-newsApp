import React from "react";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

interface Props {
  article: Schema["Article"]["type"];
  favoriteArticles: Array<Schema["Article"]["type"]>;
  setFavoriteArticles: React.Dispatch<
    React.SetStateAction<Array<Schema["Article"]["type"]>>
  >;
}

const client = generateClient<Schema>();

const FavoriteItem: React.FC<Props> = ({
  article,
  favoriteArticles,
  setFavoriteArticles,
}: Props) => {
  const onDelete = async (article: Schema["Article"]["type"]) => {
    await deleteFavoriteArticle(article);
    const filtered = favoriteArticles.filter(
      (item: Schema["Article"]["type"]) => item.id !== article.id
    );
    setFavoriteArticles(filtered);
  };

  const deleteFavoriteArticle = async (article: Schema["Article"]["type"]) => {
    const tmp = {
      id: article.id,
    };
    await client.models.Article.delete(tmp);
  };
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex flex-col">
      {article.urlToImage && (
        <img src={article.urlToImage} alt="alt" className="rounded-t-lg" />
      )}

      <div className="p-5 flex flex-col flex-grow">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {article.title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {article.description}
        </p>

        <div className="flex justify-between mt-auto">
          {article.url && (
            <a
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              href={article.url}
            >
              Read more
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          )}
          <button
            onClick={() => onDelete(article)}
            type="button"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteItem;

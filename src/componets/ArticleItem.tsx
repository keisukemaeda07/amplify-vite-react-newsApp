import React from "react";
import { Article } from "../models/models";

interface Props {
  article: Article;
}

const ArticleItem: React.FC<Props> = ({ article }: Props) => {
  return (
    <div className="item">
      <h1>Title</h1>
      <h3>{article.title}</h3>
      <img src={article.urlToImage} alt="alt" style={{ width: "400px" }}></img>
      <h3>URL : </h3>
      <a href={article.url}>Link</a>
    </div>
  );
};

export default ArticleItem;

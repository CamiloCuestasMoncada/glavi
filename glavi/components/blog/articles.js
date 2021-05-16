import { StylesProvider } from "@material-ui/styles";
import React from "react";
import Card from "./card";
import styles from "./blogComponents.module.css";

const Articles = ({ articles }) => {
  return (
    <div className={styles.container_card}>
      <div className={styles.cardContent}>
        {articles.map((articulo) => {
          return <Card article={articulo} key={`article__${articulo.slug}`}/>;
        })}
      </div>
    </div>
  );
};

export default Articles;

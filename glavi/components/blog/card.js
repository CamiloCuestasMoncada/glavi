import React from "react";
import Link from "next/link";
import Images from "./images";
import styles from "./blogComponents.module.css";

const Card = ({ article }) => {
  return (
    <Link as={`/article/${article.slug}`} href="/article/[id]">
      <div className={styles.container_list_card}>
        <a className={styles.linkToArticles}>
          <div className={styles.imageContainer}>
            <div className={styles.image}>
              <Images image={article.image} />
            </div>
            <div className={styles.conatiner_title_article}>
              <p id="category" className="">
                {article.category.name}
              </p>
              <p id="title" className="">
                {article.title}
              </p>
            </div>
          </div>
        </a>
      </div>
    </Link>
  );
};

export default Card;

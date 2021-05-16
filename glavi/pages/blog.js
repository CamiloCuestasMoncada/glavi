import { url } from "./../config/next.config";
import Link from "next/link";
import React from "react";
import Head from "next/head";
import Header from "../components/layout/Header/index";
import Footer from "../components/layout/Footer/index";
import styles from "./../styles/Blog.module.css";
import Article from "../components/layout/Article/index";
import Articles from "../components/blog/articles";
import Layout from "./../components/blog/layout";
import Seo from "../components/blog/seo";
import { fetchAPI } from "../lib/api";

export default function Blog({ articles, categories, homepage }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width = device-width, initial-scale = 1"
        />
        <link rel="icon" type="image/png" href="/favicon.png"></link>
        <title>blog</title>
      </Head>
      <Header />
      <main>
        <div className={styles.titleContainer}>
          <h1 className={styles.blogTittle}>¡Glavi Blog!</h1>
        </div>
        <Layout categories={categories}>
          <Seo seo={homepage.seo} />
          <div className={styles.containerEntrada}>
            <div className={styles.entrada}>
              <Articles articles={articles} />
            </div>
          </div>
        </Layout>
      </main>

      <Footer />
    </>
  );
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [articles, categories, homepage] = await Promise.all([
    fetchAPI("/articles?status=published"),
    fetchAPI("/categories"),
    fetchAPI("/homepage"),
  ]);

  return {
    props: { articles, categories, homepage },
    revalidate: 1,
  };
}

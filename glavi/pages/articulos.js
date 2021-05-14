import React from "react";
import Head from "next/head";
import Header from "../components/layout/Header/index";
import Footer from "../components/layout/Footer/index";
import Article from "../components/layout/Article/index"
import Form from "../components/layout/Form/index";
import Blog from '../components/layout/Article/index';
import Image from "next/image";
import styles from "../styles/Blog.module.css";

export default function articulos() {
  return (
    <div className={styles.backgroundBody}>
      <Head>
        <meta
          name="viewport"
          content="width = device-width, initial-scale = 1"
        />
        <link rel="icon" type="image/png" href="/favicon.png"></link>
        <title>Glavi/blog</title>
      </Head>
      <Header />
      <main >
        <div id={styles.imageContainer}>
        <Image
              src="/isometric_blog.svg"
              alt="Picture of the author"
              width="700"
              height="700"
              
            />
        </div>
      
       <Article/>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}


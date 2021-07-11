/*import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import Layout from "../../components/blog/layout";
import Images from "../../components/blog/images";
import Seo from "../../components/blog/seo";
import { getStrapiMedia } from "../../lib/media";
import ArticleLayout from "./../../components/layout/Article/index";
import Image from "next/image";*/

import { fetchAPI } from "../../../lib/api";
import Header from "../../../components/layout/Header/index";
import Footer from "../../../components/layout/Footer/index";
import styles from "./Resultado.module.css";

const Estate = ({ estate }) => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <div className={styles.titulo__container}>
        <h1 className={styles.titulo}>{estate.titulo}</h1>
      </div>
      <section className={styles.infoGeneral__container}>
        <div className={styles.infoGenral__descripcion__container}>
          <h2>Descripción:</h2>
          <p>{estate.descripcion}</p>
        </div>
        <div className={styles.infoGenral__data}>
          <h2>Información general del inmueble:</h2>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </section>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export async function getStaticPaths() {
  debugger;
  const estates = await fetchAPI("/inmuebles");
  function verificarSlug() {
    return estates.map((estate) => {
      const slugEstate = estate?.slug || "";
      return {
        params: {
          slug: slugEstate,
        },
      };
    });
  }
  return {
    paths: verificarSlug(),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const estates = await fetchAPI(`/inmuebles?slug=${params.slug}`);

  return {
    props: { estate: estates[0] },
    revalidate: 1,
  };
}

export default Estate;

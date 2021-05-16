import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import { fetchAPI } from "../../lib/api";
import Layout from "../../components/blog/layout";
import Images from "../../components/blog/images";
import Seo from "../../components/blog/seo";
import { getStrapiMedia } from "../../lib/media";
import ArticleLayout from "./../../components/layout/Article/index";
import styles from "./../../styles/Blog.module.css";
import Image from "next/image";
import Header from "./../../components/layout/Header/index";
import Footer from "./../../components/layout/Footer/index";

const Article = ({ article, categories }) => {
  const imageUrl = getStrapiMedia(article.image);
  const image2 = getStrapiMedia(article.image2);
  const content = article.content;
  const content2 = article.content2;

  const seo = {
    metaTitle: article.title,
    metaDescription: article.description,
    shareImage: article.image,
    article: true,
  };

  return (
    <div className={styles.backgroundBody}>
      <Header />

      <Layout categories={categories}>
        <Seo seo={seo} />
        <div>
          <div id={styles.imageContainer}>
            <Image
              src="/isometric_blog.svg"
              alt="Picture of the author"
              width="700"
              height="700"
            />
          </div>
          <div>
            <ArticleLayout
              image={article.image}
              image1={article.image}
              image2={article.image2}
              content={content}
              content2={content2}
              portada={article.portada}
              title={article.title}
              description={article.description}
            />
          </div>
        </div>
        <div className="uk-section">
          <div className="uk-container uk-container-small">
            <ReactMarkdown source={article.content} escapeHtml={false} />
            <hr className="uk-divider-small" />
            <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
              <div>
                {article.author.picture && (
                  <Images
                    image={article.author.picture}
                    style={{
                      position: "static",
                      borderRadius: "50%",
                      height: 30,
                    }}
                  />
                )}
              </div>
              <div className="uk-width-expand">
                <p className={styles.name_author}>
                  Escrito por {article.author.name}
                </p>
                <p className={styles.date}>
                  <Moment format="DD MMM YYYY">{article.published_at}</Moment>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export async function getStaticPaths() {
  const articles = await fetchAPI("/articles");

  return {
    paths: articles.map((article) => ({
      params: {
        slug: article.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const articles = await fetchAPI(
    `/articles?slug=${params.slug}&status=published`
  );
  const categories = await fetchAPI("/categories");

  return {
    props: { article: articles[0], categories },
    revalidate: 1,
  };
}

export default Article;

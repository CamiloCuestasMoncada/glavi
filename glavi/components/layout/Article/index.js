import React, { useState, useEffect } from "react";
import styles from "./Article.module.css";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Image from "next/image";
import Images from "../../../components/blog/images";
import ReactMarkdown from 'react-markdown'
/*import { getStrapiMedia2 } from "../../../lib/media";*/
/*import Images from './../../blog/images';*/

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 498,
    borderRadius: 11,
    height: 340,
    backgroundColor: "#ffe6f0ed",
    color: "#575454",
    border: "solid",
    borderWidth: 7,
    borderColor: "#ffffff9c",
  },
  rootContenido: {
    minWidth: 275,
    maxWidth: "97%",
    borderRadius: 11,
    height: "100%",
    backgroundColor: "white",
    color: "#575454",
    border: "solid",
    borderWidth: 7,
    borderColor: "#ffffff9c",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 27,
    fontWeight: 700,
    lineHeight: 1.1,
  },
  pos: {
    marginBottom: 12,
  },
  texto: {
    fontSize: 17,
  },
});

export default function ArticleLayout({
  image,
  image1,
  image2,
  content,
  content2,
  portada,
  title,
  description,
}) {
  /*const imageUrl2 = getStrapiMedia2(props.article);*/
  function Section1({ image1, content }) {
    return (
      <div id={styles.section1Container}>
        <div id={styles.imagenesBlog}>
          <Images
            image={image1}
            style={{
              height: 370,
            }}
          />
        </div>
        <div>
        <ReactMarkdown children={content}/>
          
        </div>
      </div>
    );
  }

  function Section2({ image2, content2 }) {
    return (
      <div id={styles.section2Container}>
        <div>
          <p>{content2}</p>
        </div>
        <div id={styles.imagenesBlog}>
          <Images
            image={image2}
            style={{
              height: 370,
            }}
          />
        </div>
      </div>
    );
  }

  function TarjetaTexto({ image, content, content2 }) {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
      <Card className={classes.rootContenido}>
        <CardContent>
          <div id={styles.sectionsContainer}>
            <Section1 image1={image1} content={content} />
            <Section2 image2={image2} content2={content2} />
          </div>
        </CardContent>
      </Card>
    );
  }

  function Tarjeta() {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            <h1>{title}</h1>
            
          </Typography>
          <Typography variant="h5" component="h2">
            {description}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <div id={styles.blogContainer}>
      <div>
        <div id={styles.contenido}>
          <div id={styles.containerPortada}>
            <Images
              image={portada}
              style={{
                height: "30vw",
              }}
            />
          </div>

          <div id={styles.tarjeta1}>
            <Tarjeta />
          </div>
        </div>
        <div id={styles.bodyContent}>
          <TarjetaTexto image={portada} content={content} content2={content2} />
        </div>
      </div>
    </div>
  );
}

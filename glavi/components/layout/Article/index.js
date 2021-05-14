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
    fontSize: 31,
    fontWeight: 700,
  },
  pos: {
    marginBottom: 12,
  },
  texto: {
    fontSize: 17,
  },
});

export default function Article() {
  useEffect(() => {
    const getEntradasBlog = async () => {
      const resultado = await axios.get(`http://localhost:1337/blogs`);
      const pruebaImagen = await axios.get(`http://localhost:1337/articles`);
     
      console.log(resultado.data);
      setEntradasBlog(resultado.data);
      setPruebas(pruebaImagen.data);
      console.log(pruebaImagen.data);
      console.log(pruebaImagen);
    };
    getEntradasBlog();
  }, []);

  const [entradasBlog, setEntradasBlog] = useState([]);
  const [pruebas, setPruebas] = useState([]);

  function Section1(props) {
    return (
      <div id={styles.section1Container}>
        <div id={styles.imagenesBlog}>
          <img src={props.imagen} alt="" />
        </div>
        <div>
          <p>{props.texto}</p>
        </div>
      </div>
    );
  }

  function Section2(props) {
    return (
      <div id={styles.section2Container}>
        <div>
          <p>{props.texto2}</p>
        </div>
        <div id={styles.imagenesBlog}>
          <img src={props.imagen2} alt="" />
        </div>
      </div>
    );
  }

  function TarjetaTexto(props) {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
      <Card className={classes.rootContenido}>
        <CardContent>
          <div id={styles.sectionsContainer}>
            <Section1 imagen={props.imagen} texto={props.texto} />
            <Section2 imagen2={props.imagen2} texto2={props.texto2}/>
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
            Como mudarte
          </Typography>
          <Typography variant="h5" component="h2">
            Las mejores recomendaciones
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Tips
          </Typography>
          <Typography variant="body2" component="p" className={classes.texto}>
            mudarse........................ ......................
            ...................
            <br />
            {`Lorem Ipsum es simplemente el texto de relle" por Cicero son también reproducidas en su forma original exacta, acompañadas por versiones en Inglés de la traducción realizada en 1914 por H. Rackham.`}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <div id={styles.blogContainer}>
      {entradasBlog.map((entrada) => (
        <div>
          <div id={styles.contenido}>
            <div id={styles.containerPortada}>
              <img src="mudar.jfif" alt="" id={styles.portada} />
            </div>

            <div id={styles.tarjeta1}>
              <Tarjeta />
            </div>
          </div>
          <div id={styles.bodyContent}>
            <TarjetaTexto
              imagen={`http://localhost:1337${entrada.imagenSeccion1[0].url}`}
              
              texto = {entrada.textoSeccion1}
              texto2 = {entrada.textoSeccion2}
            />
          </div>
        </div>
      ))}
      <div>
      {pruebas.map((tt) => (
      
      <TarjetaTexto
              imagen={`http://localhost:1337${tt.image.url}`}
              
              
            />
      
      ))}

      </div>
    </div>
  );
}

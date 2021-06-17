import Header from "../components/layout/Header/index";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import useInmuebles from './../hooks/useInmuebles';
import RecipeReviewCard from "../components/common/Card/index";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Menuhome from "../components/layout/Menuhome/index";
import Image from "next/image";
import axios from "axios";
import Homeanimations from "./../components/Animations/Homeanimations/index";
import Recommendations from "../components/layout/Recommendations/index";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import { Icon } from "@material-ui/core";
import GradeIcon from "@material-ui/icons/Grade";
import Footer from "../components/layout/Footer/index";
import useFiltro from "../hooks/useFiltro"





const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function Home() {
 
  const [inmuebles, setInmuebles] = useState([]);

  useEffect(() => {
    const getInmuebles = async () => {
      

      const resultado = await axios.get(`http://192.34.57.251/inmuebles?_limit=-1`);
      setInmuebles(resultado.data);
      console.log(resultado);
    };
    getInmuebles();
  }, []);

  
  const filtraDestacados = (inmuebles) =>{
  
    const destacados = inmuebles.filter(inmueble => inmueble.destacado===true)
    return destacados;
    
  }
const {FiltroUi} = useFiltro();
  const classes = useStyles();
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width = device-width, initial-scale = 1"
        />
        <link rel="icon" type="image/png" href="/favicon.png"></link>
        <title>Glavi/home</title>
      </Head>
      <Header />
      <section className={styles.sectionHomeContainer}>
        <div>
          <Menuhome />
        </div>

        <div className={styles.imgHomeContainer}>
          <Homeanimations />
        </div>
      </section>

      <section className={styles.recommendations}>
        <h2 className={styles.titleRecommendations}>
          Te acompañamos en el proceso de encontrar tu lugar ideal.
        </h2>
        
        <div className={styles.recommendationsContainer}>
          <Recommendations />
          <Recommendations />
          <Recommendations />
        </div>
      </section>
      <hr className={styles.break} />
      <section className={classes.root}>
        <div className={styles.titleDestacados}>
          <Icon>
            <GradeIcon />
          </Icon>
          <h2 className={styles.titleRecommendations}>Destacados del mes</h2>
          <Icon>
            <GradeIcon />
          </Icon>
        </div>

        
        <div className={styles.container_cardsInmuebles}>
        <RecipeReviewCard inmuebles = {filtraDestacados(inmuebles)}/>
        </div>
         
            
          
    
        
      </section>
      <footer>
        <Footer />
      </footer>
    </>
  );
}


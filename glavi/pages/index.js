import Header from "./../components/Header/index";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Card from "./../components/Card/index";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Menuhome from "./../components/Menuhome/index";
import Image from "next/image";
import Truck from "./../components/Truck/index";
import Homeanimations from "./../components/Animations/Homeanimations/index";
import Recommendations from "./../components/Recommendations/index";

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
  const classes = useStyles();
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width = device-width, initial-scale = 1"
        />
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
          Nuestra prioridad es tu felicidad
        </h2>
        <div className={styles.recommendationsContainer}>
          <Recommendations />
          <Recommendations />
          <Recommendations />
          
        </div>
      </section>

      <section className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs>
            <Card>xs</Card>
          </Grid>
          <Grid item xs>
            <Card>xs</Card>
          </Grid>
          <Grid item xs>
            <Card>xs</Card>
          </Grid>
          <Grid item xs>
            <Card>xs</Card>
          </Grid>
          <Grid item xs>
            <Card>xs</Card>
          </Grid>
        </Grid>
      </section>
    </>
  );
}

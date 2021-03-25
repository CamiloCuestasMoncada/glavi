import React from "react";
import Head from "next/head";
import Header from "../components/layout/Header/index";
import Footer from "../components/layout/Footer/index";
import styles from "./../styles/Vender.module.css";
import Form from "./../components/layout/Form/index";

export default function vender() {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width = device-width, initial-scale = 1"
        />
        <link rel="icon" type="image/png" href="/favicon.png"></link>
        <title>Glavi/ventas</title>
      </Head>
      <Header />
      <main >
        <div className={styles.titleContainer}>
        <h1 className={styles.ventasTittle}>
          Vende tu propiedad:
        </h1>
        </div>
        <div className={styles.formContainer}>
        <Form />
        </div>
        
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}


import React, { useState } from "react";
import Buttondrophome from "../../common/Buttondrophome/index";
import Buttonhome from "../../common/Buttonhome/index";
import styles from "./Menuhome.module.css";

const Menuhome = () => {
  const [activeButton, setActiveButton] = useState(false);
  const [activeButton2, setActiveButton2] = useState(false);
  const [activeButton3, setActiveButton3] = useState(false);
  const handleClickButton1 = () => {
    setActiveButton(true);
    setActiveButton2(false);
    setActiveButton3(false);
    console.log("holla")
  };
  const handleClickButton2 = () => {
    setActiveButton(false);
    setActiveButton2(true);
    setActiveButton3(false);
  };
  
  return (
    <section className={styles.Menuhome}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>¡Encuentra tu lugar ideal!</h1>
      </div>

      <div className={styles.menuHomeContainer}>
        <nav>
          <div className={styles.buttonGroup}>
            <div onClick={handleClickButton1}>
              <Buttonhome category={"Comprar"} click={activeButton} />
            </div>

            <div onClick={handleClickButton2}>
              <Buttonhome category={"Arrendar"} click={activeButton2} />
            </div>

            <div>
              <Buttonhome category={"Vender"} />
            </div>
          </div>

          <div className={styles.buttonDropGroup}>
            <Buttondrophome
              options={["Niza", "Cedritos", "Colina Campestre"]}
              category={"Elige la zona"}
            />

            <Buttondrophome
              options={["Casa", "Apartamento", "Local"]}
              category={"Tipo de propiedad"}
            />
          </div>
          <div className={styles.buttonSearch}>
            <Buttonhome category={"Buscar"} />
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Menuhome;

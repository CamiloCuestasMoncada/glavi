import Buttondrophome from "./../Buttondrophome/index";
import Buttonhome from "./../Buttonhome/index";
import styles from "./Menuhome.module.css";

const Menuhome = () => {
  return (
    <section className={styles.Menuhome}>
      <div className={styles.titleContainer}>
      <h1 className={styles.title}>¡Encuentra tu lugar ideal!</h1>
      </div>
      
      <div className={styles.menuHomeContainer}>
        
        <nav>
          <div className={styles.buttonGroup}>
            <Buttonhome />
          
          
            <Buttonhome />
          
          
            <Buttonhome />
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
            <Buttonhome />
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Menuhome;

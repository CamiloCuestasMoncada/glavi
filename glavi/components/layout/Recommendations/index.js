import React from "react";


import styles from "./Recommendations.module.css";

import Image from "next/image";



export default function Recommendations() {
  

  return (
    <>
      

      <div>
        <div className={styles.box}>
          
          
          <div className={styles.text}>
          <div className={styles.image}>
              <Image
                src="/female.svg"
                alt="Picture of the author"
                width={290}
                height={190}
              />
            </div>
            

            <div>
              <h3>Aquiles Facundo</h3>
              <p>
                Gracias a Glavi pude encontrar el lugar que mi familia
                necesitaba, a un precio justo. Lo recomendamos
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

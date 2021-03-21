import styles from "./Homeanimations.module.css";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

function Homeanimations() {
  /* setTimeout(cambiaFotoHero(), 3500);


    const variants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0.7, x: "-10%" },
      }

      const MyComponent = () => {
        const [isOpen, setIsOpen] = useState(true)
      
        return (
            <motion.div
            animate={isOpen ? "open" : "closed"}
            variants={variants}
          >
            <button onClick={() => setIsOpen(!isOpen)} >
                goool
                </button>
                
            
          </motion.div>
        )
      }
*/

  return (
    <>
      <div className={styles.animations}>
        <div className={styles.animationsContainer}>
          <div>
            <Image
              src="/herofondo.svg"
              alt="Picture of the author"
              width={1700}
              height={1450}
            />
          </div>
          <div className={styles.boxContainer}> 
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 4,
            repeat: Infinity,
            repeatType: "reverse",
            duration: 2,
            repeatDelay: 6,
          }}
          >
        
            <Image
              src="/cajas.svg"
              alt="Picture of the author"
              width={170}
              height={71}
            />
             </motion.div>
          </div>
         

          <div className={styles.truckContainer}>
            <motion.div
              initial={{ y: 0, x: 0, scale: 1 }}
              animate={{ y: 154, x: -297, scale: 1 }}
              /*initial={{ y: 0, x: 0, scale: 1 }}
              animate={{ y: 0, x: 0, scale: 1 }}*/
              transition={{
                type: "spring",
                repeat: Infinity,
                repeatType: "reverse",
                duration: 4,
                repeatDelay: 4,
              }}
              className={styles.truck}
              layoutId="title"
            >
              <div>
                <Image
                  src="/truck.svg"
                  alt="Picture of the author"
                  layout="fixed"
                  width={300}
                  height={150}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homeanimations;

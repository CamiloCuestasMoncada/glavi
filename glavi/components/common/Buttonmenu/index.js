import React, { useState } from "react";
import styles from "./Buttonmenu.module.css";
const options = ["Mangoes", "Apples", "Oranges"];
function Buttonmenu(props) {
  function handleClick(e) {
    e.preventDefault();
    console.log("The link was clicked.");
  }

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
    console.log(selectedOption);
  };

  return (
    <>
      <div onClick={toggling} className={styles.dropdown}>
        
          
            <button className={styles.dropbtn}>
              {<a>{props.category}</a>}
            </button>
            {isOpen && (
            <div className={styles.dropdownContent}>
              {props.items.map((item) => (
                <a>{item + "jijijijiji"}</a>
              ))}
            </div>
            )}
          
        
      </div>
    </>
  );
}

export default Buttonmenu;

import React, { useState } from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import styles from "./Buttondropdawn.module.css";


export default function Buttondropdawn(props) {
  

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
    console.log(selectedOption);
  };

  const handleClickAway = () => {
    setIsOpen(false);
  };

  return (
    <>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div className={styles.dropDownContainer}>
          <button className={styles.dropDownHeader} onClick={toggling} >
            {selectedOption || props.category}
          </button>
          {isOpen && (
            <div className={styles.dropDownListContainer}>
              <ul className={styles.dropDownList}>
                {props.options.map((option) => (
                  <li
                    className={styles.listItem}
                    onClick={onOptionClicked(option)}
                    key={Math.random()}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </ClickAwayListener>
    </>
  );
}

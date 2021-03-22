import styles from "./Buttonhome.module.css";
import React, { useState } from "react";

function Buttonmenu(props) {
  const [clickColor, setClickColor] = useState(true);
  
    let styleButtonColor;
  function ChangueColorButton() {
    let stylesDefualt = styles.button;
    let stylesClick = styles.buttonClick;
    
    /*if(props.click===true){
        clickColor ? styleButtonColor= stylesDefualt : styleButtonColor= stylesClick;
    }else{
      styleButtonColor= stylesDefualt;
    }*/

    
    props.click ? styleButtonColor= stylesClick :  styleButtonColor= stylesDefualt;

    return <button  className={styleButtonColor}>{props.category}</button>;
   
  }

  return (
    <>
      <ChangueColorButton/>
    </>
  );
}

export default Buttonmenu;

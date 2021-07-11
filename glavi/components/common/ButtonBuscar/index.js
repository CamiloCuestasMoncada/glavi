import styles from "./Buttonhome.module.css";
import React, { useState } from "react";
import Link from "next/link";

function ButtonBuscar(props) {
  const [clickColor, setClickColor] = useState(true);

  //hooks globales

  let styleButtonColor;
  function ChangueColorButton() {
    let stylesDefualt = styles.button;
    let stylesClick = styles.buttonClick;

    /*if(props.click===true){
        clickColor ? styleButtonColor= stylesDefualt : styleButtonColor= stylesClick;
    }else{
      styleButtonColor= stylesDefualt;
    }*/

    props.click
      ? (styleButtonColor = stylesClick)
      : (styleButtonColor = stylesDefualt);

    return (
      <Link as={`/inmuebles/apartamento`} href="/inmuebles/[id]">
        <button className={styleButtonColor}>{props.category}</button>
      </Link>
    );
  }

  return <ChangueColorButton />;
}

export default ButtonBuscar;

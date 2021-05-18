import React, { useState, useEffect, useContext } from "react";
import  {ThemeContext}  from '../../../context/GlobalContextApp';
/*import Buttondrophome from "../../common/Buttondrophome/index";*/
import Buttonhome from "../../common/Buttonhome/index";
import styles from "./Menuhome.module.css";
import useFiltro from "./../../../hooks/useFiltro";
import axios from "axios";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Link from "next/link";






const Menuhome = () => {
  useEffect(() => {
    const getZonas = async () => {
      const result = await axios.get("http://localhost:1337/zonas");
      setZonas(result.data);
    };
    getZonas();

    const getTipoPropiedad = async () => {
      const result = await axios.get("http://localhost:1337/tipodepropiedads");
      setTipoDePropiedad(result.data);
    };
    getTipoPropiedad();

    const getInmuebles = async () => {
      const resultado = await axios.get("http://localhost:1337/inmuebles");
      console.log(resultado);
      setInmuebles(resultado.data);
    };
    getInmuebles();
  }, []);

  //hooks   ------------------------------------------------------------------
  const [selectedOptionZona, setSelectedOptionZona] = useState();
  const [selectedOptionType, setSelectedOptiontype] = useState();
  const [mostrarResultado, setMostrarResultado] = useState(
    "Aun no hay nada para mostrar"
  );

//estados globales
const {filterResultType} = useContext(ThemeContext);
const {setFilterResultType} = useContext(ThemeContext);
const {filterResultZona} = useContext(ThemeContext);
const {setFilterResultZona} = useContext(ThemeContext);



  /*---------------component menu dropdown zona-----------------------------*/

  function ButtondrophomeZona(props) {
    const [isOpen, setIsOpen] = useState(false);

    const toggling = () => setIsOpen(!isOpen);

    const onOptionClicked = (value) => () => {
      setSelectedOptionZona(value);
      setIsOpen(false);
    };

    const handleClickAway = () => {
      setIsOpen(false);
    };

    return (
      <>
        <ClickAwayListener onClickAway={handleClickAway}>
          <div className={styles.dropDownContainer}>
            <button className={styles.dropDownHeader} onClick={toggling}>
              {selectedOptionZona || props.category}
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
  //-----------------------------------------------------------------------------------------------------------------

  /*---------------component menu dropdown type-----------------------------*/

  function ButtondrophomeType(props) {
    const [isOpen, setIsOpen] = useState(false);

    const toggling = () => setIsOpen(!isOpen);

    const onOptionClicked = (value) => () => {
      setSelectedOptiontype(value);
      setIsOpen(false);
    };

    const handleClickAway = () => {
      setIsOpen(false);
    };

    return (
      <>
        <ClickAwayListener onClickAway={handleClickAway}>
          <div className={styles.dropDownContainer}>
            <button className={styles.dropDownHeader} onClick={toggling}>
              {selectedOptionType || props.category}
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
  //-----------------------------------------------------------------------------------------------------------------

  //component result filter

  const ResultFilterToClickBuscar = () => {
    return <p>{mostrarResultado}</p>;
  };
  //---------------------------------------------------------------------------------------------------------------------
  const [zonas, setZonas] = useState([]);
  const [tipoDePropiedad, setTipoDePropiedad] = useState([]);
  const [inmuebles, setInmuebles] = useState([]);
  const { FiltroUi } = useFiltro();
  const [activeButton, setActiveButton] = useState(false);
  const [activeButton2, setActiveButton2] = useState(false);
  const [activeButton3, setActiveButton3] = useState(false);
  const filterZona = inmuebles.filter(
    (inmueble) => inmueble.zona.zona == selectedOptionZona
  );
  const filterType = inmuebles.filter(
    (inmuebleType) => inmuebleType.tipodepropiedad.tipo == selectedOptionType
  );

  const mostrarResultadoType = filterType.map((result) => result.portada.url);

  const mostrarResultadoZona = filterZona.map((result) => result.portada.url);

  
  //---------------------------------------------------------------------------------------------------------
  const handleClickButton1 = () => {
    setActiveButton(true);
    setActiveButton2(false);
    setActiveButton3(false);
  };
  const handleClickButton2 = () => {
    setActiveButton(false);
    setActiveButton2(true);
    setActiveButton3(false);
  };
  const handleClickBuscar = () => {
    setMostrarResultado(
      `Tu ${mostrarResultadoType} en ${mostrarResultadoZona}`
    );
    setFilterResultType(mostrarResultadoType)
    
  };
  //------------------------------------------------------------------------------------------------------------------
  return (
    <section className={styles.Menuhome}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>¡Encuentra tu lugar ideal!</h1>

        {console.log(filterZona)}
        {console.log(filterType)}
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
            <ButtondrophomeZona
              options={zonas.map((zona) => [zona.zona])}
              category={"Elige la zona"}
            />

            <ButtondrophomeType
              options={tipoDePropiedad.map((tipo) => [tipo.tipo])}
              category={"Tipo de propiedad"}
            />
          </div>
          <Link as={`/inmuebles/${selectedOptionType}`} href="/inmuebles/[id]">
            <div className={styles.buttonSearch} onClick={handleClickBuscar}>
              <Buttonhome category={"Buscar"} />
            </div>
          </Link>
        </nav>
      </div>
      <ResultFilterToClickBuscar />
      <h1>{filterResultType}</h1>
    </section>
  );
};

export default Menuhome;

export function resultados(){
  return <p>{mostrarResultadoType}</p> 
}


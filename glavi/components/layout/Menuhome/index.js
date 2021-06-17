import React, { useState, useEffect, useContext, useRef } from "react";
import { ThemeContext } from "../../../context/GlobalContextApp";
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
      const resultZonas = await axios.get(
        "http://192.34.57.251/zonas?_limit=-1"
      );
      const resultZonasEspecificas = await axios.get(
        "http://192.34.57.251/specificzones?_limit=-1"
      );
      setZonas(resultZonas.data);
      const zonas = resultZonas.data;
      const zonasEspecificas = resultZonasEspecificas.data;
      setZonasEspecificas(resultZonasEspecificas.data);
      const zonasTotales = zonas.concat(zonasEspecificas);
      setTotalZonas(zonasTotales);
      console.log(zonasTotales);
    };
    getZonas();

    const getTipoPropiedad = async () => {
      const result = await axios.get(
        "http://192.34.57.251/tipo-De-Propiedades?_limit=-1"
      );
      setTipoDePropiedad(result.data);
    };
    getTipoPropiedad();

    const getInmuebles = async () => {
      const resultado = await axios.get(
        `http://192.34.57.251/inmuebles?_limit=-1`
      );

      setInmuebles(resultado);
      let ps = resultado.data;
      let newe = Array.from(ps);
      console.log(resultado.data);
      console.log(newe);
    };
    getInmuebles();
  }, []);

  //hooks botones  ------------------------------------------------------------------
  const [selectedOptionZona, setSelectedOptionZona] = useState();
  const [selectedOptionType, setSelectedOptiontype] = useState();
  const [mostrarResultado, setMostrarResultado] = useState(
    "Aun no hay nada para mostrar"
  );

  //hooks botones activos
  const [activeButton, setActiveButton] = useState(false);
  const [activeButton2, setActiveButton2] = useState(false);
  const [activeButton3, setActiveButton3] = useState(false);
  const [valueDropdownSeacrh, setValueDropdownSeacrh] = useState(null);

  //hooks filtros
  const [zonas, setZonas] = useState([]);
  const [zonasEspecificas, setZonasEspecificas] = useState([]);
  const [totalZonas, setTotalZonas] = useState([]);
  const [tipoDePropiedad, setTipoDePropiedad] = useState([]);
  const [inmuebles, setInmuebles] = useState([]);
  //estados globales filtros
  const { filterResultType } = useContext(ThemeContext);
  const { setFilterResultType } = useContext(ThemeContext);
  const { filterResultZona } = useContext(ThemeContext);
  const { setFilterResultZona } = useContext(ThemeContext);
  const { globalFilterResult } = useContext(ThemeContext);
  const { setGlobalFilterResult } = useContext(ThemeContext);

  /*---------------component menu dropdown zona-----------------------------*/

  //estilos dropdowSearch

  const styleDropdownSearchOpen = {
    borderColor: "transparent transparent #999",
    borderWidth: "0 5px 5px",
  };

  const styleDropdownSearch = {
    borderColor: "#999 transparent transparent",
    borderStyle: "solid",
    borderWidth: "5px 5px 0",
    content: " ",
    display: "block",
    height: "0",
    marginTop: "0.3rem",
    position: "absolute",
    right: "10px",
    top: "14px",
    width: "0",
  };

  const dropdownOptionsOpen = {
    display: "block",
    maxHeight: "187px",
    overflowY: "auto",
    boxShadow: "0 1px 0 rgba(0, 0, 0, 0.06)",
  };

  const dropdownOptions = {
    display: "none",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    boxShadow: "0 1px 0 rgba(0, 0, 0, 0.06)",
    boxSizing: "border-box",
    marginTop: "-1px",
    maxHeight: "200px",
    overflowY: "auto",
    position: "absolute",
    top: "100%",
    width: "100%",
    zIndex: "1000",
    overflowScrolling: "touch",
  };

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
                      key={option}
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

  function FilterDropdownSearch({ options, prompt, value, onChange }) {
    /*const [open, setOpen] = useState(false);*/
    const [openDropdownSearch, setOpenDropdownSearch] = useState(false);
    const [query, setQuery] = useState("");
    const ref = useRef(null);
    useEffect(() => {
      document.addEventListener("click", close);
      return () => document.removeEventListener("click", close);
    }, []);
    function close(e) {
      setOpenDropdownSearch(e && e.target === ref.current);
    }

    function filter(options) {
      return options.filter(
        (option) => option.zona.toLowerCase().indexOf(query.toLowerCase()) > -1
      );
    }

    return (
      <div className={styles.searchDropdownFilter}>
        <div
          className={styles.control}
          onClick={() => setOpenDropdownSearch((prev) => !prev)}
        >
          <div className={styles.selectedValue}>
            <input
              type="text"
              ref={ref}
              placeholder={value ? value : prompt}
              value={value || query}
              onChange={(e) => {
                setQuery(e.target.value);
                onChange(null);
              }}
              onClick={() => setOpenDropdownSearch((prev) => !prev)}
            />
          </div>
          <div
            style={
              openDropdownSearch ? styleDropdownSearchOpen : styleDropdownSearch
            }
          />
        </div>
        <div style={openDropdownSearch ? dropdownOptionsOpen : dropdownOptions}>
          {filter(options).map((option) => (
            <div
              className={styles.option}
              onClick={() => {
                setQuery("");
                onChange(option.zona);
                setOpenDropdownSearch(false);
                setSelectedOptionZona(option.zona);
              }}
            >
              {option.zona}
            </div>
          ))}
        </div>
      </div>
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
                      key={option}
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
    if (selectedOptionZona && selectedOptionType) {
      globalFilterResults();
    } else if (selectedOptionZona) {
      zonaFilterResults(selectedOptionZona);
    } else if (selectedOptionType) {
      typeFilterResults(selectedOptionType);
    }
  };
  //------------------------------------------------------------------------------------------------------------------

  //funciones encargadas de realizar los filtros
  const globalFilterResults = () => {
 
    let todosLosInmuebles = inmuebles.data;

   /* function filtro(prop) {
      let resultado = selectedOptionType[0];
      let preFiltro;
      const specificZona = prop?.specificzone?.zona || null;
      if (prop.zona.zona === selectedOptionZona) {
        preFiltro = prop.zona.zona;
      } else if (specificZona === selectedOptionZona) {
        preFiltro = specificZona;
      }

      inmueble.tipoDePropiedad.tipo === resultado;
      setGlobalFilterResult(resultadoGlobal);
    }
    const resultadoGlobal = todosLosInmuebles.filter(filtro);*/
    let resultado = selectedOptionType[0];
    function filtro(prop){
      debugger;
        const specificZona = prop?.specificzone?.zona || null;
        if(prop.tipoDePropiedad.tipo === resultado){
          if(prop.zona.zona===selectedOptionZona || specificZona===selectedOptionZona){
            return true;
            
          }
        }
      
    }
    const resultadoGlobal = todosLosInmuebles.filter(filtro);
    setGlobalFilterResult(resultadoGlobal);
  };

  const zonaFilterResults = () => {};

  const typeFilterResults = () => {};

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
            <div className={styles.containerDropSearch}>
              {" "}
              <FilterDropdownSearch
                options={totalZonas}
                prompt={"Selecciona la zona:"}
                value={valueDropdownSeacrh}
                onChange={(val) => setValueDropdownSeacrh(val)}
              />
            </div>

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
    </section>
  );
};

export default Menuhome;

export function resultados() {
  return <p>{mostrarResultadoType}</p>;
}

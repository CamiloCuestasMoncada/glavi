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
      const result = await axios.get("http://192.34.57.251/zonas");
      setZonas(result.data);
    };
    getZonas();

    const getTipoPropiedad = async () => {
      const result = await axios.get(
        "http://192.34.57.251/tipo-De-Propiedades"
      );
      setTipoDePropiedad(result.data);
    };
    getTipoPropiedad();

    const getInmuebles = async () => {
      for(let i = 0; i<100; i++){

      }
      const resultado = await axios.get(`http://192.34.57.251/inmuebles`);
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
  const [searchTerm, setSearchTerm] = useState("");

  const [valueDropdownSeacrh, setValueDropdownSeacrh] = useState(null);

  //estados globales
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
    return <p>{mostrarResultadoGeneral}</p>;
  };
  //---------------------------------------------------------------------------------------------------------------------
  const [zonas, setZonas] = useState([]);
  const [tipoDePropiedad, setTipoDePropiedad] = useState([]);
  const [inmuebles, setInmuebles] = useState([]);
  const { FiltroUi } = useFiltro();
  const [activeButton, setActiveButton] = useState(false);
  const [activeButton2, setActiveButton2] = useState(false);
  const [activeButton3, setActiveButton3] = useState(false);

  function filterResultSearch() {
    if (selectedOptionZona && selectedOptionType) {
      setGlobalFilterResult(mostrarResultadoGeneral);
    }else{setGlobalFilterResult(null)}
  }

  //const globalFilter = inmuebles.filter(filterResultSearch);----------------------------------------------------------------------------------------------
 
  const filterZona = inmuebles.filter(
    (inmueble) => inmueble.zona.zona == selectedOptionZona
  );
  const filterType = inmuebles.filter(
    (inmuebleType) => inmuebleType.tipoDePropiedad.tipo == selectedOptionType
  );

  const filterOk = filterZona.filter(
    (inmuebleType) => inmuebleType.tipoDePropiedad.tipo == selectedOptionType
  );
console.log(`lilolilo${filterOk}`);
  const mostrarResultadoGeneral = filterOk.map((result) => result.portada.url);
  const mostrarResultadoType = filterType.map((result) => result.portada.url);

  const mostrarResultadoZona = filterZona.map((result) => result.portada.url);
  const result = mostrarResultadoType;
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
    setFilterResultType(mostrarResultadoType);
    setFilterResultZona(mostrarResultadoZona);
    filterResultSearch();
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
            <div className={styles.containerDropSearch}>
              {" "}
              <FilterDropdownSearch
                options={zonas}
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

          {/*<div className={styles.searchButton}>
            <input
              type="text"
              placeholder="Escribe la Zona"
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <select name="" id="" className={styles.zonaList}>
              {zonas
                .filter((value) => {
                  if (searchTerm == "") {
                    return value;
                  } else if (
                    value.zona.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return value;
                  }
                })
                .map((value, key) => (
                  <option value={value.zona}>{value.zona}</option>
                ))}
            </select>
                </div>*/}
        </nav>
      </div>
      <ResultFilterToClickBuscar />
      <h1>{filterResultType}</h1>
    </section>
  );
};

export default Menuhome;

export function resultados() {
  return <p>{mostrarResultadoType}</p>;
}

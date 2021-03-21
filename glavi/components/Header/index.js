import React from "react";
import styles from "./Header.module.css";
import Image from "next/image";

import MenuIcon from "@material-ui/icons/Menu";
import { Icon } from "@material-ui/core";
import Buttonmenu from "./../Buttonmenu/index";
import Buttondropdawn from "../Buttondropdawn/index";
import Buttonlink from "./../Buttonlink/index"

function Header() {
  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navbar_container}>
          <div className={styles.itemsNavbar}>
            <a className="" href="#">
              <Image
                src="/logo.svg"
                alt="Logo de glavi inmobiliaria"
                width={200}
                height={150}
              />
            </a>

            <div className={styles.buttonContainer}>
              <ul>
               
             
                <li>
                  <Buttondropdawn
                    options={["Casas", "Apartamentos", "Locales", "Lotes", "Fincas", "Bodegas"]}
                    category={"Comprar"}
                  />
                </li>
                <li>
                  <Buttondropdawn
                    options={["Casas", "Apartamentos", "Locales", "Lotes","Fincas", "Bodegas"]}
                    category={"Arrendar"}
                  />
                </li>
                <li>
                  <Buttonlink/>
                </li>
                <li>
                  <Buttondropdawn
                    options={[" Avalúos", "Consigna tu inmueble", "Intervenciones arquitectónicas"]}
                    category={"+ Servicios"}
                  />
                </li>
              </ul>
            </div>
          </div>
          <form className="">
            <input
              className={styles.input_search}
              type="search"
              placeholder="Buscar por código"
              aria-label="Search"
            />
            <button className={styles.button_navbar} type="button">
              Buscar
            </button>
          </form>
          <Icon className={styles.iconMenuResponsive}>
            <MenuIcon />
          </Icon>
        </div>
      </nav>
    </>
  );
}

export default Header;

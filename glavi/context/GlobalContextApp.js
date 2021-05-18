/*import React, { useState } from "react";
export const ThemeContext = React.createContext();

const GlobalContextApp = (props) => {
  const [filterResultType, setFilterResultType] = useState("ff");
  const [filterResultZona, setFilterResultZona] = useState("ssss");
  const [filterResult, setFilterResult] = useState();
  return (
    <ThemeContext.Provider
      value={{
        filterResultType,
        setFilterResultType,
        filterResultZona,
        setFilterResultZona,
        filterResult,
        setFilterResult,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export default GlobalContextApp;
*/
import { createContext, useState, useContext } from "react";

export const ThemeContext = createContext();

export function GlobalContextApp({ children }) {
  const [filterResultType, setFilterResultType] = useState([]);
  const [filterResultZona, setFilterResultZona] = useState([]);
  const [filterResult, setFilterResult] = useState();
  
  

  return (
    <ThemeContext.Provider value={{
      filterResultType,
      setFilterResultType,
      filterResultZona,
      setFilterResultZona,
      filterResult,
      setFilterResult,
    }}>{children}</ThemeContext.Provider>
  );
}

/*export function useAppContext() {
  return useContext(ThemeContext);
}*/

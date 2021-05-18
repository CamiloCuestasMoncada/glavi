import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useFiltro() {
  const [categories, setCategories] = useState([]);
  const [zonas, setZonas] = useState([]);
  useEffect(() => {
    const getCategories = async () => {
      const result = await axios.get("http://localhost:1337/categorias");
      setCategories(result.data);
      
    }
    getCategories();

    const getZonas = async () => {
      const result = await axios.get("http://localhost:1337/zonas");
      setZonas(result.data);
      
    }
    getZonas();
  }, []);
  const FiltroUi = () => <p>{zonas.map((zona)=>(
<> {zona.zona} </>
  ))}</p>;

  return { FiltroUi };
}

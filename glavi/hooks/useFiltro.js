import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useFiltro() {
  const [categories, setCategories] = useState([]);
  const [zonas, setZonas] = useState([]);
  useEffect(() => {
    const getCategories = async () => {
      const result = await axios.get("http://192.34.57.251/categories");
      setCategories(result.data);
      
    }
    getCategories();

    const getZonas = async () => {
      const result = await axios.get("http://192.34.57.251/zonas");
      setZonas(result.data);
      
    }
    getZonas();
  }, []);
  const FiltroUi = () => <p>{zonas.map((zona)=>(
<> {zona.zona} </>
  ))}</p>;

  return { FiltroUi };
}

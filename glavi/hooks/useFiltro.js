import React, { useState, useEffect } from "react";
import axios from "axios";



export default function useFiltro() {
     
  const [categories, setCategories] = useState([]);
  useEffect(()=>{
  const getCategories = async () => {
    const result = await axios.get('http://localhost:1337/categories');
    setCategories(result.data);
    getCategories();
  }
  },[]);
  const FiltroUi = () => (<h1>Probando filtro</h1>);

  return { FiltroUi };
};



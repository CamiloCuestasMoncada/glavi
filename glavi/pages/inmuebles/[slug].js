import React, { useContext } from "react";
import Header from "../../components/layout/Header/index";
import Footer from "../../components/layout/Footer/index";
import { fetchAPI } from "../../lib/api";
import GetFiterResult from "../../hooks/getFilterResult";
import axios from "axios";
import { ThemeContext } from "./../../context/GlobalContextApp";
import EstateCardFilter from './../../components/common/CardFilter/index';



async function  esperar(){
  const { globalFilterResult } =  await useContext(ThemeContext);
  globalFilterResult2=globalFilterResult;
  debugger;
  return globalFilterResult2;
}

const PropertyList =  () => {
  const { globalFilterResult } = useContext(ThemeContext);
  /*const { filterResultType } = await useContext(ThemeContext);
  const { filterResultZona } = await useContext(ThemeContext);*/
  
 
/*const inmueblesFiltrados = (inmuebles)=>{
  inmuebles.map((inmueble)=>{

  })
}*/
  return (
    <>
      <Header />
      
     {globalFilterResult?<EstateCardFilter inmuebles = {globalFilterResult}/>:<h1>vb</h1>}
      
      <Footer />
    </>
  );
};

/*export async function getStaticPaths() {
  const inmuebles = await fetchAPI("/zonas");
  

  return {
    paths: inmuebles.map(
      inmueble => {
     
        return {
          params: {
            slug: inmueble.zona
          }
        }
      }
    ),
    fallback: false,
  };
}*/

/*export async function getStaticPaths() {
  
const paths = [
  {params: {slug: "chico"}}
];
return {
  paths,
  fallback: false
}
}*/

export async function getStaticPaths() {
  const result = await fetchAPI("/tipo-De-Propiedades?_limit=-1");


  return {
    
    paths: result.map((inmueble) => ({
      params: {
        slug: inmueble.tipo,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const inmuebles = await fetchAPI(
    `/zonas?zona=${params.slug}`
  );
  
  return {
    props: { inmuebles },
    revalidate: 1,
  };
  
}

export default PropertyList;

/* <h1>{`kkkk${ JSON.stringify(globalFilterResult) }`}</h1>

<section>
{globalFilterResult
  ? globalFilterResult.map((result) => (
      <div>
        <img src={`http://192.34.57.251${result.portada.url}`} alt="" />
        <h2>{`${result.titulo}`}</h2>
      </div>
    ))
  : filterResultType.map((result) => (
      <div>
        <img src={result.portada.url} alt="" />
        <h2>{result.titulo}</h2>
      </div>
    ))}
</section>*/
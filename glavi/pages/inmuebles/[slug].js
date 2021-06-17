import React, { useContext } from "react";
import Header from "../../components/layout/Header/index";
import Footer from "../../components/layout/Footer/index";
import { fetchAPI } from "../../lib/api";
import GetFiterResult from "../../hooks/getFilterResult";

import { ThemeContext } from "./../../context/GlobalContextApp";

const PropertyList = () => {
  const { filterResultType } = useContext(ThemeContext);
  const { filterResultZona } = useContext(ThemeContext);
  const { globalFilterResult } = useContext(ThemeContext);

  return (
    <>
      <Header />
      <h1>{/*`kkkk${ JSON.stringify(globalFilterResult) }`*/}</h1>

      

      <section>
        {globalFilterResult ? globalFilterResult.map((result) => (
          <div>
            <img src={`http://192.34.57.251${result.portada.url}`} alt="" />
            <h2>{`glloobal${result.titulo}`}</h2>
            
          </div>
        )) : filterResultType.map((result) => (
          <div>
            <img src={result.portada.url} alt="" />
            <h2>{result.titulo}</h2>
            
          </div>
        ))}
      </section>
     
      <Footer />
    </>
  );
};

export async function getStaticPaths() {
  const inmuebles = await fetchAPI("/tipo-De-Propiedades");

  return {
    paths: inmuebles.map((inmueble) => ({
      params: {
        slug: inmueble.tipo,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const inmuebles = await fetchAPI(`/tipo-De-Propiedades?tipo=${params.slug}`);

  return {
    props: { inmuebles },
    revalidate: 1,
  };
}

export default PropertyList;

import React, { useContext } from "react";
import Header from "../../components/layout/Header/index";
import Footer from "../../components/layout/Footer/index";
import { fetchAPI } from "../../lib/api";
import GetFiterResult from "../../hooks/getFilterResult";

import { ThemeContext } from "./../../context/GlobalContextApp";

const PropertyList = ({ inmuebles }) => {
  const { filterResultType } = useContext(ThemeContext);
  const { filterResultZona } = useContext(ThemeContext);

  return (
    <>
      <Header />
      <h1>{`tipo de propiedad: ${inmuebles[0].tipo} nombre: ${filterResultType} y queda en ${filterResultZona}`}</h1>

      {console.log(inmuebles)}

      <section>
        {filterResultType.map((result) => (
          <div>
            <img src={`http://localhost:1337${result}`} alt="" />
            <h2>{result}</h2>
            {console.log(result)}
          </div>
        ))}
      </section>
      <Footer />
    </>
  );
};

export async function getStaticPaths() {
  const inmuebles = await fetchAPI("/tipodepropiedads");

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
  const inmuebles = await fetchAPI(`/tipodepropiedads?tipo=${params.slug}`);

  return {
    props: { inmuebles },
    revalidate: 1,
  };
}

export default PropertyList;

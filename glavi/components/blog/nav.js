import React from "react";
import Link from "next/link";

const Nav = ({ categories }) => {
  return (
    <div>
      <nav className="">
        <div className="">
          <ul className="">
            <li>
              <Link href="/">
                <a>Regresar</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="">
          <ul className="">
            {categories.map((category) => {
              return (
                <li key={category.id}>
                  <Link as={`/category/${category.slug}`} href="/category/[id]">
                    <a className="">{category.name}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Nav;

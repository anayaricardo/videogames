import React from "react";
import Style from "./Pagination.module.css";

export default function Pagination({ page, videogames, videogamePerPage }) {
  const pages = [];
  for (let i = 1; i <= Math.ceil(videogames / videogamePerPage); i++) {
    pages.push(i);
  }
  return (
    <nav>
      <ul className={Style.ul}>
        Pages:{" "}
        {pages &&
          pages.map((number) => {
            return (
              <li key={number} className={Style.li}>
                <button className={Style.button} onClick={() => page(number)}>
                  {number}
                </button>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}

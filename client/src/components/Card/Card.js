import React from "react";
import { Link } from "react-router-dom";
import Style from "./Card.module.css";
import Bits from "../../images/BITS_GAME.png";

export default function Card({ name, image, genres, rating, id }) {
  return (
    <div className={Style.div1}>
      {image ? (
        <img src={image} alt="Not found" width="350px" heigth="200px" />
      ) : (
        <img src={Bits} alt="Not Found" width="350px" heigth="200px" />
      )}

      <div className={Style.div2}>
        {genres.length ? (
          <h5 className={Style.genero}>
            {genres[0].name
              ? genres.map((genre) => genre.name).join(", ")
              : genres.join(", ")}
          </h5>
        ) : (
          <h5 className={Style.genero}>No Genre Found</h5>
        )}
        <Link className={Style.select} to={`/videogame/${id}`}>
          <h2 className={Style.name}>{name}</h2>
        </Link>
        <h5 className={Style.rating}>{`★ ${rating}`}</h5>
      </div>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import Style from "./Card.module.css";
import Bits from "../../images/BITS_GAME.png";

export default function Card({ name, image, genres, rating, id }) {
  return (
    <div className={Style.div1}>
    <div>

      {image ? (
        <img className={Style.img} src={image} alt="Not found" />
      ) : (
        <img className={Style.img} src={Bits} alt="Not Found" />
      )}
    </div>
      <div className={Style.div2}>
        {genres.length ? (
          <h5 className={Style.genre}>
            {genres[0].name
              ? genres.map((genre) => genre.name).join(", ")
              : genres.join(", ")}
          </h5>
        ) : (
          <h5 className={Style.genre}>No Genre Found</h5>
        )}
        <Link className={Style.select} to={`/videogame/${id}`}>
          <h2 className={Style.name}>{name}</h2>
        </Link>
        <h5 className={Style.rating}>{`★ ${rating}`}</h5>
      </div>
    </div>
  );
}

// ★
// 👍
// 🔥

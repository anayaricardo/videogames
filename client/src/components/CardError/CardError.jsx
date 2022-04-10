import React from "react";
import Style from "./CardError.module.css";

export function CardError() {
  function handleClick(event) {
    event.preventDefault();
    window.location.reload();
  }
  return (
    <div src={"Añadir una imagen"}>
      <div>"Hey! there`''`s no videogames here"</div>
      <button
        className={Style.button}
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Try again
      </button>
    </div>
  );
}

export default CardError;

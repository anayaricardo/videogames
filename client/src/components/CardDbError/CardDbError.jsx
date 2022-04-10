import React from "react";
import { Link } from "react-router-dom";
import Style from "./CardDbError.module.css";

export function CardDbError () {
    return (
        <div src={"Añadir una imagen"}>
        <div className={Style.div1}>Hey! There`'`s no video games created yet</div>
        <Link to='/videogame'>
            <button className={Style.button}>Add a new videogame</button>
        </Link>

        </div>
    )
}

export default CardDbError;
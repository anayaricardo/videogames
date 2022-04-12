import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getGamesByName, clearStateVideogames } from "../../actions";
import Style from "./Searchbar.module.css";
import Logo from "../../images/BITS_HOR_TRANSP.png";
import Glass from "../../images/MAGNIFYING_GLASS.png";

export default function Searchbar({ setCurrentPage, setHeader }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleChange(e) {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(clearStateVideogames());
    dispatch(getGamesByName(name));
    setName("");
    setHeader(`Search results for: ${e.target.value}`);
    setCurrentPage(1);
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  }

  return (

    <div className={Style.div1}>
    <Link to="/">
    <button className={Style.buttonlogo}>
      <img className={Style.logo} src={Logo} alt="Logo" width="125px" height="75px"/>
    </button>
    </Link>
      <input
        className={Style.input}
        value={name}
        type="text"
        placeholder="Search for a game"
        onChange={(e) => handleChange(e)}
        onKeyPress={(e) => handleKeyPress(e)}
      />
      <button className={Style.button} type="submit" onClick={(e) => handleSubmit(e)}>
        <img className={Style.img}
          src={Glass}   alt="Glass" width="25px" height="25px"
         
        ></img>
      </button>
      <p className={Style.p}>Powered by</p>
      <a className={Style.a} href={"https://rawg.io"} target="_blank" >rawg.io</a>
    </div>

  );
}

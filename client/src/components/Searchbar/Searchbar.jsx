import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getGamesByName, clearStateVideogames } from "../../actions";
import Style from "./Searchbar.module.css";
import Logo from "../../images/BITS.png";
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
      <img src={Logo} alt="Logo" height="80px" width="220px" />
      <input
        className={Style.input}
        value={name}
        type="text"
        placeholder="Search for a game"
        onChange={(e) => handleChange(e)}
        onKeyPress={(e) => handleKeyPress(e)}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        <img
          src={Glass}
          alt="Glass"
          height="20px"
          width="20px"
          object-fit="cover"
        ></img>
      </button>
    </div>
  );
}

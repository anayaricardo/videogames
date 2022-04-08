import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={style.background}>
      <div className={style.container}>
        <h1 className={style.title}>Video games API</h1>
        <br></br>
        <h1 className={style.subtitle}>Your favorite video game site</h1>
        <br></br>
        {/* <h1 className={style.subtitle2}>Explore hundreds of video games</h1> */}

        <Link className={style.link} to="/home">
          <button className={style.button}>Press Start</button>
        </Link>
        <h1 className={style.subtitle3}>*Made with RAWG API a powerful tool for working with video games data. </h1>
      </div>
      </div>
  );
};

export default LandingPage;

import React from "react";
import { Link } from "react-router-dom";
import Style from "./LandingPage.module.css";
import Logo from "../../images/BITS.png";

const LandingPage = () => {
  return (
    <div className={Style.background}>
      <div className={Style.container}>
        <img src={Logo} alt="logo" className={Style.logo} />
        <h1 className={Style.subtitle}>Your favorite video game site</h1>
        {/* <h1 className={style.subtitle2}>Explore hundreds of video games</h1> */}

        <Link className={Style.link} to="/home">
          <button className={Style.button}>Press START</button>
        </Link>
        <h1 className={Style.subtitle3}>
          *Made with RAWG API a powerful tool for working with video games data.{" "}
        </h1>
      </div>
    </div>
  );
};

export default LandingPage;

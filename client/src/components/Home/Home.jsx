import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllVideogames,
  getAllGenres,
  filterGamesByGenre,
  filterCreatedOrExist,
  sortAlphabetically,
  sortByRating,
} from "../../actions";
import { Link } from "react-router-dom";
import Style from "./Home.module.css";
import Card from "../Card/Card";
import Searchbar from "../Searchbar/Searchbar";
import Pagination from "../Pagination/Pagination";
import CardError from "../CardError/CardError";
import CardDbError from "../CardDbError/CardDbError";
import Loader from "../Loader/Loader";

export default function Home() {
  const dispatch = useDispatch();
  let videogames = useSelector((state) => state.videogames);

  const details = useSelector((state) => state.details);
  useEffect(() => {
    if (!details.length) {
      dispatch(getAllVideogames());
    }
  }, [dispatch, details]);

  const genres = useSelector((state) => state.genres);
  useEffect(() => {
      dispatch(getAllGenres());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault(); // Previene que se recargue la página
    window.location.reload();
  }

  const [currentPage, setCurrentPage] = useState(1);
  const page = (actualPage) => {
    setCurrentPage(actualPage);
  };

  const [header, setHeader] = useState("Explore Games");
  function handleGenreFilter(e) {
    e.target.value === "All"
      ? dispatch(getAllVideogames()) && setHeader("Explore all the Games")
      : dispatch(filterGamesByGenre(e.target.value));
    setCurrentPage(1);
    setHeader(`Filtered by: ${e.target.value} games`);
  }

  function handlefilterCreatedOrExist(e) {
    e.target.value === "All"
      ? dispatch(getAllVideogames())
      : dispatch(filterCreatedOrExist(e.target.value));
    setCurrentPage(1);
    setHeader(`Filtered by Origin: ${e.target.value} games`);
  }

  const [sort, setSort] = useState("");
  function handleSort(e) {
    e.preventDefault();
    dispatch(sortAlphabetically(e.target.value));
    setCurrentPage(1);
    setSort(`Sorted by: ${e.target.value}`);
    setHeader(`Sorted by: ${e.target.value}`); // se agrega estado local 'Sort' para que se pueda renderizar el ordenamiento desde la página 1
  }

  function handleSort2(e) {
    e.preventDefault();
    dispatch(sortByRating(e.target.value));
    setCurrentPage(1);
    setSort(`Sorted by: ${e.target.value}`); // se agrega estado local 'Sort' para que se pueda renderizar el ordenamiento desde la página 1
    setHeader(`Sorted by: ${e.target.value}`);
  }

  const [videogamePerPage, setVideogamePerPage] = useState(15);
  const indexOfLastVideogame = currentPage * videogamePerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamePerPage;
  const currentVideogames = videogames.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );

  return (
    <div>
      <Searchbar setHeader={setHeader} setCurrentPage={setCurrentPage} />
      <h1 className={Style.header}>{header}</h1>
      <Pagination
        videogamePerPage={videogamePerPage}
        videogames={videogames.length}
        page={page}
      />
      <div className={Style.div1}>
        <div className={Style.div2}>
            <p>
                <label className={Style.label}>Sort by:</label>
                <select className={Style.select} onChange={leter => handleSort(leter)}>
                    <option className={Style.option} hidden value='Alphabetically'>Alphabetically</option> 
                <option className={Style.option} value='A to Z'>A to Z</option> 
                <option className={Style.option} value='Z to A'>Z to A</option>
                </select>
                <select className={Style.select} onChange={leter => handleSort2(leter)}>
                    <option className={Style.option} hidden value='Rating'>Rating</option> 
                <option className={Style.option} value='Highest to Lowest Rating'>Highest to Lowest</option> 
                <option className={Style.option} value='Lowest to Highest Rating'>Lowest to Highest</option>
                </select>
            </p>
            <p>
            <label className={Style.label}>Filter by:</label>
            <select className={Style.select} onChange={genre => handleGenreFilter(genre)}>
                    <option className={Style.option} hidden value='Genre'>Genre</option> 
                <option className={Style.option} value='All'>All</option> 
                {genres.map((genre) => (
                <option className={Style.option} key={genre.id} value={genre.name}>{genre.name}</option>
                ))}
                </select>
                <select className={Style.select} onChange={origin => handlefilterCreatedOrExist(origin)}>
                    <option className={Style.option} hidden value='Origin'>Origin</option>
                <option className={Style.option} value='All'>All</option>
                <option className={Style.option} value='API'>API RAWG</option>
                <option className={Style.option} value='DB'>CREATED IN DATABASE</option>
                </select>
            </p>
            <p>
            <label className={Style.label}>Others:</label>
            <button className={Style.button} onClick={e => {handleClick(e)}}>Reset</button>
            <Link to='/videogame'>
            <button className={Style.button}>Add a new videogame</button>
            </Link>
            </p>
        </div>
        <div className={Style.div3}>
            {currentVideogames.length > 0 ?
            currentVideogames?.map(videogame => {
                return (
                    videogame.msg ? <CardError /> :
                    videogame.dbError ? <CardDbError /> :
                    <div key={parseInt(videogame.id)}>
                    <Card name={videogame.name} image={videogame.image} rating={videogame.rating} genres={videogame.genres} id={videogame.id}/>
                    </div>
                )
            }) : <div className={Style.div4}>
                <Loader/>
            </div>
            }
        </div>
      </div>
    </div>
  );
}

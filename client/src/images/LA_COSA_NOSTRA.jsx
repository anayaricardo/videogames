import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllGames , filterGamesByGenre, filterCreatedOrExist, sortAlphabetically, sortByRating, getAllGenres} from '../../actions';
import { Link } from 'react-router-dom';
import Card from '../Card/Card'
import Pagination from '../Pagination/Pagination';
import SearchBar from '../Searchbar/Searchbar';
import CardError from '../CardError/CardError';
import CardDbError from '../CardDbError/CardDbError';
import { PageLoaderHome } from '../FullPageLoader/PageLoaderHome';
import { SecondaryButton } from '../otherStyles/styledbutton1';
import { MenuDivSty, ContainerGral, ContainerCard, SelectorSty, OptionStyl, LabelStyl, H1Styl, ContainerLoader } from './Home.elements';


export default function Home( ) {
    const dispatch = useDispatch() // para despachar acciones y sustitute al mapDispatchToProps
    let allVideogamesfromState = useSelector(state => state.videogames) // almacena todo lo que se encuentra en el estado de 'Videogames'
    const allGenres = useSelector(state => state.genres)
    // useSelector sustituye a mapStateToProps.
    const [currentPage, setCurrentPage ] = useState(1);
    const [header, setHeader] = useState('Explore all the Games')
    const [sort, setSort] = useState('') 
    const [vgPerPage, setVgPerPage] = useState(15)
    const indexOfLastVg = currentPage * vgPerPage //1 * 15 = 15
    const indexOfFirstVg = indexOfLastVg - vgPerPage // 15 - 15 = 0
    const currentVg = allVideogamesfromState.slice(indexOfFirstVg, indexOfLastVg)
    // Example for currentVg if position in page 2 = (60).slice((30-15),(2*15))
                                                //   (60).slice(15,30)
                                                // esto significa que mostrará los VG desde el 15 al 29
                                                // lo que resulta en un total de 15 videojuegos

    // Example for currentVg if position in page 1 = (60).slice((15-15),(1*15))
                                                //   (60).slice(0,15)
                                                // esto significa que mostrará los VG desde el 0 al 14
                                                // lo que resulta en un total de 15 videojuegos

    const pageNow = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const gameDetails = useSelector(state => state.gameDetail)

    //Para traernos los 'videogames' del 'state.videogames' cuando el componente 'Home' se carga, usamos useEffect.
    useEffect ( ()=> {
        if(!gameDetails.length){
            dispatch(getAllGames());
        }
    },[dispatch])
    
    //Para traernos los 'genres' del 'state.genres' cuando el componente 'Home' se carga, usamos useEffect.
    useEffect ( ()=> {
        dispatch(getAllGenres());
    },[dispatch])
    
    function handleClick (e) {
            e.preventDefault()
            window.location.reload()
        
    }
    
    function handleGenreFilter(e){
        e.target.value === 'All' ?
        dispatch(getAllGames()) &&
        setHeader('Explore all the Games') :
        dispatch(filterGamesByGenre(e.target.value))
        setCurrentPage(1);
        setHeader(`Filtered by: ${e.target.value} games`)
    }
    
    function handlefilterCreatedOrExist(e){
        e.target.value === "All" ? 
        dispatch(getAllGames()) :
        dispatch(filterCreatedOrExist(e.target.value))
        setCurrentPage(1);
        setHeader(`Filtered by Origin: ${e.target.value} games`)
        
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(sortAlphabetically(e.target.value))
        setCurrentPage(1);
        setSort(`Sorted by: ${e.target.value}`)
        setHeader(`Sorted by: ${e.target.value}`) // se agrega estado local 'Sort' para que se pueda renderizar el ordenamiento desde la página 1
    }
    function handleSort2(e){
        e.preventDefault();
        dispatch(sortByRating(e.target.value))
        setCurrentPage(1);
        setSort(`Sorted by: ${e.target.value}`) // se agrega estado local 'Sort' para que se pueda renderizar el ordenamiento desde la página 1
        setHeader(`Sorted by: ${e.target.value}`)
    }

    return (
        <div>
            
            <SearchBar setHeader={setHeader} setCurrentPage={setCurrentPage}></SearchBar>
            <H1Styl>{header}</H1Styl>
            <Pagination
                vgPerPage={vgPerPage}
                allVideogamesfromState={allVideogamesfromState.length}
                pageNow={pageNow}
            />
            <ContainerGral>
                <MenuDivSty>
                    
                    <p>
                        <LabelStyl>Sort by:</LabelStyl>
                        <SelectorSty onChange={e => handleSort2(e)}>
                            <OptionStyl hidden value='Select'> Rating </OptionStyl>
                            <OptionStyl value='Highest to Lowest Rating'> Highest to Lowest </OptionStyl>
                            <OptionStyl value='Lowest to Highest Rating'> Lowest to Highest </OptionStyl>
                        </SelectorSty>

                        <SelectorSty onChange={e => handleSort(e)}>
                            <OptionStyl hidden value='Alphabetically'> Alphabetically </OptionStyl>
                            <OptionStyl value='A - Z'> A - Z </OptionStyl>
                            <OptionStyl value='Z - A'> Z - A </OptionStyl>
                        </SelectorSty>
                    </p>
                    <p>
                        <LabelStyl>Filter by: </LabelStyl>
                        <SelectorSty onChange={e => handleGenreFilter(e)}>
                            <OptionStyl hidden value='Genre'> Genre </OptionStyl>
                            <OptionStyl value='All'> All </OptionStyl>
                        { allGenres?.map(el => (
                            <OptionStyl key={el.id} value={el.name}>{el.name}</OptionStyl>
                            ))
                        }
                        </SelectorSty>

                        <SelectorSty onChange={e=> handlefilterCreatedOrExist(e)} >
                            <OptionStyl hidden value='Origin'> Origin </OptionStyl>
                            <OptionStyl value='All'> All </OptionStyl>
                            <OptionStyl value='DB'> DB (Created) </OptionStyl>
                            <OptionStyl value='API'> API (Existent) </OptionStyl>
                        </SelectorSty>
                    </p>
                    <p>
                        <LabelStyl>Other actions: </LabelStyl>
                        <SecondaryButton onClick={ e => {handleClick(e)} }>Reset Results</SecondaryButton>
                        <Link to='/videogame'>
                            <SecondaryButton>Create Videogame</SecondaryButton>
                        </Link>
                    </p>
                </MenuDivSty>


                <ContainerCard>
                    {currentVg.length > 0 ?
                    currentVg?.map(el => {
                        return (
                            el.msg ? <CardError /> :
                            el.dbError ? <CardDbError /> :
                            <div key={parseInt(el.id)}>
                                    <Card name={el.name} image={el.image} rating={el.rating} genres={el.genres} id={el.id} />
                                </div>
                            )
                        }) : <ContainerLoader>
                            <PageLoaderHome />
                            </ContainerLoader>
                        
                        
                    }
                </ContainerCard>
            </ContainerGral>
        </div>
    )
}

export default function Pagination ({pageNow, allVideogamesfromState, vgPerPage}) {
    const pageNumbers = []

    for (let i = 1; i <=Math.ceil(allVideogamesfromState/vgPerPage); i++) {
        pageNumbers.push(i)
        }
    return (
        <nav>
            <CenterVSty> Pages: 
                { pageNumbers &&
                pageNumbers.map(num => {
                    return (
                    <LiSty key={num}>
                        <ButtonSty onClick={() => pageNow(num)}>{num}</ButtonSty>
                    </LiSty>
                    )
                })}
            </CenterVSty>
        </nav>
    )
}



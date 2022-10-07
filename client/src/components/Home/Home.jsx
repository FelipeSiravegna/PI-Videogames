import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getVideogames, getGenres, filterVideogamesByGenre, filterByCreator, sortByName} from "../../actions";
import Card from "../Card/Card.jsx";
import Paginado from "../Paginado/Paginado.jsx";
import s from './Home.module.css'

export default function Home(){

    const dispatch = useDispatch();
    //En allVideogames almaceno todo lo que está en el state videogames
    const allVideogames = useSelector((state) => state.videogames);
    //En genres almaceno todo lo que está en el state genres
    const genres = useSelector((state) => state.genres);

    const [currentPage, setCurrentPage] = useState(1);
    const [videogamesPerPage, setVideogamesPerPage] = useState(15);
    const indexOfLastVideogame = currentPage * videogamesPerPage; //15
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage; // 0
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame)
    const [orden, setOrden] = useState('');

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    //Cuando se monte el componente voy a despachar la action que trae todos los videogames
    useEffect(() => {
        dispatch(getVideogames());
        dispatch(getGenres());
    }, [dispatch])

    //Función que vuelve a pedír todos los videojuegos en caso de querer "resetear" la página
    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getVideogames());
    }

    const handleFilterGenre = (e) => {
        dispatch(filterVideogamesByGenre(e.target.value));
    }

    const handleFilterByCreator = (e) => {
        dispatch(filterByCreator(e.target.value));
    }

    const handleSortByName = (e) => {
        e.preventDefault();
        dispatch(sortByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Orden ${e.target.value}`)
    }

    const handleSortByRating = (e) => {
        e.preventDefault();

        setCurrentPage(1);
        setOrden(`Orden ${e.target.value}`)
    }
    return(
        <div>
            <div className={s.ordenamientosYFiltros}>
                {/* Ordenamientos */}
                <div className={s.ordenamientos}>
                    {/* Ordenamiento por orden alfabético */}   
                    <select onChange={e => handleSortByName(e)}>
                        <option value='ascAlpha'>Alphabetically (A-Z)</option>
                        <option value='descAlpha'>Alphabetically (Z-A)</option>
                    </select>
                    {/* Ordenamiento por rating */}   
                    <select>
                        <option value='ascRating'>Rating (Higher-Lower)</option>
                        <option value='descRating'>Rating (Lower-Higher)</option>
                    </select>
                </div>
                {/* Reload button */}
                <button onClick={e => {handleClick(e)}}>
                    Reload videogames
                </button>
                {/* Filtros */}
                <div className={s.filtros}>
                    {/* Por creador */}
                    <select onChange={e => handleFilterByCreator(e)}>
                        <option default>All</option>
                        <option value='false'>Api videogames</option>
                        <option value='true'>User created videogames</option>
                    </select>
                    {/* Por género */}
                    <select onChange={e => handleFilterGenre(e)}>
                        <option value='All' default>All</option>
                        {genres.map((g) => (
                            <option value={g.name}>{g.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <Paginado videogamesPerPage={videogamesPerPage} allVideogames={allVideogames.length} paginado={paginado}/>

            <div className={s.containerVideogameCards}>
                {
                    currentVideogames?.map((game) => {
                        return (  
                                <Card className={s.card} key={game.id} name={game.name} image={game.image} genres={game.genres} />
                        );
                    })
                }
            </div>
        </div>
    )
}
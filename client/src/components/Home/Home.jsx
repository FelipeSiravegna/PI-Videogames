import React from "react";
import { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getVideogames, getGenres } from "../../actions";
import Card from "../Card/Card.jsx";
import s from './Home.module.css'

export default function Home(){

    const dispatch = useDispatch();
    //En allVideogames almaceno todo lo que está en el state videogames
    const allVideogames = useSelector((state) => state.videogames);
    //En genres almaceno todo lo que está en el state genres
    const genres = useSelector((state) => state.genres);

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

    return(
        <div>
            <div className={s.ordenamientosYFiltros}>
                {/* Ordenamientos */}
                <div className={s.ordenamientos}>
                    {/* Ordenamiento por orden alfabético */}   
                    <select>
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
                    <select>
                        <option default>All</option>
                        <option value='Api'>Api videogames</option>
                        <option value='Created'>User created videogames</option>
                    </select>
                    {/* Por género */}
                    <select>
                        <option default>All</option>
                        {genres.map((g) => (
                            <option value={g.name}>{g.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            
            <div className={s.containerVideogameCards}>
                {
                    allVideogames?.map((game) => {
                        return (  
                                <Card className={s.card} key={game.id} name={game.name} image={game.image} genres={game.genres} />
                        );
                    })
                }
            </div>
        </div>
    )
}
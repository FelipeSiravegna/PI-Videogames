import React from "react";
import { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getVideogames, getGenres } from "../../actions";
import Card from "../Card/Card.jsx";
// import s from './Home.module.css'

export default function Home(){

    const dispatch = useDispatch();
    //En allVideogames almaceno todo lo que está en el state videogames
    const allVideogames = useSelector((state) => state.videogames);
    //En genres almaceno todo lo que está en el state genres
    const genres = useSelector((state) => state.genres);

    //Cuando se monte el componente voy a despachar la action que trae todos los videogames
    useEffect(() => {
        dispatch(getVideogames(), getGenres());
    }, [dispatch])

    //Función que vuelve a pedír todos los videojuegos en caso de querer "resetear" la página
    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getVideogames());
    }

    return(
        <div>
            <h1>Home</h1>
            <button onClick={e => {handleClick(e)}}>
                Reload videogames
            </button>
            {/* Ordenamientos */}
            <div>
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
            {/* Filtros */}
            <div>
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
            {
                allVideogames?.map((game) => {
                    return (  
                        <Card key={game.id} name={game.name} image={game.image} genres={game.genres} />
                    );
                })
            }
        </div>
    )
}
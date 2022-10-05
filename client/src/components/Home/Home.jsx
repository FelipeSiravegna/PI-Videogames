import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getVideogames } from "../../actions";
// import s from './Home.module.css'

export default function Home(){

    const dispatch = useDispatch();
    //En allVideogames almaceno todo lo que está en el state videogames
    const allVideogames = useSelector((state) => state.videogames);

    //Cuando se monte el componente voy a despachar la action que trae todos los videogames
    useEffect(() => {
        dispatch(getVideogames());
    }, [])

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
        </div>
    )
}
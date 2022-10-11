import React from "react";
import { Link } from "react-router-dom";
import s from './Card.module.css'

export default function Card({name, image, genres, rating, id}){
    return(
        <div className={s.cardDiv}>
            <Link to={`/videogame/${id}`}>
                <h3>{name}</h3>
            </Link>
            <img src={image} alt='game'/>
            <h4>{rating}</h4>
            <h5>{genres}</h5>
        </div>
    )
}
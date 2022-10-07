import React from "react";
import s from './Card.module.css'

export default function Card({name, image, genres, rating}){
    return(
        <div className={s.cardDiv}>
            <h3>{name}</h3>
            <img src={image} alt='game'/>
            <h4>{rating}</h4>
            <h5>{genres}</h5>
        </div>
    )
}
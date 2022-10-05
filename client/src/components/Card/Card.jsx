import React from "react";
// import s from './Card.module.css'

export default function Card({name, image, genres}){
    return(
        <div>
            <h3>{name}</h3>
            <img src={image} alt='game' width='150px' height='200px'/>
            <h5>{genres}</h5>
        </div>
    )
}
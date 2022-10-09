import React, { useState } from "react";
import { useDispatch } from "react-redux";
import s from './Searchbar.module.css'
import { getNameVideogames } from "../../actions/index";
import { NavLink } from "react-router-dom";

export default function Searchbar(){

    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getNameVideogames(name));
        setName('');
    }

    return(
        <div className={s.container}>
            <NavLink to={'/home'}>
                <h1 className={s.h1Searchbar}>Videogames App</h1>
            </NavLink>
            <NavLink to={'/videogame'}>
                <h3>Create</h3>
            </NavLink>
            <form 
                className={s.searchbarForm}>
                <input 
                    type='text' 
                    onChange={(e) => handleInputChange(e)} 
                    placeholder='Search...'
                />
                <button className={s.searchbarButton} onClick={(e) => handleSubmit(e)}>Search</button>
            </form>
        </div>
    )
}

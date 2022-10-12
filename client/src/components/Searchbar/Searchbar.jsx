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
            <NavLink to={'/home'} className={s.h3Searchbar}>
                <h3 className={s.searchBarH3}>VIDEOGAMES APP</h3>
            </NavLink>
            <NavLink to={'/videogame'} className={s.h3Searchbar}>
                <h3 className={s.searchBarH3} >CREATE</h3>
            </NavLink>
            <form 
                className={s.searchbarForm}>
                <input 
                    type='text' 
                    onChange={(e) => handleInputChange(e)}
                    value={name}
                    placeholder='Search...'
                    className={s.inputSearchbar}
                />
                <button className={s.searchbarButton} onClick={(e) => handleSubmit(e)}>GO!</button>
            </form>
        </div>
    )
}

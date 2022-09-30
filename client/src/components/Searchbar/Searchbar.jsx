import React, { useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import s from './Searchbar.module.css'
import { searchVideogame } from "../../actions";

export function Searchbar(props){

    const [videogameName, setVideogameName] = useState('');

    //Cada vez que se haga un cambio en el input se modifica el valor del state
    const handleChange = (e) => {
        let game = e.target.value;
        setVideogameName(game);
    }

    //Cuando se submitea se despacha la action que busca el videojuego con el nombre que estaba en el state y se resetea el state
    const handleSubmit = (e) => {
        e.preventDefault();
        searchVideogame(videogameName);
        setVideogameName('');
    }

    return(
        <div className={s.container}>
            <NavLink to={'/videogames'}>
                <h1 className={s.h1Searchbar}>Videogames App</h1>
            </NavLink>
            <form 
                onSubmit={handleSubmit} 
                className={s.searchbarForm}>
                <input 
                    type='text' 
                    value={videogameName}
                    onChange={handleChange} 
                    placeholder='Search...'
                />
                <button>Search</button>
            </form>
        </div>
    )
}

//-----------------------------------------------------
//ARREGLAR
//-----------------------------------------------------

//En this.props.search se encuentran todos los videogames de la búsqueda
function mapStateToProps(state){
    return{
        //this.props.search = store.getState().videogameSearch
        search: state.videogameSearch
    }
}

function mapDispatchToProps(dispatch){
    return{
        //searchVideogame recibe un nombre de videogame y despacha la action
        searchVideogame: videogameName => dispatch(searchVideogame(videogameName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
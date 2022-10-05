import React, { useState } from "react";
// import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import s from './Searchbar.module.css'
// import { searchVideogame } from "../../actions";

export default function Searchbar(props){

    const [videogameName, setVideogameName] = useState('');

    //Cada vez que se haga un cambio en el input se modifica el valor del state
    const handleChange = (e) => {
        let game = e.target.value;
        setVideogameName(game);
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
                // onSubmit={handleSubmit} 
                className={s.searchbarForm}>
                <input 
                    type='text' 
                    value={videogameName}
                    onChange={handleChange} 
                    placeholder='Search...'
                />
                {/* Cuando clickeo el botón me redirige a la página de búsqueda de un videojuego */}
                <NavLink to={`/videogames?name=${videogameName}`} >
                    <button className={s.searchbarButton}>Search</button>
                </NavLink>
            </form>
        </div>
    )
}

// //-----------------------------------------------------
// //ARREGLAR
// //-----------------------------------------------------

// //En this.props.search se encuentran todos los videogames de la búsqueda
// function mapStateToProps(state){
//     return{
//         //this.props.search = store.getState().videogameSearch
//         search: state.videogameSearch
//     }
// }

// function mapDispatchToProps(dispatch){
//     return{
//         //searchVideogame recibe un nombre de videogame y despacha la action
//         searchVideogame: videogameName => dispatch(searchVideogame(videogameName))
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
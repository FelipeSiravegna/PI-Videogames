import React, {useState, useEffect} from "react";
import {NavLink, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getGenres, postVideogame} from '../../actions'
import s from './CreateVideogame.module.css'

export default function CreateVideogame(){
    const dispatch = useDispatch();
    const genres = useSelector(state => state.genres);
    const [input, setInput] = useState({
        name: '',
        createdByUser: true,
        description: '',
        image: '',
        releaseDate: '',
        rating: '',
        platforms: [],
        genres: []
    })

    //Cuando se monte el component se ejecuta el dispatch
    useEffect(() => {
        dispatch(getGenres());
    }, [])

    const handleChange = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    const handleCheckbox = (e) => {
        if(e.target.checked){
            setInput({
                ...input,
                platforms: [...new Set([...input.platforms, e.target.value])],
                genres: [...new Set([...input.genres, e.target.value])]
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input);
        dispatch(postVideogame(input));
        alert('Videogame created!')
        setInput({
            name: '',
            createdByUser: true,
            description: '',
            image: '',
            releaseDate: '',
            rating: '',
            platforms: [],
            genres: []
        })
    }

    return(
        <div>
            <h1>Create A Videogame</h1>
            <form >
                <div>
                    <label>Nombre: </label>
                    <input type='text'  name='name' onChange={(e) => handleChange(e)}></input>
                </div>
                <div>
                    <label>Description: </label>
                    <input type='text'  name='description' onChange={(e) => handleChange(e)}></input>
                </div>
                <div>
                    <label>Image: </label>
                    <input type='text'  name='image' onChange={(e) => handleChange(e)} placeholder='URL' ></input>
                </div>
                <div>
                    <label>Release date: </label>
                    <input type='date'  name='releaseDate' onChange={(e) => handleChange(e)}></input>
                </div>
                <div>
                    <label>Rating: </label>
                    <input type='number' name='rating' onChange={(e) => handleChange(e)} placeholder='1 - 5'></input>
                </div>
                <div>
                    <label>Platforms: </label>
                    <label><input type='checkbox' value='PC' onChange={(e) => handleCheckbox(e)}/>PC</label>
                    <label><input type='checkbox' value='PS Vita' onChange={(e) => handleCheckbox(e)}/>PS Vita</label>
                    <label><input type='checkbox' value='PS1' onChange={(e) => handleCheckbox(e)}/>PS1</label>
                    <label><input type='checkbox' value='PS2' onChange={(e) => handleCheckbox(e)}/>PS2</label>
                    <label><input type='checkbox' value='PS3' onChange={(e) => handleCheckbox(e)}/>PS3</label>
                    <label><input type='checkbox' value='PS4' onChange={(e) => handleCheckbox(e)}/>PS4</label>
                    <label><input type='checkbox' value='PS5' onChange={(e) => handleCheckbox(e)}/>PS5</label>
                    <label><input type='checkbox' value='XBox' onChange={(e) => handleCheckbox(e)}/>XBox</label>
                    <label><input type='checkbox' value='XBox 360' onChange={(e) => handleCheckbox(e)}/>XBox 360</label>
                    <label><input type='checkbox' value='XBox ONE' onChange={(e) => handleCheckbox(e)}/>XBox ONE</label>
                    <label><input type='checkbox' value='XBox Series S/X' onChange={(e) => handleCheckbox(e)}/>XBox Series S/X</label>
                    <label><input type='checkbox' value='Android' onChange={(e) => handleCheckbox(e)}/>Android</label>
                    <label><input type='checkbox' value='Linux' onChange={(e) => handleCheckbox(e)}/>Linux</label>
                    <label><input type='checkbox' value='iOs' onChange={(e) => handleCheckbox(e)}/>iOs</label>
                    <label><input type='checkbox' value='macOS' onChange={(e) => handleCheckbox(e)}/>macOS</label>
                    <label><input type='checkbox' value='Wii' onChange={(e) => handleCheckbox(e)}/>Wii</label>
                    <label><input type='checkbox' value='Wii U' onChange={(e) => handleCheckbox(e)}/>Wii U</label>
                    <label><input type='checkbox' value='Nintendo switch' onChange={(e) => handleCheckbox(e)}/>Nintendo switch</label>
                </div>
                <div>
                    <label>Genres: </label>
                        {genres.map((genre) => (
                            <label><input type='checkbox' value={genre.name} name={genre.name} onChange={(e) => handleCheckbox(e)} key={genre.name}/>{genre.name}</label>
                        ))}
                    
                </div>
                <button onClick={(e) => handleSubmit(e)}>
                    Create videogame
                </button>
            </form>
        </div>
    )
}
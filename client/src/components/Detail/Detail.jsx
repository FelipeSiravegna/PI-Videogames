import React, {useEffect} from "react";
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getDetail} from '../../actions';
// import s from './Detail.module.css'

export default function Detail(props){
    const dispatch = useDispatch();

    //ComponentDidMount
    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
    }, [dispatch])

    const videogame = useSelector(state => state.detail)

    return(
        <div>
            {
                videogame?
                <div>
                    <h1>{videogame.name}</h1>
                    <img src={videogame.image}></img>
                    <h4>Description: {videogame.description}</h4>
                    <h4>Rating: {videogame.rating}</h4>
                    <h5>Genres: {videogame.genres}</h5>
                    <h5>Release date: {videogame.releaseDate}</h5>
                    <h5>Platforms: {videogame.platforms}</h5>
                </div>
                :
                <div>
                    <h1>Videogame does not exist!</h1>
                </div>
            }
            <Link to='/home'>
                <button>Go back</button>
            </Link>
        </div>
    )
}
import React, {useEffect} from "react";
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getDetail} from '../../actions';
import s from './Detail.module.css'

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
                <div className={s.container}>
                    <h1 className={s.title}>{videogame.name}</h1>
                    <img className={s.imgDetail} src={videogame.image}></img>
                    <div className={s.description} dangerouslySetInnerHTML={{ __html: videogame.description }}></div>
                    <h4 className={s.texts}>RATING: {videogame.rating}</h4>
                    <h5 className={s.texts}>GENRES: {videogame.genres}</h5>
                    <h5 className={s.texts}>RELEASE DATE: {videogame.releaseDate}</h5>
                    <h5 className={s.texts}>PLATFORMS: {videogame.platforms}</h5>
                </div>
                :
                <div>
                    <h1>Videogame does not exist!</h1>
                </div>
            }
            <Link to='/home'>
                <button className={s.backButton}>GO BACK</button>
            </Link>
        </div>
    )
}
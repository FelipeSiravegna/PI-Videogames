import React from 'react';
import { useHistory } from "react-router-dom";
import s from './LandingPage.module.css';

export default function LandingPage(){
    const history = useHistory();
    const handleClick = () => {
        history.push('/home');
    }
    
    return(
        <div className={s.background}>
            <div className={s.container}>
                <h1 className={s.text}>WELCOME</h1>
                <h2 className={s.text}>TO THE VIDEOGAME APP</h2>
                <div className={s.button}>
                    <button className={s.letsPlay} onClick={handleClick}>
                        PLAY
                    </button>
                </div>
            </div>
        </div>
    )
}

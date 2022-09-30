import React from 'react';
import s from './LandingPage.module.css';

export default function LandingPage(){
    return(
        <div className={s.background}>
            <div className={s.container}>
                <h1 className={s.text}>WELCOME</h1>
                <h2 className={s.text}>TO THE VIDEOGAME APP</h2>
                <div className={s.button}>
                    <button className={s.letsPlay}>LETS PLAY!</button>
                </div>
            </div>
        </div>
    )
}
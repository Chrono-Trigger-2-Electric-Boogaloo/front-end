import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const LandingPage = () => {

    const history = useHistory()
    // const nextPage = () => history.push('/index2');

    // useEffect(() => {
    //     document.addEventListener('keydown', e => {
    //         document.removeEventListener('keydown', nextPage)
    //         nextPage()
    //     })
    // }, [])

    const eventthing = () =>{
        document.removeEventListener('keydown', eventthing)
        history.push('/index2')
    }
useEffect(() => {
        document.addEventListener('keydown', eventthing)
    }, [])

    return(
        <div className='landing-page'>
            <img src='./landing.jpeg' />
            <h2>PRESS ANY KEY TO START</h2>
        </div>
    )
}

export default LandingPage;
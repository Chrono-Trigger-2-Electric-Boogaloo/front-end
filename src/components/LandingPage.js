import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const LandingPage = () => {
    const history = useHistory()
    useEffect(() => {
        document.addEventListener('keydown', e => history.push('/index2'))
    }, [])
    return(
        <div className='landing-page'>
            <img src='./landing.jpeg' />
            <h2>PRESS ANY KEY TO START</h2>
        </div>
    )
}

export default LandingPage;
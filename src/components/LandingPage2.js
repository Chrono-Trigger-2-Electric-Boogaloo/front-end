import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage2 = () => {
    return (
        <div className='main-container'>
            <img className='bg-img' src='./mainbg.jpeg' />
            <div className='menu'>
            <Link to='/signup'><h2>New Game</h2></Link>
            <Link to='/signin'><h2>Continue</h2></Link>
            </div>
        </div>
    )
}

export default LandingPage2
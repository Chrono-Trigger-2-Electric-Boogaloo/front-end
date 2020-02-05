import React, { useReducer } from 'react'
import { charSelect, initChar } from '../reducers/charReducer'

const GameScreen = ({ charXPosition, charYPosition, state }) => {

    const charStyle ={
        transform: `translate(${charXPosition}px, ${charYPosition}px)`
    }

    return(
        <div className='game-screen-container'>
            <div className='game-bg'>
                <img src='./field.png' />
                <div style={charStyle} className='game-char'>
                    <img src={`./${state.current}.png`}/>
                </div>
            </div>
        </div>
    )
}

export default GameScreen
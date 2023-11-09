import React from 'react'

const GameScreen = ({ charXPosition, charYPosition, state, currentMap }) => {
    const charStyle ={
        transform: `translate(${charXPosition}px, ${charYPosition}px)`,
        transition: "0.3s"
    }

    return(
        <div className='game-screen-container'>
            <div className='game-bg'>
                <img src={`./${currentMap}.png`} />
                <div style={charStyle} className='game-char'>
                    <img src={`./${state.current}.png`}/>
                </div>
            </div>
        </div>
    )
}

export default GameScreen
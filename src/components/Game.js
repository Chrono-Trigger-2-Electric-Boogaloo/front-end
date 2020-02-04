import React from 'react';
import GameScreen from './GameScreen';
import MoveButtons from './MoveButtons';

const Game = () => {

    return(
        <div className='game-container'>
            <div className='game-left'>
                <GameScreen />
            </div>
            <div className='game-right'>
                <MoveButtons />
            </div>
        </div>
    )
}

export default Game
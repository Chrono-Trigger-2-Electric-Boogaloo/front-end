import React, { useState, useEffect, useReducer } from 'react';
import GameScreen from './GameScreen';
import MoveButtons from './MoveButtons';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { charSelect, initChar } from '../reducers/charReducer';

const Game = () => {

    const [charXPosition, setCharXPosition] = useState(0)
    const [charYPosition, setCharYPosition] = useState(0)
    const [state, dispatch] = useReducer(charSelect, initChar)
    useEffect(()=>{
            axiosWithAuth()
            .get('https://cs-build-1.herokuapp.com/api/adv/init/')
            .then(res => {
                console.log(res)
                // let title = res.data.title
                // title = title.split(',')
                // 
            })
                  .catch(err => console.log(err.response))
    },[])

    return(
        <div className='game-container'>
            <div className='game-left'>
                <GameScreen 
                    charXPosition={charXPosition} 
                    charYPosition={charYPosition} 
                    state={state} 
                    dispatch={dispatch}
                    />
            </div>
            <div className='game-right'>
                <MoveButtons 
                    state={state} 
                    dispatch={dispatch} 
                    charXPosition={charXPosition} 
                    setCharXPosition={setCharXPosition} 
                    charYPosition={charYPosition} 
                    setCharYPosition={setCharYPosition}
                    />
            </div>
        </div>
    )
}

export default Game
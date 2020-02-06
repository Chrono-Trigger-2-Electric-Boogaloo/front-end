import React, { useState, useEffect, useReducer } from 'react';
import GameScreen from './GameScreen';
import MoveButtons from './MoveButtons';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { charSelect, initChar } from '../reducers/charReducer';

const Game = () => {

    const [charXPosition, setCharXPosition] = useState(null)
    const [charYPosition, setCharYPosition] = useState(null)
    const [currentMap, setCurrentMap] = useState();
    const [state, dispatch] = useReducer(charSelect, initChar)
    const [desc, setDesc] = useState('')
    useEffect(()=>{
        console.log('here')
            axiosWithAuth()
            .get('https://chronotrigger-remake.herokuapp.com/api/adv/init/')
            .then(res => {
                console.log(res)
                let title = res.data.title
                title = title.split(',')
                setCharYPosition(parseInt(title[0])*-32)
                setCharXPosition(parseInt(title[1])*32)
                setCurrentMap(res.data.description)
                setDesc(res.data.description)
            })
                  .catch(err => console.log(err.response))
    },[])
    return(
        <div className='main-container' >
            <img className='bg-img' src='./mainbg.jpeg' />
        <div className='game-container'>
            <div className='game-left'>
                {charXPosition != null && charXPosition != null ?
                <GameScreen 
                charXPosition={charXPosition} 
                charYPosition={charYPosition} 
                state={state} 
                dispatch={dispatch}
                currentMap={currentMap}
                />: null
            }
            </div>
            <div className='game-right'>
                <MoveButtons 
                    state={state} 
                    dispatch={dispatch} 
                    charXPosition={charXPosition} 
                    setCharXPosition={setCharXPosition} 
                    charYPosition={charYPosition} 
                    setCharYPosition={setCharYPosition}
                    setCurrentMap={setCurrentMap}
                    currentMap={currentMap}
                    desc={desc}
                    setDesc={setDesc}
                    />
            </div>
        </div>
        </div>
    )
}

export default Game
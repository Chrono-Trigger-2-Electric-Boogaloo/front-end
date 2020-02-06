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
    const [modalTrigger, setModalTrigger] = useState('')

    const closeModal = () => {
        document.removeEventListener('keydown', closeModal)
        setModalTrigger('')
    }

    useEffect(() => {
        console.log(currentMap)
        if (currentMap=== 'dungeon'){
            if(charYPosition === -64 && charXPosition === 96){
                console.log(modalTrigger)
                setModalTrigger('key')
                document.addEventListener('keydown', closeModal)
            }
        } else if (currentMap === 'house'){
            console.log(charYPosition, charXPosition)
            if (charXPosition === 96 && charYPosition === -96 || charYPosition === -64){
                setModalTrigger('message')
                document.addEventListener('keydown', closeModal)
            }
            
        }
    }, [charXPosition, charYPosition])

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
            <div className='modals'>
                {modalTrigger === 'key' ? <p>You got the key! <br/> <span className='cont-txt'>PRESS ANY KEY TO CONTINUE</span></p> : modalTrigger === 'message' ? <p>There's a message here.<br/> <span className='cont-txt'>PRESS ANY KEY TO CONTINUE</span></p> : null}
            </div>
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
import React, { useState, useReducer, useContext, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { MainContext } from '../contexts/MainContext';
// import { charSelect, initChar } from '../reducers/charReducer';


const MoveButtons = ({ setCharXPosition, setCharYPosition,state, dispatch, setCurrentMap, desc, setDesc, modalTrigger}) => {
    const {unlockedDoor, unlockedBasement, currentMap, charXPosition, charYPosition} = useContext(MainContext)
    

        const movePlayer = (dir) => {
     
            if (unlockedDoor === false && currentMap === 'house' && charYPosition === -160 && charXPosition === 0 && dir === 'w'){
                return
            } else if (unlockedBasement == false && currentMap === 'house' && charYPosition === -256 && charXPosition === 32 && dir === 'w'){
                return
            }
            
            axiosWithAuth()
            .post('https://chronotrigger-remake.herokuapp.com/api/adv/move/', {"direction": dir})
            .then(res => {
                if(res.data.error_msg == ""){
                    let title = res.data.title
                    title = title.split(',')
                    setCharYPosition(parseInt(title[0])*-32)
                    setCharXPosition(parseInt(title[1])*32)
                    if(res.data.description != currentMap){
                        setCurrentMap(res.data.description);
                    }
                } else{
                    
                }
                    setDesc(res.data.description)
                })
                .catch(err => console.log(err))
        }

    return(
        <div className='right-container'>
            <p className='world-desc'>{desc=="field" ? "FIELD OF AGONY": desc=="dungeon" ? "HAPPY CLAM DUNGEON" : desc=="house" ? "ABODE OF BABY CHIMKIN" : desc=="basement" ? "PEEPERS CAVERN" : null}</p>
        <div className='movement-buttons'>
            <img src='./uparrow.png' onClick={()=>movePlayer('n')} />
            <div className='center-buttons'>
            <img className='left-arrow' src='./leftarrow.png' onClick={()=>movePlayer('w')}/>
            <img src='./rightarrow.png' onClick={()=>movePlayer('e')} />
            </div>
            <img src='./downarrow.png' onClick={()=>movePlayer('s')} />
        </div>
        {state.avail.map(char => <img src={`./${char}.png`} onClick={()=>dispatch({type: 'SET_CHAR', payload: char})}/>)}
        </div>
    )
}

export default MoveButtons

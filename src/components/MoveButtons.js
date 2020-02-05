import React, { useState, useReducer, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
// import { charSelect, initChar } from '../reducers/charReducer';

const MoveButtons = ({ charXPosition, setCharXPosition, charYPosition, setCharYPosition,state, dispatch, currentMap, setCurrentMap, desc, setDesc }) => {

    useEffect(() => {
        document.addEventListener('keydown', event => {
            console.log(event)
        })
    })
    // const [state, dispatch] = useReducer(charSelect, initChar)

        const movePlayer = (dir) => {
          axiosWithAuth()
          .post('https://chronotrigger-remake.herokuapp.com/api/adv/move/', {"direction": dir})
          .then(res => {
              if(res.data.error_msg == ""){
                  console.log(res);
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
            <p>{desc=="field" ? "THE FIELD OF AGONY": desc=="dungeon" ? "HAPPY CLAM DUNGEON" : desc=="house" ? "BABY CHIMKIN'S ABODE" : desc=="basement" ? "PEEPER'S CAVERN" : null}</p>
        <div className='movement-buttons'>
            <img src='./uparrow.png' onClick={()=>movePlayer('n')} />
            <div>
            <img className='left-arrow' src='./leftarrow.png' onClick={()=>movePlayer('w')}/>
            <img src='./rightarrow.png' onClick={()=>movePlayer('e')} />
            </div>
            <img src='./downarrow.png' onClick={()=>movePlayer('s')} />
        </div>
        {state.avail.map(char => <img src={`./${char}.png`} onClick={()=>dispatch({type: 'SET_CHAR', payload: char})}/>)}
        {/* <img src='./julie.png' /><img src='./ryan.png'/><img src='./isla.png'/> */}
        </div>
    )
}

export default MoveButtons
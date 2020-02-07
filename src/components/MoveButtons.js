import React, { useState, useReducer, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
// import { charSelect, initChar } from '../reducers/charReducer';

const MoveButtons = ({ charXPosition, setCharXPosition, charYPosition, setCharYPosition,state, dispatch, currentMap, setCurrentMap, desc, setDesc }) => {

    useEffect(() => {
        document.addEventListener('keydown', event => {
            console.log(charXPosition, charYPosition)
            switch(event.key) {
                case 'a':
                    console.log('w')
                    movePlayer('w')
                    break
                case 'w':
                    console.log('n')
                    movePlayer('n')
                    break
                case 'd':
                    console.log('e')
                    movePlayer('e')
                    break
                case 's':
                    console.log('s')
                    movePlayer('s')
                    break
                default:
                    console.log('hi')
                    
            }
        })
    },[])
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
            <p className='world-desc'>{desc=="field" ? "FIELD OF AGONY": desc=="dungeon" ? "HAPPY CLAM DUNGEON" : desc=="house" ? "ABODE OF BABY CHIMKIN" : desc=="basement" ? "PEEPERS CAVERN" : null}</p>
        <div className='movement-buttons'>
            <img src='./wup.png' onClick={()=>movePlayer('n')} />
            <div className='center-buttons'>
            <img className='left-arrow' src='./aleft.png' onClick={()=>movePlayer('w')}/>
            <img src='./dright.png' onClick={()=>movePlayer('e')} />
            </div>
            <img src='./sdown.png' onClick={()=>movePlayer('s')} />
        </div>
        {state.avail.map(char => <img src={`./${char}.png`} onClick={()=>dispatch({type: 'SET_CHAR', payload: char})}/>)}
        {/* <img src='./julie.png' /><img src='./ryan.png'/><img src='./isla.png'/> */}
        </div>
    )
}

export default MoveButtons
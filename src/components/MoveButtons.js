import React, { useState, useReducer, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
// import { charSelect, initChar } from '../reducers/charReducer';

const MoveButtons = ({ charXPosition, setCharXPosition, charYPosition, setCharYPosition,state, dispatch, currentMap, setCurrentMap, desc, setDesc, unlockedBasement, unlockedDoor, setUnlockedBasement, setUnlockedDoor, setBlocked}) => {

    console.log(`current map: ${currentMap}`)
    console.log(`(x, y): (${charXPosition}, ${charYPosition})`)

    useEffect(() => {
        document.addEventListener('keydown', event => {
            switch(event.key) {
                case 'a':
                    movePlayer('w')
                    break
                case 'w':
                    movePlayer('n')
                    break
                case 'd':
                    movePlayer('e')
                    break
                case 's':
                    movePlayer('s')
                    break
                default:
                    console.log('hi')
                    
            }
        })
    },[])
    // const [state, dispatch] = useReducer(charSelect, initChar)

        const movePlayer = (dir) => {
            // setBlocked(false)
            // console.log(unlockedDoor)
            // console.log(unlockedBasement)
            // console.log(currentMap)
            // console.log(charXPosition)
            // console.log(charYPosition)


            // if (unlockedDoor == false && currentMap == 'house' && (charXPosition == 0 && charYPosition == -160)) {
            //     console.log('nope here')
            //     setBlocked(true)
            //     return
            // }
            // if (unlockedBasement == false && currentMap == 'house' && (charXPosition == 32 && charYPosition == -256)) {
            //     console.log('nope there')
            //     setBlocked(true)
            //     return
            // }
            if (unlockedDoor === false && currentMap === 'house' && charYPosition === -160 && charXPosition === 0 && dir === 'w'){
                return
            } else if (unlockedBasement == false && currentMap === 'house' && charYPosition === -256 && charXPosition === 32 && dir === 'w'){
                return
            }
            
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
import React, { useState, useReducer } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
// import { charSelect, initChar } from '../reducers/charReducer';

const MoveButtons = ({ charXPosition, setCharXPosition, charYPosition, setCharYPosition,state, dispatch }) => {

    const [desc, setDesc] = useState('')
    // const [state, dispatch] = useReducer(charSelect, initChar)

        const movePlayer = (dir) => {
          axiosWithAuth()
          .post('http://cs-build-1.herokuapp.com/api/adv/move/', {"direction": dir})
          .then(res => {
              if(res.data.error_msg == ""){
                  console.log(charXPosition, charYPosition)
                  if (dir === 'n'){
                      setCharYPosition(charYPosition - 32)
                    } else if (dir === 's'){
                        setCharYPosition(charYPosition + 32)
                    } else if (dir === 'e'){
                        setCharXPosition(charXPosition + 32)
                    } else if (dir === 'w'){
                        setCharXPosition(charXPosition - 32)
                    }
                } else{
                    
                }
                    setDesc(res.data.description)
                })
                .catch(err => console.log(err))
        }

    return(
        <div className='right-container'>
            <p>{desc}</p>
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
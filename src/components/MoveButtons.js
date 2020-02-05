import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const MoveButtons = () => {

    const [desc, setDesc] = useState('')

        const movePlayer = (dir) => {
          axiosWithAuth()
          .post('http://cs-bw1-be.herokuapp.com/api/adv/move/', {"direction": dir})
          .then(res => {
              console.log(res)
              setDesc(res.data.description)
          })
          .catch(err => console.log(err))
        }

    return(
        <div className='right-container'>
            <p>{desc}</p>
        <div className='movement-buttons'>
            <img src='./leftarrow.png' onClick={()=>movePlayer('w')}/>
            <img src='./rightarrow.png' onClick={()=>movePlayer('e')} />
            <img src='./uparrow.png' onClick={()=>movePlayer('n')} />
            <img src='./downarrow.png' onClick={()=>movePlayer('s')} />
        </div>
        </div>
    )
}

export default MoveButtons
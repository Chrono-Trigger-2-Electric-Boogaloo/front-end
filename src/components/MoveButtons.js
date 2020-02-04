import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from './utils/axiosWithAuth';

const MoveButtons = () => {

    useEffect(()=> {
        const movePlayer = () => {
          axiosWithAuth()
          .post('http://cs-bw1-be.herokuapp.com/api/adv/move/', {"direction":"s"})
          .then(res => console.log(res))
          .catch(err => console.log(err))
        }
        movePlayer()
      }, [])

    return(
        <div className='movement-buttons'>

        </div>
    )
}

export default MoveButtons
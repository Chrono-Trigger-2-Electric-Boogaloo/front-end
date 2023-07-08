import React, { useState, useEffect, useReducer } from 'react';
import GameScreen from './GameScreen';
import MoveButtons from './MoveButtons';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { charSelect, initChar } from '../reducers/charReducer';
import ReactPlayer from 'react-player';
import { MainContext } from '../contexts/MainContext';

const Game = (props) => {
	console.log(props)

    const [charXPosition, setCharXPosition] = useState(null)
    const [charYPosition, setCharYPosition] = useState(null)
    const [currentMap, setCurrentMap] = useState();
    const [state, dispatch] = useReducer(charSelect, initChar)
    const [desc, setDesc] = useState('')
	const [modalTrigger, setModalTrigger] = useState('')
	const [specialRoom, setSpecialRoom] = useState();
	const [gameRunning, setGameRunning] = useState(true);
    const [unlockedBasement, setUnlockedBasement] = useState(false)
    const [unlockedDoor, setUnlockedDoor] = useState(false)
	// const [isblocked, setBlocked] = useState(false)
	const [music, setMusic] = useState();

	
	

	const endGame = () =>{
        setGameRunning(false);
    }

    const closeModal = () => {
        //document.removeEventListener('keydown', closeModal)
        setModalTrigger('')
	}

	const closeCrystalModal = () => {
		props.music.pause();
		setModalTrigger('')
		setSpecialRoom('video')
	}
	
    const getKey = () => {
        setUnlockedBasement(true)
        closeModal()
    }

    const getMessage = () => {
        setUnlockedDoor(true)
        closeModal()
    }

    useEffect(() => {
        if (currentMap=== 'dungeon'){
            if(charYPosition === -64 && charXPosition === 96){
                setModalTrigger('key')
                //document.addEventListener('keydown', closeModal)
            }
        } else if (currentMap === 'house'){
            
            if (charXPosition === 96 && charYPosition === -96 || charXPosition === 96 && charYPosition === -64){
                setModalTrigger('message')
                //document.addEventListener('keydown', closeModal)
            } else if (charYPosition === -160 && charXPosition === 0 && unlockedDoor === false){ //add unlocked conditional
                setModalTrigger('door')
            } else if (charYPosition === -256 && charXPosition === 32 && unlockedBasement === false){
                setModalTrigger('trapdoor')
            }
            
        } else if (currentMap === 'basement'){
            if (charXPosition === 160 && charYPosition ===-192){
                setModalTrigger('crystal')
            }
        }
    }, [charXPosition, charYPosition])

    useEffect(()=>{
            axiosWithAuth()
            .get('http://127.0.0.1:8000/api/adv/init/')
            .then(res => {
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
        <div className={
					specialRoom !== 'video' 
						? 'game-container'
						: 'game-container hide-container'
				}>
            <div className='game-left'>
                {charXPosition != null && charXPosition != null ?
                <GameScreen 
                charXPosition={charXPosition} 
                charYPosition={charYPosition} 
                state={state} 
                dispatch={dispatch}
				currentMap={currentMap}
				specialRoom={specialRoom}
				setSpecialRoom={setSpecialRoom}
                />: null
            }
            {modalTrigger ? 
            <div className='modals'>
                {function(){
                    switch(modalTrigger){
                        case 'key':
                          return (<><p>'About time you showed up!' <br/>You recieved a KEY<br/> </p> 
                          <button onClick={getKey}><span className='cont-text'></span>Continue</button></>)
                        case 'message':
                            return (<><p>There's a message on the table. <br/> <span className='table-message'>You're probably wondering what you're doing here. Don't we all... To find out, seek the hidden path to find the answer to all things.</span></p>  
                            <button onClick={getMessage}><span className='cont-text'></span>Continue</button></>)
                        case 'door':
                            return (<><p>You have a feeling you're forgetting something...</p>
                             <button onClick={closeModal}><span className='cont-text'></span>Continue</button></>)
                        case 'trapdoor':
                            return (<><p>It's a trap door! It seems to be locked</p>
                            <button onClick={closeModal}><span className='cont-text'></span>Continue</button></>)
                        case 'crystal':
                            return (<><p>You gaze into the crystal ball, but swirling smoke obscures your vision.</p>
                             <button onClick={closeCrystalModal}><span className='cont-text'></span>Look Closer</button></>)
                        default:
                            return null  
                    }
                }()}
                {/* {modalTrigger === 'key' ? <p>'About time you showed up!' <br/>You recieved a KEY<br/> </p> : modalTrigger === 'message' ? <p>There's a message here.</p> : modalTrigger === 'door' ? <p>You have a feeling you're forgetting something...</p> : modalTrigger === 'trapdoor' ? <p>It's a trap door! It seems to be locked</p> : null} */}
           
            </div> : null}
            </div>
            <div className='game-right'>
                <MainContext.Provider value={{unlockedDoor, unlockedBasement, currentMap, charXPosition, charYPosition}}>
                    <MoveButtons 
                        state={state} 
                        dispatch={dispatch} 
                        // charXPosition={charXPosition} 
                        setCharXPosition={setCharXPosition} 
                        // charYPosition={charYPosition} 
                        setCharYPosition={setCharYPosition}
                        setCurrentMap={setCurrentMap}
                        // currentMap={currentMap}
                        desc={desc}
                        setDesc={setDesc}
                        modalTrigger={modalTrigger}
                        // unlockedBasement={unlockedBasement}
                        // setUnlockedBasement={setUnlockedBasement}
                        // unlockedDoor={unlockedDoor}
                        // setUnlockedDoor={setUnlockedDoor}
                        // setBlocked={setBlocked}
                        specialRoom={specialRoom}
						setSpecialRoom={setSpecialRoom}
                    />
                </MainContext.Provider>
            </div>
        </div>
		{gameRunning && specialRoom == 'video' && modalTrigger=='' &&  (
				<ReactPlayer
					url="credits.mp4"
					playing
					className="video-credits"
					width="444px"
					onEnded={endGame}
				/>
			)}
        </div>
    )
}

export default Game;

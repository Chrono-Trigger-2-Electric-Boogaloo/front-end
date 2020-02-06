import React, { useState, useEffect, useReducer } from 'react';
import GameScreen from './GameScreen';
import MoveButtons from './MoveButtons';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { charSelect, initChar } from '../reducers/charReducer';
import ReactPlayer from 'react-player';

const Game = () => {
	const [charXPosition, setCharXPosition] = useState(null);
	const [charYPosition, setCharYPosition] = useState(null);
	const [currentMap, setCurrentMap] = useState();
	const [state, dispatch] = useReducer(charSelect, initChar);
	const [desc, setDesc] = useState('');
	const [specialRoom, setSpecialRoom] = useState();
	useEffect(() => {
		console.log('here');
		axiosWithAuth()
			.get('https://chronotrigger-remake.herokuapp.com/api/adv/init/')
			.then(res => {
				console.log(res);
				let title = res.data.title;
				title = title.split(',');
				setCharYPosition(parseInt(title[0]) * -32);
				setCharXPosition(parseInt(title[1]) * 32);
				if (title[2]) {
					// alert(title[2])
					// alert(title[2])
					setSpecialRoom(title[2]);
				} else {
					setSpecialRoom();
				}
				setCurrentMap(res.data.description);
				setDesc(res.data.description);
			})
			.catch(err => console.log(err.response));
	}, []);
	return (
		<div className="main-container">
			<img className="bg-img" src="./mainbg.jpeg" />
			{/* {specialRoom !== 'video' && ( */}
				<div className={specialRoom !== "video" ? "game-container": "game-container hide-container"}>
					<div className="game-left">
						{charXPosition != null && charXPosition != null ? (
							<GameScreen
								charXPosition={charXPosition}
								charYPosition={charYPosition}
								state={state}
								dispatch={dispatch}
								currentMap={currentMap}
								specialRoom={specialRoom}
								setSpecialRoom={setSpecialRoom}
							/>
						) : null}
					</div>
                    <div 
                    className={specialRoom !== "video" ? "game-right": "game-right hide-container"}>
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
							specialRoom={specialRoom}
							setSpecialRoom={setSpecialRoom}
						/>
					</div>
				</div>
			{/* )} */}
            {specialRoom == "video" && 
            <ReactPlayer url='credits.mp4' playing className="video-credits" width ="444px" />
            }
		</div>
	);
};

export default Game;

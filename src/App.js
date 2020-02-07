import React, {useEffect} from 'react';
import { Route, Switch } from "react-router-dom";
import PrivateRoute from './utils/PrivateRoute'
import SignIn from './components/SignIn';
import SignUp from './components/SignUp'
import './App.css';
import Game from './components/Game'
import LandingPage from './components/LandingPage';
import LandingPage2 from './components/LandingPage2';

function App() {
  let music = new Audio('bgmusic.mp3');

  const playMusic = () =>{
    document.removeEventListener('click', playMusic)
    music.play();
    music.loop = true;
    
    // music.addEventListener('ended', new Audio('bgmusic.mp3').play())
  }

  useEffect(()=>{
    document.addEventListener('click', playMusic)
	},[])
  return (
    <div className="App">
      <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/index2" component={LandingPage2} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />
      <PrivateRoute path="/play" component={()=><Game music={music} />} />
      </Switch>
    </div>
  );
}

export default App;

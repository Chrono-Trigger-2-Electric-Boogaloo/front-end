import React, { useEffect } from 'react';import SignIn from './components/SignIn';
import SignUp from './components/SignUp'

import './App.css';
import Game from './components/Game'

function App() {

  return (
    <div className="App">
      <SignUp />
      <SignIn/>
      <Game />
    </div>
  );
}

export default App;

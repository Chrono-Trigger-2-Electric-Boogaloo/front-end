import React, { useEffect } from 'react';
import { Route } from "react-router-dom";
import PrivateRoute from './utils/PrivateRoute'
import SignIn from './components/SignIn';
import SignUp from './components/SignUp'
import './App.css';
import Game from './components/Game'

function App() {

  return (
    <div className="App">
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />
      <PrivateRoute path="/play" component={Game} />

    </div>
  );
}

export default App;

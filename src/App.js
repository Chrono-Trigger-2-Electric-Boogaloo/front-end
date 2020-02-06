import React from 'react';
<<<<<<< HEAD
import { Route } from "react-router-dom";
=======
import { Route, Switch } from "react-router-dom";
>>>>>>> 5bea170d8a3845ecf24cfc7e1f47591a417432b1
import PrivateRoute from './utils/PrivateRoute'
import SignIn from './components/SignIn';
import SignUp from './components/SignUp'
import './App.css';
import Game from './components/Game'
import LandingPage from './components/LandingPage';
import LandingPage2 from './components/LandingPage2';

function App() {

  return (
    <div className="App">
      <Switch>
      <Route exact path="/index" component={LandingPage} />
      <Route path="/index2" component={LandingPage2} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />
      <PrivateRoute path="/play" component={Game} />
      </Switch>
    </div>
  );
}

export default App;

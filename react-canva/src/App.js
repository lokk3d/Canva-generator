import React, { useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import { useDispatch, useSelector } from "react-redux"

import Login from './components/authPage/Login';
import Register from './components/authPage/Register';
import NoLoggedNavBar from './components/navBar/NoLoggedNavBar';
import LoggedNavBar from './components/navBar/LoggedNavBar';

import Home from './components/homePage/Home';
import { loadToken } from './components/authPage/authReducer';
import CanvasPage from './components/canvas/CanvasPage';
import ManualRedirectLogin from './components/ManualRedirectLogin';

/*
Cosa fa l'app? 
Ti consente di creare un canva personalizzato con campi personalizzati
In ogni campo ci sono titolo, descrizione e dei postit
Questi postit possono essere aggiungi o rimossi 
*/


function App() {

  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(loadToken())
  },[])

  return (
    <div style={{backgroundColor:"rgba(0,0,0,0.1)", height:"100%"}}>
      <Router>

        {/* <TestComponent /> */}

        {
          (auth.loggedIn) ?
          <div>
            <LoggedNavBar />
            <Switch>
            <Route path="/app">
              <Home />
            </Route>
            <Route path="/login">
              <ManualRedirectLogin />
            </Route>
            <Route path="/canvas/:id" component={CanvasPage} />
            </Switch>
          </div>
          :
            <div>
              <NoLoggedNavBar />
              <Switch>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/signup">
                  <Register />
                </Route>
                <Route path="/">
                  <div>Home...</div>
                </Route>
              </Switch>
            </div>
        }

      </Router>
    </div>
  );
}

export default App;

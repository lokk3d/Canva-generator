import React, { useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";


import { useDispatch, useSelector } from "react-redux"

import Login from './components/pages/Login';
import Register from './components/pages/Register';
import NoLoggedNavBar from './components/navBar/NoLoggedNavBar';
import LoggedNavBar from './components/navBar/LoggedNavBar';

import Home from './components/pages/Home';
import { loadToken } from './components/authPage/authReducer';
import CanvasPage from './components/pages/CanvasPage';
import ManualRedirectLogin from './components/pages/ManualRedirectLogin';
import LandingPage from './components/pages/LandingPage';
import NavBar from './components/navBar/NavBar';

/*
Cosa fa l'app? 
Ti consente di creare un canva personalizzato con campi personalizzati
In ogni campo ci sono titolo, descrizione e dei postit
Questi postit possono essere aggiungi o rimossi 
*/


function App() {

  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadToken())
  }, [])

  return (
    <div style={{ backgroundColor: "rgba(0,0,0,0.1)", height: "100%" }}>
      <Router>

        {
          (auth.loggedIn) ?
            <NavBar>
              <LoggedNavBar />
            </NavBar>
            :
            <NavBar>
              <NoLoggedNavBar />
            </NavBar>
        }

        {
          (auth.loggedIn) ?
            <div>
              <Switch>
                <Route path="/app">
                  <Home />
                </Route>
                <Route path="/login">
                  <ManualRedirectLogin />
                </Route>
                <Route path="/canvas/:id" component={CanvasPage} />
                <Route path="/" >
                  <Redirect
                    to={{
                      pathname: "/app",
                    }}
                  />
                </Route>
              </Switch>
            </div>
            :
            <div>
              <Switch>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/signup">
                  <Register />
                </Route>
                <Route path="/">
                  <LandingPage />
                </Route>
              </Switch>
            </div>
        }

      </Router>
    </div>
  );
}

export default App;

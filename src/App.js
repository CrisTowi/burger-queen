// Libraries
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import firebase from 'firebase';

// Components
import ClientPage from './containers/ClientPage';
import ChefPage from './containers/ChefPage';
import LoginPage from './containers/LoginPage';
import ForgotPasswordPage from './containers/ForgotPasswordPage';

// Styles
import './App.css';

import FirebaseConfig from './utils/firebase-config';

firebase.initializeApp(FirebaseConfig);

const isFirebaseInitialized = () => {
  return new Promise(resolve => {
    firebase.auth().onAuthStateChanged(resolve);
  });
}

const App = () => {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    isFirebaseInitialized().then(val => {
      setFirebaseInitialized(val);
    });
  }, []);

  if (firebaseInitialized === false) {
    return (<div />);
  }

  return (
    <BrowserRouter>
      <Switch>
        {
          firebaseInitialized ? (
            <>
              <Route path="/chef">
                <ChefPage />
              </Route>
              <Route path="/client">
                <ClientPage />
              </Route>
              <Route exact path="/">
                <ClientPage />
              </Route>
            </>
          ) : (
            <>
              <Route exact path="/login">
                <LoginPage />
              </Route>
              <Route exact path="/forgot-password">
                <ForgotPasswordPage />
              </Route>
              <Route exact path="/">
                <LoginPage />
              </Route>
            </>
          )
        }
      </Switch>
    </BrowserRouter>
  );
}

export default App;

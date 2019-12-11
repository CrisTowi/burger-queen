// Libraries
import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import firebase from 'firebase';

// Components
import ClientPage from './containers/ClientPage';

// Styles
import './App.css';

import FirebaseConfig from './utils/firebase-config';

firebase.initializeApp(FirebaseConfig);

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/client">
          <ClientPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

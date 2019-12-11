// Libraries
import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Components
import ClientPage from './containers/ClientPage';

// Styles
import './App.css';

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

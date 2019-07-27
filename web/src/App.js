import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import logo from './logo.svg';

import Start from './pages/start';
import NotFound from './pages/not-found';


import s from './App.css';


function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        
        <div className={s.content}>
          <Switch>
            <Route exact path="/" component={Start} />
            {/* <Route exact path="/step" component={Step} /> */}
            <Route component={NotFound} />
          </Switch>
        </div>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;

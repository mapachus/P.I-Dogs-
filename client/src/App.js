import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from './components/landing/Landing';
import Home from './components/Home/index';
import Details from './components/Details/index';
import Create from './components/Create/Create';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Switch>
    <Route exact path = '/' component = {Landing}/>
    <Route exact path = '/home' component = {Home} />
    <Route exact path = '/details/:id' component = {Details} />
    <Route exact path = '/create' component = {Create} />
    </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;

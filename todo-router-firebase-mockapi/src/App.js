import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';
import TodoKoa from './components/TodoKoa';
import TodoFirebase from './components/TodoFirebase';
import TodoMock from './components/TodoMock';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
        <div className="App">
          <Header />
          <Switch>
            <Route exact path='/' component={TodoKoa}/>
            <Route exact path='/firebase' component={TodoFirebase}/>
            <Route exact path='/mock' component={TodoMock}/>
          </Switch>
        </div>
    );
  }
}

export default App;

import React, { Component } from 'react'
import {Switch, Route, Redirect} from 'react-router-dom';
import './App.scss'
import './assets/scss/index.scss';
import MainPage from './pages/main-page/main-page';

export default class App extends Component {
  render() {
    return (
      <div className='container-fluid app-container px-0'>
        <Switch>
          <Route path='/' render={(props) => <MainPage {...props}/>}/>
          <Redirect to='/not-found'/>
        </Switch>
      </div>
    )
  }
}

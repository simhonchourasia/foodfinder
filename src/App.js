import React from "react";
import './App.css';
import Header from "./Header";
import TinderCards from "./TinderCards";
import SwipeButtons from "./SwipeButtons";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import NavBar from "./Navbar";
import Home from './Page-Home';
import Matches from './Page-Matches';
import LogIn from './Page-LogIn';
import SignOut from './Page-SignOut';

import CreateUser from './components/create-user.component';
import MovieList from './components/movie-list.component';



function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/matches' component={Matches} />
          <Route path='/login' component={LogIn} />
          <Route path='/logout' component={SignOut} />
          <Route path='/allitems' component={MovieList}/>
          <Route path='/user' component={CreateUser}/>
        </Switch>
      </Router>
    </div>
  )
}


export default App;

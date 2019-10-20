import React from 'react';
import Posts from './components/posts/Posts'
import UserProfile from './components/users/UserProfile'
import Authentication from './components/users/Authentication'
import PostPage from './components/posts/PostPage'
import './App.css';

import { Route, Link, Switch } from 'react-router-dom'

function App() {
  return (
    <div className="App">

      <Link to='/'><h1>Title</h1></Link>
      <Authentication />
      <Switch>
        <Route exact path='/' component={Posts} />
        <Route exact path='/profile' component={UserProfile} />
        <Route exact path='/posts/:id' component={PostPage} />
      </Switch>

    </div>
  );
}

export default App;

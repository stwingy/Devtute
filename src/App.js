import React from 'react';
import Posts from './components/posts/Posts'
import UserProfile from './components/users/UserProfile'
import Authentication from './components/users/Authentication'
import PostPage from './components/posts/PostPage'
import './App.css';
import styled, { createGlobalStyle } from 'styled-components';
import { Route, Link, Switch } from 'react-router-dom'


const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Open Sans', sans-serif;
/*  */
  }
  h1,h2,h3,h4{
    font-family: 'Raleway', sans-serif;
    
  }
  h2,h3,h4{
    font-family: 'Raleway', sans-serif;
    background-color:rgba(0, 0, 0, 0.2);
    padding: 1rem 2rem;
    width:90%;
    margin: 0 auto;
    margin-top:2rem;
    border-top:1px solid rgba(0, 0, 0, 0.4);
  }
  
  a{
    text-decoration:none;
    color:black;
    letter-spacing:.12rem;
    text-transform:uppercase;
    :hover{
     letter-spacing:.15rem;
    }
  }
`;
const H1 = styled.h1`
margin-bottom:16rem;
margin-top:2rem;

`
function App() {
  return (
    <div className="App">

      <Link to='/'><H1>Title</H1></Link>
      <Authentication />
      <Switch>
        <Route exact path='/' component={Posts} />
        <Route exact path='/profile' component={UserProfile} />
        <Route exact path='/posts/:id' component={PostPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}

export default App;

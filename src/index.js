import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import PostProvider from './providers/PostProvider'
import UserProvider from './providers/UserProvider'
import { BrowserRouter as Router } from 'react-router-dom'


ReactDOM.render(
    <Router>
        <UserProvider>
            <PostProvider><App /></PostProvider>
        </UserProvider>
    </Router>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

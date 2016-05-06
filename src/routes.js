import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Login from './components/login';
import Register from './components/register';
import Home from './components/home';

import App from './components/app';
// import AppIndex from './components/app_index';

const grey = () => {
  return (<div><h1>Login Here</h1></div>);
};
// <Route path="login" component={login} />
export default(
  <Route path="/" component={App} >
    <Route path="login" component={Login} />
    <Route path="register" component={Register} />
    <Route path="home" component={Home} />
  </Route>
);
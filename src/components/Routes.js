import React from 'react';
import { BrowserRouter as Router ,Route } from 'react-router-dom';
import  Login from '../components/Login';
import App from '../App';
import SignUp from '../components/SignUp';


const Routes = () => (
    <Router>
      <Route exact path="/" component={App}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/signup" component={SignUp}/>
    </Router>
);

export default Routes;
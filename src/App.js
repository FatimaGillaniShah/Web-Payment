import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import {getAllData} from './store/actions/actions';
import { bindActionCreators } from 'redux';
import * as comp from './components';
import styling from './content/css';
import Favicon from 'react-favicon';
import faviconImage from './content/img/favicon.png'
import Home from './components/Home';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      groups: [],
      services: [],
    }
  }
 
  componentDidMount() {    
    this.props.allData();  
    }
   
  render() {
    
    return (
     
      <div>
        <Favicon url={faviconImage} />
        <comp.Header />

        <div className="App">

          <Switch>

            <Route path="/" exact component={Home}/>

            <Route path="/signup" component={comp.SignUp} />
            
            <Route path="/login" component={comp.Login} />

            <Route path="/forgetPassword" component={comp.ForgetPassword} />

            <Route path="/activateAccount" component={comp.ActivateAccount} />

            <Route path="/ServiceProvider/:id" component={comp.ServiceProvider} />

            <Route path="/SubGroups/:id" component={comp.SubGroups} />

            <Route path="/AddToCart/:id" component={comp.AddToCart} />

            <Route path="/ShoppingCart" component={comp.ShoppingCart} />
            
            <Route path="/Pay/PaySuccessful" component={comp.PaySuccessful} />

            <Route path="/Pay/PayUnsuccessful" component={comp.PayUnsuccessful} />

            <Route path="/History" component={comp.History} />
            
            <Route path="/Account" component={comp.Account} />

            <Route path="/NetworkError" component={comp.NetworkError} />
  
            <Route path="*" component={comp.PageNotFound} />


          </Switch>
        
        </div>
        <comp.Footer />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    allData:bindActionCreators(getAllData,dispatch)    
         }
};
export default connect(null, mapDispatchToProps)(App);

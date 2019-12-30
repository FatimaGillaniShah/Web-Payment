import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import {getAllData} from './store/actions/actions';
import { bindActionCreators } from 'redux';
import * as css from './content/css';
import * as comp from './components';

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
        <comp.Header />

        <div className="App">

          <Switch>

            <Route path="/" exact component={comp.Home}/>

            <Route path="/login" component={comp.Login} />

            <Route path="/signup" component={comp.SignUp} />

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
  
            <Route path="*" component={comp.PageNotFound} />


          </Switch>

        </div>
        <Footer />
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

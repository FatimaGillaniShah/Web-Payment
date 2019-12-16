import React, { Component } from 'react';
import './App.css';
import * as actions from "./store/actions/actions";
import '../src/content/css/online-pay.css';
import '../src/content/css/sadad.css';
import '../src/content/css/placeholder-loading.css';
import Header from './components/Shared/Header';
import Footer from './components/Shared/Footer';
import Home from './components/Home';
import Login from './components/Login'
import { Switch, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import ForgetPassword from './components/ForgetPassword';
import ActivateAccount from './components/ActivateAccount';
import ServiceProvider from './components/ServiceProvider';
import SubGroups from './components/SubGroups';
import AddToCart from './components/AddToCart';
import ShoppingCart from './components/ShoppingCart';
import PayUnsuccessful from './components/pay/PayUnsuccessful';
import PaySuccessful from './components/pay/PaySuccessful';
import History from './components/History';
import PageNotFound from './components/PageNotFound';
import { connect } from 'react-redux';
import _ from 'lodash';
import '../src/content/bootstrap.min.css';
import './content/css/overlay.css';
import {getAllData} from './store/actions/actions';
import { bindActionCreators } from 'redux';
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
        <Header />

        <div className="App">

          <Switch>

            <Route path="/" exact component={Home}/>

            <Route path="/login" component={Login} />

            <Route path="/signup" component={SignUp} />

            <Route path="/forgetPassword" component={ForgetPassword} />

            <Route path="/activateAccount" component={ActivateAccount} />

            <Route path="/ServiceProvider/:id" component={ServiceProvider} />

            <Route path="/SubGroups/:id" component={SubGroups} />

            <Route path="/AddToCart/:id" component={AddToCart} />

            <Route path="/ShoppingCart" component={ShoppingCart} />
            
            <Route path="/Pay/PaySuccessful" component={PaySuccessful} />

            <Route path="/Pay/PayUnsuccessful" component={PayUnsuccessful} />

            <Route path="/History" component={History} />
  
            <Route path="*" component={PageNotFound} />

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

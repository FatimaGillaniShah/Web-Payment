import React, { Component } from 'react';
import './App.css';
import * as actions from "./store/actions";
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
import Spinner from './components/Spinner';
import History from './components/History';
import { connect } from 'react-redux';
import _ from 'lodash';
import '../src/content/bootstrap.min.css';
import './content/css/overlay.css';
import {MainRequestInfo} from './api/ApiCalls';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      groups: [],
      services: [],
    }
  }
  componentDidMount() {
    
  let MainResult = MainRequestInfo();
  Promise.resolve(MainResult).then(res => {
    if (res != undefined) {

        var groupsData = res.data.groups;
        var servicesData = res.data.services;
  
        if ((groupsData && servicesData) !== undefined) {
  
          let groups = [];
          groupsData.forEach(element => {
  
            let isAvailable = _.get(element, 'available');
            if (isAvailable) {
                                 
                _.assign(element, { iconUrlSmall: _.get(element, 'icons.75x75'), iconUrlLarge: _.get(element, 'icons.650x420') });
                groups.push(element);
            }
  
          })
          this.setState({
            groups: groups,
            services: servicesData
          });
  
          this.props.addPost(this.state.groups, this.state.services);  
        }
    }
    })

  }
  render() {

    return (
      <div>
        <Header />

        <div className="App">

          <Switch>

            <Route path="/" exact component={Home} />

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

          </Switch>


        </div>
        <Footer />
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {

  return {
    addPost: (groups, services) => {
      dispatch(actions.addPost(groups, services));
    }
  };

};

export default connect(null, mapDispatchToProps)(App);

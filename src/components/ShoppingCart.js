import React, { Component } from 'react';
import _ from 'lodash';
import { validateLogin } from '../components/common/common';
import { Pay,RequestInfo } from '../api/ApiCalls';

class ShoppingCart extends Component {
    
    constructor(props) {

        super(props);
        this.state = {
            Items: [],
            sum: null,
            hidediv: false,
            count: null,
            cartItemCount: 0,
            service: [],
            paymentsInfoRequestObj: {},
            paymentsPayRequestObj: {},
            actionUrl: "",
            paymentId: ""
        }
        let isValid = validateLogin();
        if (!isValid) {
            this.props.history.push("/login");
        }
    }
 componentWillMount(){
    var cartItems = JSON.parse(localStorage.getItem('Services'));
    this.setState({
        Items:cartItems
    })
    
 }
    RemoveItem(id) {

        let count = this.state.Items.length;
        let services = this.state.Items;
        
        let index = services.findIndex(x => x.MyId === id);
        services.splice(index,1);
        this.setState({
            Items: services
        });
        
        localStorage.setItem('Services', JSON.stringify(this.state.Items));

        let newItemCount = this.state.cartItemCount - 1;

        if (this.state.cartItemCount > 0) {
            this.setState({
                cartItemCount: newItemCount
            })
            localStorage.setItem('cartItemCount', newItemCount);
          
        }

        if (count === 1) {

            this.setState({
                hidediv: true
            });

         }
    }
    async pay() {

        let isValid = validateLogin();
        if (!isValid) { this.props.history.push("/login"); }
        else {
            let sessionId = localStorage.getItem('sessionId');
            let cartServices = JSON.parse(localStorage.getItem('Services'));
            let payObj = Object.assign({ "session-id": sessionId, services: [] }, this.state.paymentsInfoRequestObj);

            this.setState({
                paymentsInfoRequestObj : payObj

            })
            cartServices.map((s) => {
                var ServiceObject = Object.assign({ "service-id": s.id, target: s.target, CustomerId: 0 }, ServiceObject);
                this.state.paymentsInfoRequestObj.services.push(ServiceObject);
            });

            let PaymentsInfoResponse = await RequestInfo(this.state.paymentsInfoRequestObj);
            PaymentsInfoResponse = _.get(PaymentsInfoResponse, 'data');
            if (PaymentsInfoResponse != null && PaymentsInfoResponse != undefined) {
                let errorCode =  _.get(PaymentsInfoResponse, 'error-code');
                if (errorCode != 0) {
                }
                else {
                    let errorOuccured = false;
                
                    if (!errorOuccured) {
                        this.setState({
                            paymentsInfoRequestObj : payObj
            
                        })
                        cartServices.map((s) => {
                            var ServiceObject = Object.assign({ "service-id": s.id, amount:s.amount, currency:"BHD", target: s.target}, ServiceObject);
                            this.state.paymentsPayRequestObj.services.push(ServiceObject);
                        });

                        //HACK: Change the gateway to proper user selection
                        let payResponse = await Pay(this.state.paymentsPayRequestObj);
                        payResponse = _.get(payResponse, 'data');
                        let payResponseErrorCode =  _.get(payResponse, 'error-code');
                        let payResponseUrl =  _.get(payResponse, 'payment-url');
                        if (payResponseErrorCode != null && payResponseErrorCode != 0) {
                            //message.message = payResponse.errorMessage;
                            //errorOuccured = true;
                        }
                        if (!errorOuccured && payResponse != null && payResponseUrl != null) {
                            let paymentUrl = payResponseUrl;
                            let splitURL = payResponseUrl.split('/');
                            let paymentId = splitURL[splitURL.length-1];
                            
                        //     handle through state
                        //   action :  document.getElementById('benefitForm').setAttribute('action', paymentUrl);
                        //   value : document.getElementById('benefitFormPaymentID').setAttribute('value', paymentId);
                        //   check how to submit form in react : document.getElementById('benefitForm').submit();

                        this.setState({actionUrl:paymentUrl, paymentId:paymentId});
                        document.getElementById('benefitForm').submit();
                        }
                        console.log(payResponse);
                    }

                }
            }
        }
    }

    render() {

        var sum = 0;
        this.state.Items.map((e) => {
            sum = sum + parseFloat(e.amount);
        })
        return (
            <div>
                <div id="quick-pay" hidden={this.state.hidediv}>
                    <div className="container-fluid online-pay-content">
                        <div className="col-md-12">
                            <div className="history-title margintop-0">
                                <p>Shopping Cart</p>
                            </div>
                        </div>

                        {this.state.Items.map((e, i) =>
                            <div className="col-md-12" id="cartItem_" i>
                                <div className="cart-wrap clearfix">

                                    <div className="col-md-12 no-padding cart-content clearfix">

                                        <div style={{ marginTop: "11px" }} >

                                            <img alt="img" className="img-responsive" src={e.iconUrl} />
                                            <div className="left">
                                                <h4>{e.amount}</h4>
                                                <p>{e.name}</p>
                                            </div>
                                        </div>
                                        <div className="cart-top-wrap">
                                            <div className="right">
                                                <a onClick={() => this.RemoveItem(e.MyId)}><img src={require('../content/img/close_small.png')} id="cartItemImage_" i /> </a>
                                                <span>BHD {e.amount}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="col-md-12">
                            <div className="cart-wrap total-wrap clearfix">
                                <div className="col-md-12 cart-content no-padding clearfix">
                                    <div className="col-md-4">&nbsp;</div>
                                    <div className=" cart-top-wrap">
                                        <div className="right">
                                            <a href="#"><img id="cartItemImage_1" src={require('../content/img/tag.png')} className="hidden-xs" /></a>
                                            <span id="cartTotalAmount"><font className="dark">Total </font>BHD {sum}.000</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="history-content clearfix">
                                <div className="left">

                                </div>
                                <div className="right">
                                    <div style={{ margin: "2px", borderRadius: "300px", padding: "12px 28px" }} className="btn btn-success btn-lg margintop-20">ADD NEW</div>
                                    <div style={{ float: "right", margin: "2px", borderRadius: "300px", padding: "12px 28px" }} className="btn btn-success btn-lg margintop-20" onClick={() => this.pay()}>PAY NOW</div>
                                </div>
                            </div>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </div>
                <div hidden={!this.state.hidediv}>
                    <section id="quick-pay">
                        <div className="container-fluid">
                            <div className="col-md-12">
                                <div className="col-lg-4 col-lg-offset-4 col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 text-center">
                                    <div className="thankyou-wrap">
                                        <h3>Oops! Nothing found in the cart!</h3>
                                        <img src={require('../content/img/empty-cart.png')} />
                                        <p>Your cart is empty. Please add few items to pay.</p>
                                        <a href="/" className="btn btn-success btn-lg margintop-20" type="button">Take me home</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>

                </div>
                <form action={this.state.actionUrl} method="post" id="benefitForm">
                    <input type="hidden" name="PaymentID" id="benefitFormPaymentID" value={this.state.paymentId} />
                </form>
            </div>
        )

    }

}

export default ShoppingCart;
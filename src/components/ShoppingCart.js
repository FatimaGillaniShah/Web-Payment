import React, { Component } from 'react';
import _ from 'lodash';
import { validateLogin } from '../components/common/common';
import { Pay, RequestInfo } from '../api/ApiCalls';
import * as actions from '../store/actions/actions';
import { connect } from 'react-redux';
import { Fab, Button, Grid, Container, Paper, Typography, Card } from '@material-ui/core';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

const styles = {
    root: {
        flexGrow: 1,

    },
    Header: {

        padding: '13px 19px',
        height: '50px',
        backgroundColor: 'gainsboro',
        fontSize: '15px',
        display: 'flex',
        justifyContent: 'start'


    },

    Image: {
        height: '90px',
        width: '165px',
        alignItems: 'flex-start',
        display: 'flex',

    },

    CardSegments: {
        paddingTop: '45px',
        color: "#ff6060"

    },
    CardSegmentsRightAlign: {
        paddingTop: '45px',
        textAlign: 'right',

    },
    Heading: {
        color: '#0888e9',
        fontSize: '18px',
        fontWeight: "900",


    },
    Total: {
        color: '#0888e9',
        fontSize: '18px',
        fontWeight: "900",
        textAlign: 'right',
        padding: '30px 0px'


    },

    footer: {
        backgroundColor: '#e7efde',
        height: '90px',


    },
    ImageIcon: {
        padding: '32px'
    },

    CardSegmentsLeftAlign: {
        paddingTop: '37px',
        textAlign: 'left'
    },
    Button: {
        backgroundColor: '#6a9b34',
        border: 'solid 2px #6a9b34',
        color: '#fff',
        fontSize: '15px',
        padding: '3px 32px',
        fontWeight: 'bold',
        textAlign: 'right'
    },
    buttonFooter: {
        height: '90px',
        marginTop: '25px'

    }
}
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
    componentWillMount() {
        var cartItems = JSON.parse(localStorage.getItem('Services'));
        var cartItemsLength = cartItems.length;
        if (cartItems !== null && cartItemsLength !== null && cartItemsLength > 0) {
            localStorage.setItem('cartItemCount', cartItemsLength);
            this.setState({
                Items: cartItems,
                cartItemCount: cartItemsLength,
                hidediv: false
            });

            this.props.getHeaderInfo(cartItemsLength, true);
        }
        else {
            this.setState({
                hidediv: true
            });
        }

    }
    RemoveItem(id) {


        let services = this.state.Items;

        let index = services.findIndex(x => x.MyId === id);
        services.splice(index, 1);
        this.setState({
            Items: services
        });



        let newItemCount = this.state.cartItemCount - 1;

        if (this.state.cartItemCount > 0) {
            this.setState({
                cartItemCount: newItemCount
            })
            localStorage.setItem('cartItemCount', newItemCount);
            localStorage.setItem('Services', JSON.stringify(this.state.Items));
        }

        if (newItemCount > 0) {

            this.setState({
                hidediv: false
            });

        }
        else {
            this.setState({
                hidediv: true
            });
        }

        this.props.getHeaderInfo(newItemCount, true);
    }
    async pay() {


        let cartServices = [];
        let sessionId = localStorage.getItem('sessionId');
        cartServices = JSON.parse(localStorage.getItem('Services'));
        let payObj = Object.assign({ "session-id": sessionId, services: [] }, this.state.paymentsInfoRequestObj);

        // this.setState({
        //     paymentsInfoRequestObj : payObj
        // });

        // we tried to set state using this.setState() but it don't effect in the below loop.
        this.state.paymentsInfoRequestObj = payObj;

        cartServices.forEach((s) => {
            var ServiceObject;
            ServiceObject = Object.assign({ "service-id": s.id, target: s.target, CustomerId: 0 }, ServiceObject);
            this.state.paymentsInfoRequestObj.services.push(ServiceObject);
        });

        // cartServices.map((s) => {
        //     var ServiceObject;
        //     ServiceObject = Object.assign({ "service-id": s.id, target: s.target, CustomerId: 0 }, ServiceObject);
        //     this.state.paymentsInfoRequestObj.services.push(ServiceObject);
        // });

        let PaymentsInfoResponse = await RequestInfo(this.state.paymentsInfoRequestObj);
        PaymentsInfoResponse = _.get(PaymentsInfoResponse, 'data');
        if (PaymentsInfoResponse !== null && PaymentsInfoResponse !== undefined) {
            let errorCode = _.get(PaymentsInfoResponse, 'error-code');
            if (errorCode !== 0) {
                let errorMessage = _.get(PaymentsInfoResponse, 'error-message');
                alert(errorMessage);
            }
            else {
                let errorOuccured = false;

                //Validation should be done here
                let serviceResults = [];
                serviceResults = _.get(PaymentsInfoResponse, 'info');

                for (let i = 0; i < serviceResults.length; i++) {
                    let serviceError = _.get(serviceResults[i], 'error');

                    if (serviceError !== null && serviceError !== undefined && serviceError !== 0) {
                        errorOuccured = true;
                        alert("Error In Cart");
                        break;
                    }
                }
                payObj = Object.assign({ "session-id": sessionId, services: [], gateway: "benefit" }, this.state.paymentsPayRequestObj);
                if (!errorOuccured) {
                    this.setState({
                        paymentsPayRequestObj: payObj
                    });

                    cartServices.forEach((s) => {
                        var ServiceObject;
                        ServiceObject = Object.assign({ "service-id": s.id, amount: s.amount, currency: "BHD", target: s.target }, ServiceObject);
                        this.state.paymentsPayRequestObj.services.push(ServiceObject);
                    });

                    // cartServices.map((s) => {
                    //     var ServiceObject;
                    //     ServiceObject = Object.assign({ "service-id": s.id, amount:s.amount, currency:"BHD", target: s.target}, ServiceObject);
                    //     this.state.paymentsPayRequestObj.services.push(ServiceObject);
                    // });

                    //HACK: Change the gateway to proper user selection
                    let payResponse = await Pay(this.state.paymentsPayRequestObj);
                    payResponse = _.get(payResponse, 'data');
                    let payResponseErrorCode = _.get(payResponse, 'error-code');

                    if (payResponseErrorCode !== null && payResponseErrorCode !== 0) {
                        let payResponseErrorMessage = _.get(payResponse, 'error-message');
                        alert(payResponseErrorMessage);
                    }
                    else {
                        let payResponseUrl = _.get(payResponse, 'payment-url');
                        if (!errorOuccured && payResponse !== null && payResponseUrl !== null && payResponseUrl !== "") {
                            let payResponseUrl = _.get(payResponse, 'payment-url');
                            let paymentUrl = payResponseUrl;
                            let splitURL = payResponseUrl.split('/');
                            let paymentId = splitURL[splitURL.length - 1];

                            //     handle through state
                            //   action :  document.getElementById('benefitForm').setAttribute('action', paymentUrl);
                            //   value : document.getElementById('benefitFormPaymentID').setAttribute('value', paymentId);
                            //   check how to submit form in react : document.getElementById('benefitForm').submit();

                            this.setState({ actionUrl: paymentUrl, paymentId: paymentId });
                            document.getElementById('benefitForm').submit();
                        }
                        else {
                            alert("Pay Response Url is null or empty");
                        }
                    }

                    console.log(payResponse);
                }

            }
        }
    }
    NavigateToHome = () => {
        this.props.history.push('/');
    }

    render() {

        var sum = 0;

        if (this.state.Items !== null && this.state.Items !== undefined && this.state.Items !== 0) {
            this.state.Items.forEach((e) => {
                sum = sum + parseFloat(e.amount);
            });
        }
        return (

            <Container maxWidth="false" style={{ marginTop: '60px' }}>

                <Grid container spacing={3}>

                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Paper style={styles.Header}>
                                Shopping Cart
                                </Paper>
                        </Grid>
                        {this.state.Items.map((e, i) =>
                            <Card style={{ borderBottom: '2px solid #dddddd' }}>
                                <Grid container spacing={3}>
                                    <Grid item xs={2} sm={2} md={2} lg={2}>
                                        <img alt="img" src={e.iconUrl} style={styles.Image} />
                                    </Grid>
                                    <Grid item xs={7} sm={7} md={7} lg={7} style={styles.CardSegmentsLeftAlign}>
                                        <Typography variant='h4'>{e.amount}</Typography>
                                        <Typography style={{ fontSize: 15, fontFamily: 'Raleway' }}>{e.name}</Typography>
                                    </Grid>
                                    <Grid item xs={2} sm={2} md={2} lg={2} style={styles.CardSegmentsRightAlign}>
                                        <Typography style={styles.Heading} variant='h4'>BHD {e.amount}</Typography>
                                    </Grid>
                                    <Grid item xs={1} sm={1} md={1} lg={1} style={styles.CardSegments}>
                                        <CancelOutlinedIcon onClick={() => this.RemoveItem(e.MyId)} style={{ fontSize: 24 }} />
                                    </Grid>
                                </Grid>
                            </Card>
                        )}
                        <Grid style={styles.footer} item xs={12} sm={12} md={12} lg={12} >

                            <Grid container >
                                <Grid item xs={6} sm={6} md={6} lg={6} >
                                </Grid>

                                <Grid item xs={5} sm={5} md={5} lg={5} >

                                    <Typography style={styles.Total}>
                                        BHD Total {sum}

                                    </Typography>
                                </Grid >
                                <Grid item xs={1} sm={1} md={1} lg={1} >
                                    <img alt="img" src={require('../content/img/tag.png')} style={styles.ImageIcon} />
                                </Grid>

                            </Grid>


                        </Grid>

                        <Grid style={styles.buttonFooter} item xs={12} sm={12} md={12} lg={12} >

                            <Grid container >
                                <Grid item xs={8} sm={8} md={8} lg={8} />


                                <Grid style={{ textAlign: 'right' }} item xs={2} sm={2} md={2} lg={2} >

                                    <Fab variant="extended" style={styles.Button} onClick={() => this.NavigateToHome()}> ADD NEW  </Fab>
                                </Grid >
                                <Grid item xs={2} sm={2} md={2} lg={2} >
                                    <Fab size="large" variant="extended" style={styles.Button} onClick={() => this.pay()}> PAY NOW  </Fab>

                                </Grid>

                            </Grid>


                        </Grid>


                    </Grid>
                </Grid>
                <form action={this.state.actionUrl} method="post" id="benefitForm">
                    <input type="hidden" name="PaymentID" id="benefitFormPaymentID" value={this.state.paymentId} />
                </form>
            </Container>

        )

    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        getHeaderInfo: (itemCartCount, isLoggedIn) => {
            dispatch(actions.getHeaderInfo(itemCartCount, isLoggedIn));
        }
    };
};
export default connect(null, mapDispatchToProps)(ShoppingCart);


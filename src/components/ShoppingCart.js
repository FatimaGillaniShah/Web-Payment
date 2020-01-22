import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import { validateLogin } from '../components/common/common';
import { Pay, RequestInfo } from '../api/ApiCalls';
import * as actions from '../store/actions/actions';
import { connect } from 'react-redux';
import { Fab, CardContent, Grid, Container, Paper, Typography, Card } from '@material-ui/core';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import styles from '../content/css/styles';
import { Spring, animated } from "react-spring/renderprops";
import CircularProgress from '@material-ui/core/CircularProgress';

class ShoppingCart extends Component {

    constructor(props) {

        super(props);
        this.state = {
            Items: [],
            sum: null,
            hidediv: false,
            count: null,
            cartItemCount: 0,
            loading: false,
            service: [],
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
        let sessionId = localStorage.getItem('sessionId');
        let cartServices = JSON.parse(localStorage.getItem('Services'));
        let paymentsInfoRequestObj;
        this.setState({ loading: true })

        paymentsInfoRequestObj = Object.assign({ "session-id": sessionId, services: cartServices }, paymentsInfoRequestObj);
        let PaymentsInfoResponse = await RequestInfo(paymentsInfoRequestObj);

        PaymentsInfoResponse = _.get(PaymentsInfoResponse, 'data');

        if (PaymentsInfoResponse !== null && PaymentsInfoResponse !== undefined) {
            let errorCode = _.get(PaymentsInfoResponse, 'error-code');
            if (errorCode !== 0) {
                let errorMessage = _.get(PaymentsInfoResponse, 'error-message');
                alert(errorMessage);
                return;
            }

            else {
                let errorOuccured = false;

                //Validation should be done here                
                let serviceResults = _.get(PaymentsInfoResponse, 'info');

                for (let i = 0; i < serviceResults.length; i++) {
                    let serviceError = _.get(serviceResults[i], 'error');
                    if (serviceError !== null && serviceError !== undefined && serviceError !== 0) {
                        errorOuccured = true;
                        alert("Error In Cart");
                        break;
                    }
                }

                if (!errorOuccured) {
                    let paymentsPayRequestObj;
                    paymentsPayRequestObj = Object.assign({ gateway: "benefit", "session-id": sessionId, services: cartServices }, paymentsPayRequestObj);
                    //HACK: Change the gateway to proper user selection
                    let payResponse = await Pay(paymentsPayRequestObj);
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
                            this.setState({ loading: false })
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
        this.state.Items.forEach((e) => {
            sum = sum + parseFloat(e.amount);
        });

        return (
            <Spring
                native
                from={{ o: 0, xyz: [0, 500, 0] }}
                to={{ o: 1, xyz: [0, 0, 0] }}
            >
                {({ o, xyz }) => (
                    <animated.div style={{
                        transform: xyz.interpolate(
                            (x, y, z) => `translate3d(${x}px, ${y}px, ${z}px)`
                        )
                    }}>

                        <Container style={{ marginTop: '30px' }}>
                            {this.state.cartItemCount ?
                                (
                                    <Grid container spacing={3}>

                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <Paper style={styles.Header}>
                                                Shopping Cart
                                            </Paper>
                                            {this.state.Items.map((e, i) =>
                                            <Card style={{ borderBottom: '2px solid #dddddd' }}>
                                                <Grid container spacing={3}>
                                                        <Grid item xs={6} sm={6} md={2} lg={2}>
                                                            <img alt="img" src={e.iconUrl} style={styles.Image} />
                                                        </Grid>
                                                        <Grid item xs={6} sm={6} md={7} lg={7} style={styles.CardSegmentsLeftAlign}>
                                                            <Typography variant='h4'>{e.name}</Typography>
                                                            <Typography style={{ fontSize: 15, fontFamily: 'Raleway' }}>{
                                                                _.get(e, 'target.msisdn-local') !== "" && _.get(e, 'target.msisdn-local') !== undefined ? (
                                                                    "+" + 973 + _.get(e, 'target.msisdn-local')
                                                                ) :
                                                                    (
                                                                        _.get(e, 'target.msisdn') !== "" && _.get(e, 'target.msisdn') !== undefined ?
                                                                            (
                                                                                _.get(e, 'target.msisdn')
                                                                            ) : (
                                                                                _.get(e, 'target.account') !== "" && _.get(e, 'target.account') !== undefined ?
                                                                                    (
                                                                                        _.get(e, 'target.account')
                                                                                    )
                                                                                    :
                                                                                    (
                                                                                        _.get(e, 'target.cpr') !== "" && _.get(e, 'target.cpr') !== undefined ?
                                                                                            (
                                                                                                _.get(e, 'target.cpr')
                                                                                            )
                                                                                            :
                                                                                            (
                                                                                                _.get(e, 'target.cr') !== "" && _.get(e, 'target.cr') !== undefined ?
                                                                                                    (
                                                                                                        _.get(e, 'target.cr')
                                                                                                    ) :
                                                                                                    (
                                                                                                        <Fragment></Fragment>
                                                                                                    )
                                                                                            )
                                                                                    )
                                                                            )

                                                                    )
                                                            }
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={6} sm={6} md={2} lg={2} style={styles.CardSegmentsRightAlign}>
                                                            <Typography style={styles.Heading} variant='h4'>BHD {e.amount}</Typography>
                                                        </Grid>
                                                        <Grid item xs={6} sm={6} md={1} lg={1} style={styles.CardSegmentsCart}>
                                                            <CancelOutlinedIcon onClick={() => this.RemoveItem(e.MyId)} style={{ fontSize: 24 }} />
                                                        </Grid>
                                                    </Grid>
                                            </Card>
                                            )}
                                            <Typography style={styles.ShoppingTotal}>
                                                BHD Total {sum}
                                                <img alt="img" src={require('../content/img/tag.png')} style={styles.ImageIcon} />
                                            </Typography>
                                        </Grid>
                                        
                                        <Grid item style={styles.buttonFooter} xs={12} sm={12} md={12} lg={12} >
                                            <Fab variant="extended" disabled={this.state.loading} style={styles.Button} onClick={() => this.NavigateToHome()}> ADD NEW  </Fab>
                                            <Fab variant="extended" disabled={this.state.loading} aria-label="add" style={styles.Button} onClick={() => this.pay()}>
                                                {this.state.loading && <CircularProgress size={34} style={styles.buttonProgress} />}
                                                {!this.state.loading && 'PAY NOW'}
                                            </Fab>
                                        </Grid>
                                        <form action={this.state.actionUrl} method="post" id="benefitForm">
                                            <input type="hidden" name="PaymentID" id="benefitFormPaymentID" value={this.state.paymentId} />
                                        </form>
                                    </Grid>



                                ) : (

                                    <Grid container spacing={10}>
                                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={styles.cardGrid}>
                                            <Card elevation={16} style={styles.CardCard}>
                                                <CardContent>
                                                    <Fragment>
                                                        <Grid>
                                                            <Grid item style={styles.CardContentSegments}>
                                                                <Typography style={styles.EmptyCartHeading}>OOPS! NOTHING FOUND IN THE CART!</Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Fragment>
                                                    <Fragment>
                                                        <Grid>
                                                            <Grid item style={styles.CardContentSegments}>
                                                                <img style={{ marginBottom: '3%' }} src={require('../content/img/empty-cart.png')} alt="sadad" />
                                                            </Grid>
                                                        </Grid>
                                                        <Typography style={styles.CartSubHeading}>Your cart is empty. Please add few items to pay.</Typography>
                                                        <Fab variant="extended" color="primary" aria-label="add" onClick={() => this.NavigateToHome()} style={styles.TakeMeHomeBtn} >
                                                            TAKE ME HOME
                                            </Fab>
                                                    </Fragment>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                )}
                        </Container>

                    </animated.div>
                )}
            </Spring>
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


import React, { Component, Fragment } from 'react';
import '..//content/css/addCart.css';
import { connect } from 'react-redux';
import { RequestInfo } from '../api/ApiCalls';
import _ from 'lodash';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Grid, Container, CardActions, Typography, Tabs, Tab, Switch, InputAdornment, Fab, TextField, Box, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import styled from "styled-components";
import styles from '../content/css/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Spring, animated } from "react-spring/renderprops";
import LoadingHtmlAddToCart from '../components/Shared/LoadingHtmlAddToCart';

const StyledTab = styled(({ ...props }) => (
    <Tab {...props} classes={{ selected: "selected" }} />
))`
    &.selected {
      background-color: #0d61af;
      color:white;
      font-size: large;
    },
    &.MuiTab-root{
        font-size: large;
    }
  `;
var NonFixedServices = false;
let serviceAmountMin = 0;
let serviceAmountMax = 0;
var FinalFlag = false;
class AddToCart extends Component {

    constructor(props) {

        super(props)
        this.state = {
            services: [],
            PhoneError: null,
            CPRError: null,
            CRError: null,
            loading: false,
            AccountError: null,
            AmountError: null,
            amount: null,
            Amount: null,
            vatedAmount: 0,
            vat: 0,
            serviceObject: [],
            quantity: 1,
            error: false,
            PriceError: false,
            BalanceInquiry: false,
            value: "a",
            setValue: 0
        }
        this.onChange = this.onChange.bind(this);
        this.updateInput = this.updateInput.bind(this);
        this.updateAmount = this.updateAmount.bind(this);
        this.SnackbarClose = this.SnackbarClose.bind(this);
        this.serviceRequestRequiredTargetsArray = [];
        this.serviceRequestOptionalTargetsArray = [];
        this.finalizedTargetsArray = {};
        NonFixedServices = false;

    }

    updateInput(event) {
        this.setState({ quantity: event.target.value });
    }
    updateAmount(event) {

        var amount = event.target.value;
        if (amount === "") {
            this.setState({
                AmountError: "Amount should be greater than " + serviceAmountMin + " and less than or equal to " + serviceAmountMax,
                amount: amount
            });
        }
        else {
            if (amount > serviceAmountMin && amount <= serviceAmountMax) {
                this.setState({
                    AmountError: "",
                    amount: amount
                });
            }
            else {
                this.setState({
                    AmountError: "Amount should be greater than " + serviceAmountMin + " and less than or equal to " + serviceAmountMax,
                    amount: amount
                });
            }
        }
    }
    async billInquiry(serviceObject) {

        var BillInquiry;
        var ServiceObjectForBillInquiry;
        let sessionId = localStorage.getItem('sessionId');
        this.finalizedTargetsArray = {};

        this.serviceRequestRequiredTargetsArray.forEach((e) => {
            let targetName = e.key;
            if (targetName !== "amount") {
                let targetValue = document.getElementById(targetName).value;
                this.finalizedTargetsArray = Object.assign({ [targetName]: targetValue }, this.finalizedTargetsArray);
            }
        });

        if (this.state.BalanceInquiry && this.serviceRequestOptionalTargetsArray.length > 0) {
            this.serviceRequestOptionalTargetsArray.forEach((e) => {
                let targetName = e.key;
                if (targetName !== "amount") {
                    let targetValueCheck = document.getElementById(targetName);
                    if (targetValueCheck !== null && targetValueCheck !== undefined) {
                        let targetValue = document.getElementById(targetName).value;
                        this.finalizedTargetsArray = Object.assign({ [targetName]: targetValue }, this.finalizedTargetsArray);
                    }

                }
            });
        }

        ServiceObjectForBillInquiry = Object.assign(
            {
                amount: "",
                currency: "BHD",
                "service-id": serviceObject.id,
                target: this.finalizedTargetsArray,

            }, ServiceObjectForBillInquiry);

        let servicesArrayFOrBillInquiry = [];

        servicesArrayFOrBillInquiry.push(ServiceObjectForBillInquiry);
        BillInquiry = Object.assign(
            {
                services: servicesArrayFOrBillInquiry,
                "session-id": sessionId

            }, BillInquiry);

        let BillInquiryResponse = await RequestInfo(BillInquiry);
        BillInquiryResponse = _.get(BillInquiryResponse, 'data');

        let BillInquiryErrorCode = _.get(BillInquiryResponse, 'error-code');
        let BillInquiryErrorMessage = _.get(BillInquiryResponse, 'error-message');

        if (BillInquiryErrorCode === 0) {
           
            let Balance = _.get(BillInquiryResponse, 'info[0].balance');
            if (parseInt(Balance) === 0) {
                this.setState({ amount: 0 });
            }
            else {
                this.setState({ amount: Balance });
            }
        }
        else {
            this.setState({ error: BillInquiryErrorMessage });
        }
    }
    validate() {
        this.setState({
            error: ""
        });

        if (this.state.BalanceInquiry) {
            if (this.serviceRequestOptionalTargetsArray.length !== 0) {
                if (this.state.CPRError === false || this.state.CRError === false) {
                    FinalFlag = true;
                }
                else if (this.state.CPRError === null && this.state.CRError === null) {
                    this.setState({
                        error: 'Field is required',
                    });
                    return false;

                }
                else {
                    return false;
                }
            }
        }

        for (var i = 0; i < this.serviceRequestRequiredTargetsArray.length; i++) {

            if (this.serviceRequestRequiredTargetsArray[i].key === "msisdn-local") {
                if (this.state.PhoneError === false) {
                    FinalFlag = true;
                }
                else if (this.state.PhoneError === null) {
                    this.setState({
                        error: 'Field is required',
                    });
                    return false;
                }
            }
            if (this.serviceRequestRequiredTargetsArray[i].key === "account-number") {
                if (this.state.AccountError === false) {
                    FinalFlag = true;
                }
                else if (this.state.AccountError === null) {
                    this.setState({
                        error: 'Field is required',
                    });
                    return false;
                }
            }
            if (this.serviceRequestRequiredTargetsArray[i].key === "cpr") {
                if (this.state.CPRError === false) {
                    FinalFlag = true;

                }
                else if (this.state.CPRError === null) {
                    this.setState({
                        error: 'Field is required',
                    });
                    return false;
                }
            }
            if (this.serviceRequestRequiredTargetsArray[i].key === "cr") {
                if (this.state.CRError === false) {
                    FinalFlag = true;
                }
                else if (this.state.CRError === null) {
                    this.setState({
                        error: 'Field is required',
                    });
                    return false;
                }
            }
        }
        if (this.state.amount === null || parseFloat(this.state.amount) > parseFloat(serviceAmountMax) || parseFloat(this.state.amount) <= parseFloat(serviceAmountMin)) {

            this.setState({
                error: 'Amount is not correct',
            });

            return false;

        }
        if (FinalFlag === true) {
            return true;
        }
        else {
            return false;
        }
    }
    async saveIntoCart(serviceObject) {
        this.setState({ loading: true })
        if (NonFixedServices === true) {
            const isValid = this.validate();
            if (!isValid) {
                this.setState({ loading: false })
                return;
            }
        }
        else {
            if (this.state.amount === null || this.state.amount === undefined || this.state.amount === "") {
                this.setState({
                    error: 'Amount is not correct',
                });
                this.setState({ loading: false })
                return;
            }
        }
        this.serviceRequestRequiredTargetsArray.forEach((e) => {
            let targetName = e.key;
            let targetValue = document.getElementById(targetName).value;
            this.finalizedTargetsArray = Object.assign({ [targetName]: targetValue }, this.finalizedTargetsArray);

        });

        if (this.state.BalanceInquiry && this.serviceRequestOptionalTargetsArray.length > 0) {
            this.serviceRequestOptionalTargetsArray.forEach((e) => {
                let targetName = e.key;
                if (document.getElementById(targetName) !== undefined && document.getElementById(targetName) !== null) {
                    let targetValue = document.getElementById(targetName).value;
                    this.finalizedTargetsArray = Object.assign({ [targetName]: targetValue }, this.finalizedTargetsArray);
                }
            });
        }

        let serviceVatType = _.get(serviceObject, 'vatApply.vatType');
        let serviceVatValue = _.get(serviceObject, 'vatApply.vatValue');
        if (serviceVatType !== undefined && serviceVatType !== null && serviceVatType !== "") {
            if (serviceVatType === 1) {
                let amount = parseFloat(this.state.amount);
                let vatCalculatedAmount = amount.toFixed(2) * serviceVatValue.toFixed(2);
                let totalAMount = parseFloat(amount) + parseFloat(vatCalculatedAmount);
                this.setState({
                    vatedAmount: totalAMount.toFixed(2),
                    vat: vatCalculatedAmount.toFixed(2)
                });

            }
            else if (serviceVatType === 0) {
                let amount = this.state.amount;
                let totalAMount = amount + serviceVatValue;
                this.setState({ vatedAmount: totalAMount, vat: serviceVatValue });
            }
            else {

            }
        }


        // Request Info will be done here
        let sessionId = localStorage.getItem('sessionId');
        let serviceArrayForRequestInfo = [];
        var ServiceObjectForRequestInfo = {};
        ServiceObjectForRequestInfo = Object.assign(
            {
                currency: "BHD",
                "service-id": serviceObject.id,
                target: this.finalizedTargetsArray,
                amount: this.state.amount,
                vatedAmount: this.state.vatedAmount

            }, ServiceObjectForRequestInfo);

        serviceArrayForRequestInfo.push(ServiceObjectForRequestInfo);

        let paymentsInfoRequestObj;
        paymentsInfoRequestObj = Object.assign({ "session-id": sessionId, services: serviceArrayForRequestInfo }, paymentsInfoRequestObj);
        let PaymentsInfoResponse = await RequestInfo(paymentsInfoRequestObj);

        PaymentsInfoResponse = _.get(PaymentsInfoResponse, 'data');
        this.setState({ loading: false });
        if (PaymentsInfoResponse !== null && PaymentsInfoResponse !== undefined) {
            let errorCode = _.get(PaymentsInfoResponse, 'error-code');
            if (errorCode !== 0) {
                let errorMessage = _.get(PaymentsInfoResponse, 'error-message');
                if (errorCode === 105) {
                    errorMessage = "Session Expire";
                }
                this.setState({
                    error: errorMessage
                });
                return;
            }
            else {

                PaymentsInfoResponse = _.get(PaymentsInfoResponse, 'info');
                if (PaymentsInfoResponse.length > 0) {
                    let ServiceResponse = PaymentsInfoResponse[0];
                    let ServiceResponseErrorCode = _.get(ServiceResponse, 'error');
                    if (ServiceResponseErrorCode !== 0 && ServiceResponseErrorCode !== undefined) {
                        let ServiceResponseErrorText = _.get(ServiceResponse, 'text');
                        this.setState({
                            error: ServiceResponseErrorText
                        });
                        return;
                    }
                    else {
                        let OldServices = localStorage.getItem('Services');
                        let servicesArrayForCart = [];

                        if (OldServices !== null) {
                            servicesArrayForCart = JSON.parse(OldServices);
                        }

                        for (let i = 0; i < this.state.quantity; i++) {
                            var NewServiceObject = {};
                            NewServiceObject = Object.assign(
                                {
                                    "MyId": Math.random() + 1,
                                    currency: "BHD",
                                    "service-id": serviceObject.id,
                                    target: this.finalizedTargetsArray,
                                    amount: this.state.amount,
                                    vatedAmount: this.state.vatedAmount,
                                    vat: this.state.vat,
                                    iconUrl: serviceObject.iconUrl,
                                    name: serviceObject.name

                                }, NewServiceObject);
                            servicesArrayForCart.push(NewServiceObject);
                        }

                        localStorage.setItem('Services', JSON.stringify(servicesArrayForCart));
                        this.props.history.push("/ShoppingCart");
                    }

                }
            }
        }

    }
    amount(e, data) {
        let ele = document.getElementsByClassName('active');
        if (ele.length > 0) {
            ele[0].classList.remove("active");
        }

        data.target.className = data.target.className + " active";
        this.setState({
            amount: e,
            vatedAmount: e
        });
    }

    AddOne() {
        let amountInput = this.refs.amount;
        let num = 0;
        if (amountInput !== undefined) {
            num = parseInt(this.refs.amount.value);
            num = num + 1;
            this.refs.amount.value = num;
            this.setState({ amount: num });
        }
        else {
            num = parseInt(this.refs.quantity.value);
            num = num + 1;
            this.refs.quantity.value = num;
            this.setState({ quantity: num });
        }

    }

    SubOne() {
        let amountInput = this.refs.amount;
        let num = 0;
        if (amountInput !== undefined) {
            num = parseInt(this.refs.amount.value);
            num = num - 1;
            this.refs.amount.value = num;
        }
        else {
            num = parseInt(this.refs.quantity.value);
            num = num - 1;
            this.refs.quantity.value = num;

        }

    }
    onChange = (event, targetName, min, max) => {

        if (targetName === 'Phone Number') {

            let targetOriginalName = 'msisdn-local';
            if (event.target.value.length < min || event.target.value.length > max) {
                let errorDivId = targetOriginalName.toLowerCase() + "-Error"
                let ErrorElement = document.getElementById(errorDivId);
                ErrorElement.innerText = 'Enter ' + min + "+" + max + " digits";
            }
            else {
                let errorDivId = targetOriginalName.toLowerCase() + "-Error"
                let ErrorElement = document.getElementById(errorDivId);
                ErrorElement.innerText = "";
                this.setState({
                    PhoneError: false
                });
            }
        }
        else if (targetName === 'Account Number') {

            let targetOriginalName = 'account-number';
            if (event.target.value.length < min || event.target.value.length > max) {
                let errorDivId = targetOriginalName.toLowerCase() + "-Error"
                let ErrorElement = document.getElementById(errorDivId);
                ErrorElement.innerText = 'Enter ' + min + "-" + max + " digits";
            }
            else {
                let errorDivId = targetOriginalName.toLowerCase() + "-Error"
                let ErrorElement = document.getElementById(errorDivId);
                ErrorElement.innerText = "";
                this.setState({
                    AccountError: false
                });
            }
        }
        else if (targetName === 'CPR') {

            let targetOriginalName = 'cpr';
            if (event.target.value.length < min || event.target.value.length > max) {
                let errorDivId = targetOriginalName.toLowerCase() + "-Error"
                let ErrorElement = document.getElementById(errorDivId);
                ErrorElement.innerText = 'Enter ' + min + "-" + max + " digits";
            }
            else {
                let errorDivId = targetOriginalName.toLowerCase() + "-Error"
                let ErrorElement = document.getElementById(errorDivId);
                ErrorElement.innerText = "";
                this.setState({
                    CPRError: false
                });
            }
        }
        else if (targetName === 'CR') {

            let targetOriginalName = 'cr';
            if (event.target.value.length < min || event.target.value.length > max) {
                let errorDivId = targetOriginalName.toLowerCase() + "-Error"
                let ErrorElement = document.getElementById(errorDivId);
                ErrorElement.innerText = 'Enter ' + min + "-" + max + " digits";
            }
            else {
                let errorDivId = targetOriginalName.toLowerCase() + "-Error"
                let ErrorElement = document.getElementById(errorDivId);
                ErrorElement.innerText = "";
                this.setState({
                    CRError: false
                });
            }
        }
    }
    inputForTarget(targets) {
        NonFixedServices = true;
        if (targets !== null && targets !== undefined) {
            let inputField = [];
            let targetNameOriginal = targets.key;
            let targetName = "";
            let targetType = "";
            let targetAttributes = targets.value;

            if (targetNameOriginal === "amount") {
                inputField.push(
                    <Fragment></Fragment>
                );

                return inputField;
            }

            if (targetNameOriginal === "email") {
                targetName = "Email"
            }
            else if (targetNameOriginal === "msisdn") {
                targetName = "Phone Number"
            }
            else if (targetNameOriginal === "msisdn-local") {
                targetName = "Phone Number"
            }
            else if (targetNameOriginal === "account-number") {
                targetName = "Account Number"
            }
            else if (targetNameOriginal === "cpr") {
                targetName = "CPR"
            }
            else if (targetNameOriginal === "cr") {
                targetName = "CR"
            }
            else {
                targetName = targetNameOriginal
            }

            if (targetNameOriginal === "email") {
                targetType = "email";
            }
            else if (targetNameOriginal === "msisdn" || targetNameOriginal === "msisdn-local") {
                targetType = "number";
            }
            else {
                targetType = "text";
            }

            if (targetAttributes !== null && targetAttributes !== undefined) {

                let min = _.get(targetAttributes, 'min');
                let max = _.get(targetAttributes, 'max');
                if (targetNameOriginal === "msisdn-local") {
                    inputField.push(

                        <TextField
                            label={targetName}
                            id={targetNameOriginal}
                            type={targetType}
                            style={styles.textField}
                            value={this.state.msisdn}
                            key={targetNameOriginal}
                            onChange={(e) => this.onChange(e, targetName, min, max)}
                            inputProps={
                                {
                                    minLength: min,
                                    maxLength: max
                                }
                            }
                            InputProps={
                                {
                                    startAdornment: <InputAdornment position="start">+973</InputAdornment>
                                }
                            }
                            variant="outlined"
                        />
                    );
                }
                else {
                    inputField.push(
                        <TextField
                            label={targetName}
                            id={targetNameOriginal}
                            type={targetType}
                            style={styles.textField}
                            key={targetNameOriginal}
                            onChange={(e) => this.onChange(e, targetName, min, max)}
                            inputProps={
                                {
                                    minLength: min,
                                    maxLength: max
                                }
                            }
                            variant="outlined"

                        />

                    );
                }
            }
            else {
                if (targetNameOriginal === "msisdn" || targetNameOriginal === "msisdn-local") {
                    inputField.push(

                        <TextField
                            label={targetName}
                            id={targetNameOriginal}
                            type={targetType}
                            style={styles.textField}
                            key={targetNameOriginal}
                            onChange={(e) => this.onChange(targetName)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">+973</InputAdornment>
                            }}
                            variant="outlined"
                        />

                    );
                }
                else {
                    inputField.push(

                        <TextField
                            label={targetName}
                            id={targetNameOriginal}
                            type={targetType}
                            style={styles.textField}
                            key={targetNameOriginal}
                            onChange={(e) => this.onChange(targetName)}
                            variant="outlined"
                        />

                    );
                }
            }
            return inputField;
        }
    }
    inputErrorHtml(targets) {
        let errorDiv = [];
        let targetNameOriginal = targets.key + "-Error";
        errorDiv.push(

            <Typography
                id={targetNameOriginal}
                key={targetNameOriginal}
                style={{ fontSize: '15px', margin: 'auto', color: 'red' }}
                variant="outlined"
            />
        );

        return errorDiv;
    }

    toggleBalanceInquiry() {
        let bI = this.state.BalanceInquiry;

        if (bI) {
            this.setState({
                BalanceInquiry: false
            });
        }
        else {
            this.setState({
                BalanceInquiry: true
            });
        }

    }

    BalanceInquiryToggle = (event, newValue) => {
        this.setState({
            setValue: newValue
        });

    }

    TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <Typography
                component="div"
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && <Box p={3}>{children}</Box>}
            </Typography>
        );
    }

    a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    SnackbarClose()
    {
        this.setState({error:false});

    }

    render() {
        var id = this.props.match.params.id;
        let serviceObject;
        let AllServices = _.get(this.props.StoreData, 'services');
        _.map(AllServices, function (o) {
            if (o.id === id) {
                serviceObject = o;
                return false;
            }
        });

        let fixedAmounts = [];
        let serviceImage = "";
        let serviceBalanceInquiry = _.get(serviceObject, 'is-balance-inquiry-available');
        serviceAmountMin = _.get(serviceObject, 'min-amount');
        serviceAmountMax = _.get(serviceObject, 'max-amount');

        if (serviceAmountMin !== undefined) {
            serviceAmountMin = parseInt(serviceAmountMin);
            serviceAmountMax = parseInt(serviceAmountMax);

        }

        let serviceRequestRequiredTargets = _.get(serviceObject, 'request-targets.required');
        this.serviceRequestRequiredTargetsArray = _.map(serviceRequestRequiredTargets, (value, key) => ({ key, value }));
        let serviceRequestOptionalTargets = _.get(serviceObject, 'request-targets.optional');
        this.serviceRequestOptionalTargetsArray = _.map(serviceRequestOptionalTargets, (value, key) => ({ key, value }));

        if ((serviceObject !== undefined)) {
            serviceImage = _.get(serviceObject, 'icons.190x98');
            fixedAmounts = _.get(serviceObject, 'fixed-amount');
        }
        else {
            serviceObject = [];
        }


        let serviceVatDescription = _.get(serviceObject, 'vatApply.description');
        let serviceDescription = _.get(serviceObject, 'service-description');


        return (
            <Fragment>
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

                        <Container xl={12}>
                            <Grid container spacing={10}>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={styles.cardGrid}>
                                    {AllServices.length === 0 ?
                                        <LoadingHtmlAddToCart />
                                        :
                                        <Card elevation={16} style={styles.card}>
                                            <CardContent>
                                                <Fragment>
                                                    <Grid container>
                                                        <Grid item style={styles.CardContentSegments} xs={12} sm={12} md={12} lg={12} xl={12}>
                                                            <img src={serviceImage} alt="Img" />
                                                        </Grid>

                                                        {/* {this.state.error ? <div style={{ fontSize: '15px', margin: 'auto', color: "red" }}>{this.state.error}</div> : null} */}

                                                        {fixedAmounts.length > 0 ? (

                                                            <Fragment>
                                                                <Grid item style={styles.CardContentSegments} xs={12} sm={12} md={12} lg={12} xl={12}>
                                                                    <input id="amount" name="amount" type="hidden" value="1.000" />
                                                                    <fieldset>
                                                                        <label style={styles.SelectCardText}>Select Card*</label>
                                                                        <div className="add-demo">
                                                                            {
                                                                                fixedAmounts.map(e =>
                                                                                    <a href="#" onClick={(data) => this.amount(e, data)} key={e} value={e}>BHD {e}</a>
                                                                                )
                                                                            }
                                                                        </div>
                                                                    </fieldset>
                                                                </Grid>
                                                                <Grid item style={styles.CardContentSegments} xs={12} sm={12} md={12} lg={12} xl={12}>
                                                                    <TextField
                                                                        id="quantity"
                                                                        label="Quantity"
                                                                        type="number"
                                                                        style={styles.textField}
                                                                        value={this.state.quantity}
                                                                        onChange={this.updateInput}
                                                                        variant="outlined"
                                                                    />
                                                                </Grid>
                                                            </Fragment>

                                                        ) : (
                                                                <Fragment>
                                                                    <Grid item style={styles.CardContentSegments} xs={12} sm={12} md={12} lg={12} xl={12}>
                                                                        {this.serviceRequestRequiredTargetsArray.map(e =>
                                                                            <Fragment>
                                                                                {this.inputForTarget(e)}
                                                                                {this.inputErrorHtml(e)}
                                                                            </Fragment>

                                                                        )}
                                                                    </Grid>


                                                                    {serviceBalanceInquiry === true ? (
                                                                        <Grid item style={styles.CardContentSegments} xs={12} sm={12} md={12} lg={12} xl={12}>
                                                                            <Fragment>
                                                                                {this.serviceRequestOptionalTargetsArray.length > 0 ? (
                                                                                    <Fragment>
                                                                                        <Grid container spacing={3} xs={12} sm={12} md={12} lg={12} xl={12} style={styles.BalanceInquiryGrid}>
                                                                                            <Grid item xs={8} sm={8} md={8} lg={8} style={{ textAlign: 'left' }}>
                                                                                                <Typography variant="h4" style={{ color: '#0061ae', fontWeight: '300' }}>Balance Inquiry</Typography>
                                                                                            </Grid>
                                                                                            <Grid item xs={4} sm={4} md={4} lg={4} style={{ textAlign: 'right' }}>
                                                                                                <Switch
                                                                                                    checked={this.state.BalanceInquiry}
                                                                                                    onChange={() => this.toggleBalanceInquiry()}
                                                                                                    color="primary"
                                                                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                                                                />
                                                                                            </Grid>
                                                                                        </Grid>


                                                                                        {this.state.BalanceInquiry === true ? (
                                                                                            this.serviceRequestOptionalTargetsArray.length > 1 ? (

                                                                                                <Fragment>
                                                                                                    <Tabs
                                                                                                        value={this.state.setValue}
                                                                                                        onChange={this.BalanceInquiryToggle}
                                                                                                        aria-label="simple tabs example"
                                                                                                        variant="fullWidth"
                                                                                                        style={styles.BalanceInquiryTabs}
                                                                                                        indicatorColor="primary"
                                                                                                    >
                                                                                                        {this.serviceRequestOptionalTargetsArray.map((value, index) => {
                                                                                                            return <StyledTab label={value.key} {...this.a11yProps({ index })} />
                                                                                                        })}
                                                                                                    </Tabs>
                                                                                                    {this.serviceRequestOptionalTargetsArray.map((value, index) => {
                                                                                                        return <this.TabPanel value={this.state.setValue} index={index}>
                                                                                                            <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                                                                                <Grid item xs={8} sm={8} md={8} lg={8} xl={8} style={{ textAlign: 'left' }}>
                                                                                                                    {this.inputForTarget(value)}
                                                                                                                </Grid>
                                                                                                                <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>{this.inputErrorHtml(value)}</Grid>

                                                                                                                <Grid item xs={4} sm={4} md={4} lg={4} xl={4} style={{ textAlign: 'right' }}>
                                                                                                                    <Fab variant="extended" color="primary" aria-label="add" style={styles.BillInquiryBtn} onClick={() => this.billInquiry(serviceObject)}>Bill Inquiry</Fab>
                                                                                                                </Grid>
                                                                                                            </Grid>
                                                                                                        </this.TabPanel>
                                                                                                    })}
                                                                                                </Fragment>

                                                                                            ) : (
                                                                                                    <Fragment>
                                                                                                        <Grid container spacing={3} style={{ marginTop: '2%' }}>
                                                                                                            <Grid item xs={8} sm={8} md={8} lg={8} xl={8} style={{ textAlign: 'left' }}>
                                                                                                                {this.inputForTarget(this.serviceRequestOptionalTargetsArray[0])}
                                                                                                            </Grid>

                                                                                                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4} style={{ textAlign: 'right' }}>
                                                                                                                <Fab variant="extended" color="primary" aria-label="add" style={styles.BillInquiryBtn} onClick={() => this.billInquiry(serviceObject)}>Bill Inquiry</Fab>
                                                                                                            </Grid>
                                                                                                        </Grid>
                                                                                                    </Fragment>
                                                                                                )

                                                                                        ) : (
                                                                                                <Fragment></Fragment>
                                                                                            )}

                                                                                    </Fragment>
                                                                                ) : (
                                                                                        <Fragment>
                                                                                            <Fab variant="extended" color="primary" aria-label="add" style={styles.AddToCartBtn} onClick={() => this.billInquiry(serviceObject)}>
                                                                                                Bill Inquiry
                                                                </Fab>
                                                                                        </Fragment>
                                                                                    )}
                                                                            </Fragment>
                                                                        </Grid>
                                                                    ) : (
                                                                            <Fragment></Fragment>

                                                                        )}


                                                                    <Grid item style={styles.CardContentSegments} xs={12} sm={12} md={12} lg={12} xl={12}>
                                                                        <TextField
                                                                            label="Amount"
                                                                            id="amount"
                                                                            type="number"
                                                                            ref="amount"
                                                                            value={this.state.amount}
                                                                            style={styles.textField}
                                                                            onChange={this.updateAmount}
                                                                            onKeyDown={this.onKeyDown}
                                                                            inputProps={
                                                                                {
                                                                                    minLength: serviceAmountMin,
                                                                                    maxLength: serviceAmountMax
                                                                                }
                                                                            }
                                                                            variant="outlined"
                                                                        />
                                                                    </Grid>

                                                                    <Grid item style={styles.CardContentSegments} xs={12} sm={12} md={12} lg={12} xl={12}>
                                                                        <Typography variant="h4" color="error">{serviceVatDescription}</Typography>
                                                                        <Typography style={styles.CardContentSegments} variant="h4" color="error">{serviceDescription}</Typography>
                                                                    </Grid>
                                                                </Fragment>

                                                            )}
                                                    </Grid>
                                                </Fragment>
                                            </CardContent>
                                            <CardActions>
                                                <Fab variant="extended" disabled={this.state.loading} color="primary" aria-label="add" style={styles.AddToCartBtn} onClick={() => this.saveIntoCart(serviceObject)}>
                                                    {this.state.loading && <CircularProgress size={34} style={styles.LoginBtnLoader} />}
                                                    {!this.state.loading && 'SUBMIT'}
                                                </Fab>
                                            </CardActions>
                                        </Card>
                                    }
                                </Grid>
                            </Grid>
                        </Container>
                        
                    </animated.div>
                )}
            </Spring>
            <Snackbar open={this.state.error} style={styles.snackBar} autoHideDuration={6000} anchorOrigin={{vertical: 'top', horizontal: 'center'}} onClose={this.SnackbarClose}>
                            <Alert style={styles.snackBarAlert} onClose={this.SnackbarClose} severity="error">
                            {this.state.error}!
                            </Alert>
                        </Snackbar>
                        </Fragment>

        );

    }

}

const mapStateToProps = state => {
    return {
        StoreData: state.groups
    };
};

export default connect(mapStateToProps, null)(AddToCart);

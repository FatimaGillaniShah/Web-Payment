import React, { Component, Fragment } from 'react';
import '..//content/css/addCart.css';
import { connect } from 'react-redux';
import _ from 'lodash';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Grid, Container, CardActions, FormControl } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import InputAdornment from '@material-ui/core/InputAdornment';

const styles = {
    card: {
        maxWidth: '345',
        marginTop:'30px'
      },
    media: {
        height: 0,
        paddingTop: '56.25%'
    },
    avatarEven: {
        backgroundColor: '#1cc1f7'
    },
    avatarOdd: {
        backgroundColor: '#1961d7'
    },
    avatarImage: {
        maxWidth: '85%'
    },
    LinkText: {
        color: 'black'
    },
    cardGrid: {
        margin: 'auto'
    },
    SelectCardText:{
        color:'#1961d7',
        fontSize:'medium'
    },
    AddToCartBtn: {
        margin: 'auto',
        backgroundColor: '#5E8C2A',
        marginBottom:'10%',
        width:'60%',
        fontSize:'medium'        
    },
    extendedIcon: {
        marginRight: 'theme.spacing(1)',
    },
      withoutLabel: {
        
      },
      textField: {
        width: '90%'
      }
      ,
      CardContentSegments: {
        padding: '20px'
      },


}

class AddToCart extends Component {
    constructor(props) {

        super(props)
        this.state = {
            services: [],
            amount: 1,
            Amount: null,
            serviceObject: [],
            quantity: 1,
            error: "",
            PriceError: false,
           
        }
        this.updateInput = this.updateInput.bind(this);
        this.updateAmount = this.updateAmount.bind(this);
        this.serviceRequestRequiredTargetsArray = [];
        this.serviceRequestOptionalTargetsArray = [];
        this.finalizedTargetsArray = {};
    }

    updateInput(event) {
        this.setState({ quantity: event.target.value });
    }

    updateAmount(event) {

        //let amount = this.refs.amount.value;
        let amount = event.target.value;

        let quantity = 1;
        this.setState({
            amount: amount,
            quantity: quantity
        });
    }

    saveIntoCart(serviceObject) {

     
        if(this.state.amount === 1){
            this.setState({
                error: "Please select above amount"
            })
            return false;
        }

        let OldServices = localStorage.getItem('Services');
        this.setState({ serviceObject: serviceObject });

        if (this.state.amount) {

            var amount = this.state.amount;
            var quantity = this.state.quantity;
            var arr = [];


            this.serviceRequestRequiredTargetsArray.forEach((e) => {
                if (e.key === "amount") {
                    this.finalizedTargetsArray = Object.assign({ "amount": this.state.amount }, this.finalizedTargetsArray);
                }
                if (e.key === "quantity") {
                    this.finalizedTargetsArray = Object.assign({ "quantity": this.state.quantity }, this.finalizedTargetsArray);
                }
            });

            // this.serviceRequestRequiredTargetsArray.map((e) => {
            //     if (e.key === "amount") {
            //         this.finalizedTargetsArray = Object.assign({ "amount": this.state.amount }, this.finalizedTargetsArray);
            //     }
            //     if (e.key === "quantity") {
            //         this.finalizedTargetsArray = Object.assign({ "quantity": this.state.quantity }, this.finalizedTargetsArray);
            //     }

            // });

            if (OldServices !== null) {
                arr = JSON.parse(OldServices);

                for (let i = 0; i < this.state.quantity; i++) {

                    let Arrcount = Math.random();

                    var newObject = Object.assign({}, serviceObject);
                    let MyId = Arrcount + 1;
                    newObject["MyId"] = MyId;
                    newObject["quantity"] = quantity;
                    newObject["amount"] = amount;
                    newObject["target"] = this.finalizedTargetsArray;
                    arr.push(newObject);

                }

                var newData = [...arr];
                localStorage.setItem('Services', JSON.stringify(newData));
                this.props.history.push("/ShoppingCart");
            }
            else {
                arr = [];

                for (let i = 0; i < this.state.quantity; i++) {

                    let Arrcount = Math.random();
                    let newObject = Object.assign({}, serviceObject);
                    let MyId = Arrcount + 1;
                    newObject["MyId"] = MyId;
                    newObject["quantity"] = quantity;
                    newObject["amount"] = amount;
                    newObject["target"] = this.finalizedTargetsArray;
                    arr.push(newObject);
                }

                localStorage.setItem('Services', JSON.stringify(arr));
                this.props.history.push("/ShoppingCart");
            }
        }
        else {
            this.setState({ PriceError: true })


        }
    }

    amount(e, data) {
        let ele = document.getElementsByClassName('active');
        if (ele.length > 0) {
            ele[0].classList.remove("active");
        }

        data.target.className = data.target.className + " active";
        this.setState({
            amount: e
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

    inputForTarget(targets) {
        if (targets !== null && targets !== undefined) {
            let inputField = [];
            let targetName = targets.key;
            let targetType = "";
            let targetAttributes = targets.value;
            //let _classValues = "form-controll target input-text";

            if (targetName === "email") {
                targetType = "email";
            }
            else if (targetName === "msisdn") {
                targetType = "number";
            }
            else {
                targetType = "text";
            }
            if (targetAttributes !== null && targetAttributes !== undefined) {
                let min = _.get(targetAttributes, 'min');
                let max = _.get(targetAttributes, 'max');

                inputField.push(
        <TextField
          label="Phone Number"
          id={targetName}
          type={targetType}
          style={styles.textField}
          InputProps={{
            startAdornment: <InputAdornment position="start">+973</InputAdornment>,
            minLength: {min},
            maxLength: {max}
          }}
          variant="outlined"
        />)
  // inputField.push(<input key={targetName} className={_classValues} data-val-length-min={min} data-val-length-max={max} data-val="true" type={targetType} id={targetName} name={targetName} placeholder="text" />);
            }
            else {
                //inputField.push(<input key={targetName} className={_classValues} data-val="true" type={targetType} id={targetName} name={targetName} placeholder="text" />);
                inputField.push(
                    <TextField
                      label="Phone Number"
                      id={targetName}
                      type={targetType}
                      style={styles.textField}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">+973</InputAdornment>
                      }}
                      variant="outlined"
                    />)
            }

            //inputField.push(<span className="input-disabled-text-without-modal" key={targetName + "-prefix"}>+973</span>);

            return inputField;
        }
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
        let servicePaymentTargets = _.get(serviceObject, 'payment-targets.required');
        let servicePaymentTargetsArray = _.map(servicePaymentTargets, (value, key) => ({ key, value }));

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
        return (

            <Container xl={12}>
                <Grid container spacing={10}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={styles.cardGrid}>
                        <Card elevation={16} style={styles.card}>                            
                            <CardContent>
                                <Fragment>
                                    <Grid>
                                        <Grid item style={styles.CardContentSegments}>
                                        <img src={serviceImage} alt="Img" />
                                        </Grid>
                                    </Grid>
                                </Fragment>                            
                                {servicePaymentTargets !== null && servicePaymentTargets !== undefined ? (

                                    servicePaymentTargetsArray.map(e =>

                                        <Fragment>
                                           
                                            <Grid>
                                                <Grid item key={e} style={styles.CardContentSegments}>
                                                    {this.inputForTarget(e)}
                                                </Grid>
                                            </Grid>
                                        <span className="field-validation-valid" data-valmsg-for="@target.Key" data-valmsg-replace="true"></span>
                                        </Fragment>
                                    )

                                ) : (
                                        <Fragment></Fragment>
                                    )
                                }

                                {fixedAmounts.length > 0 ? (
                                    <Fragment>
                                        <Grid>
                                            <Grid item style={styles.CardContentSegments}>
                                        <input id="amount" name="amount" type="hidden" value="1.000" />
                                        <fieldset>
                                            <label style={styles.SelectCardText}>Select Card*</label>
                                            <div className="add-demo">
                                                {
                                                    fixedAmounts.map(e =>
                                                        <a onClick={(data) => this.amount(e, data)} key={e} value={e}>BHD {e}</a>
                                                    )
                                                }
                                            </div>
                                        </fieldset>
                                        </Grid>
                                        {this.state.error ? <div className='alert alert-danger' style={{ fontSize: '15px' }}>{this.state.error}</div> : null}
                                        <Grid item style={styles.CardContentSegments}>


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
                                        </Grid>
                                    </Fragment>
                                    
                                ) : (

                                        <Fragment>
                                            <Grid>
                                                <Grid item style={styles.CardContentSegments}>
                                            <TextField
                                                label="Amount"
                                                id="amount"
                                                type="number"
                                                ref="amount"
                                                value={this.state.amount}
                                                style={styles.textField}
                                                onChange={this.updateAmount}                      
                                                variant="outlined"
                                            />
                                            </Grid>
                                            </Grid>
                                            
                                        </Fragment>

                                    )}
                            </CardContent>
                            <CardActions>
                                <Fab variant="extended" color="primary" aria-label="add" style={styles.AddToCartBtn} onClick={() => this.saveIntoCart(serviceObject)}>                                    
                                    Add To Cart
                                </Fab>                                
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>

                </Container>


              
        );

    }


}
const mapStateToProps = state => {
    return {
        StoreData: state.groups
    };
};

export default connect(mapStateToProps, null)(AddToCart);

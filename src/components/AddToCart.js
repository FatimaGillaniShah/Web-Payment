import React, { Component } from 'react';
import '..//content/css/addCart.css';
import { connect } from 'react-redux';
import _ from 'lodash';

class AddToCart extends Component {
    constructor(props) {

        super(props)
        this.state = {
           
            amount: null,
            Amount: null,
            serviceObject: [],
            quantity: null,
            error: "Input fields cannot be empty",
            PriceError:false
        }
        this.updateInput = this.updateInput.bind(this);
        this.updateAmount = this.updateAmount.bind(this);
        this.serviceRequestRequiredTargetsArray = [];
        this.serviceRequestOptionalTargetsArray = [];
        this.finalizedTargetsArray = {};
    }
    componentWillReceiveProps(){
        let AllServices = _.get(this.props.StoreData, 'services');
        console.log(AllServices)
      }
    componentDidMount() {

        let OldServices = localStorage.getItem('Services');
        let arr = [];
        if (OldServices) {
            arr = JSON.parse(OldServices)
        }

    }

    updateInput(event) {
        this.setState({ quantity: event.target.value });
    }

    updateAmount() {

        let amount = this.refs.amount.value;
        let quantity = 1;
        this.setState({
            amount: amount,
            quantity: quantity
        });
    }

    saveIntoCart(serviceObject) {

        let OldServices = localStorage.getItem('Services');
        this.setState({serviceObject:serviceObject})

        if (this.state.amount) {

            var amount = this.state.amount;
            var quantity = this.state.quantity;
            var arr = [];


            this.serviceRequestRequiredTargetsArray.map((e) => {
                if (e.key == "amount") {
                    this.finalizedTargetsArray = Object.assign({ "amount": this.state.amount }, this.finalizedTargetsArray);
                }
                if (e.key == "quantity") {
                    this.finalizedTargetsArray = Object.assign({ "quantity": this.state.quantity }, this.finalizedTargetsArray);
                }

            });

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
            this.setState({PriceError : true})
            
           
        }
    }

    amount(e) {
        this.setState({
            amount : e
        })
       
    }

    inputForTarget(targets) {
        if (targets != null && targets != undefined) {
            let inputField = [];
            let targetName = targets.key;
            let targetType = "";
            let targetAttributes = targets.value;
            let _classValues = "form-controll target input-text";

            if (targetName == "email") {
                targetType = "email";
            }
            else if (targetName == "msisdn") {
                targetType = "number";
            }
            else {
                targetType = "text";
            }
            if (targetAttributes != null && targetAttributes != undefined) {
                let min = _.get(targetAttributes, 'min');
                let max = _.get(targetAttributes, 'max');
                inputField.push(<input key={targetName} className={_classValues} data-val-length-min={min} data-val-length-max={max} data-val="true" type={targetType} id={targetName} name={targetName} placeholder="text" />);
            }
            else {
                inputField.push(<input key={targetName} className={_classValues} data-val="true" type={targetType} id={targetName} name={targetName} placeholder="text" />);
            }

            inputField.push(<span className="input-disabled-text-without-modal" key={targetName + "-prefix"}>+973</span>);

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

        if ((serviceObject != undefined)) {
            serviceImage = _.get(serviceObject, 'icons.190x98');
            fixedAmounts = _.get(serviceObject, 'fixed-amount');
        }
        else {
            serviceObject = [];
        }
        return (

            <div className="AddToCart">
                <div className="header-logo">
                    <img src={serviceImage} className="img-responsive" />
                </div>
                <h4><span>{serviceObject.name}</span></h4>
                <form action="/User/AddToCart" id="formModal_1" method="post">
                    <div className="AddToCartFormBody">

                        {servicePaymentTargets != null && servicePaymentTargets != undefined ? (

                            servicePaymentTargetsArray.map(e =>

                                <div className="form-group" key={e}>
                                    <label>Phone Number*</label>
                                    <fieldset>

                                        {this.inputForTarget(e)}
                                    </fieldset>
                                    <span className="field-validation-valid" data-valmsg-for="@target.Key" data-valmsg-replace="true"></span>
                                </div>

                            )

                        ) : (
                                <div></div>
                            )

                        }

                        {fixedAmounts.length > 0 ? (
                            <div>
                                <div className="form-group" id="_AmountFormGroup">
                                    <input id="amount" name="amount" type="hidden" value="1.000" />
                                    <fieldset>
                                        <label>Select Cards*</label>
                                        <div className="add-demo">
                                            {
                                                fixedAmounts.map(e =>
                                                    // style={{focus:'link',focus:'visited',color:'blue',borderColor:'blue'}}
                                                    <a href='#' id="focusmeplease" onClick={() => this.amount(e)} className="waves-effect waves-block fixedAmountChoice " key={e} value={e}>BHD {e}</a>
                                                )
                                            }
                                        </div>
                                    </fieldset>
                                    <span className="field-validation-valid" data-valmsg-for="amount" data-valmsg-replace="true"></span>
                                </div>
    
                                {this.state.PriceError ?  <p  style={{ color: "red" }} id="error">Please select above Amount</p>:""}
                                
                                <div className="form-group">
                                    <fieldset>
                                        <label>Quantity*</label>
                                        <div className="input-group spinner">
                                            <input type="text" className="form-control text-center quantity" placeholder="1" name="quantity" onChange={this.updateInput} />
                                            <div className="input-group-addon">
                                                <a href="#" className="spin-up quantitySpinnerUp"><i className="fa fa-caret-up"></i> </a>
                                                <a href="#" className="spin-down quantitySpinnerDown"><i className="fa fa-caret-down"></i> </a>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        ) : (
                                <div>
                                    <fieldset>
                                        <label>Amount*</label>
                                        <div className="input-group spinner">
                                            <input type="number" className="form-controll"
                                                placeholder="1" name="amount" ref = 'amount' id="amount" required="required" onChange={this.updateAmount}
                                                data-val-length-min={serviceObject.minAmount} data-val-length-max={serviceObject.maxAmount} />
                                            <div className="input-group-addon">
                                                <a href="#" className="spin-up quantitySpinnerUp"><i className="fa fa-caret-up"></i> </a>
                                                <a href="#" className="spin-down quantitySpinnerDown"><i className="fa fa-caret-down"></i> </a>
                                            </div>
                                        </div>
                                        <p style={{ color: "red" }} id="error"></p>
                                    </fieldset>
                                </div>
                            )}


                        <div className="form-group">
                            <fieldset>
                                <button type="button" name="answer" value="AddToCart" onClick={() => this.saveIntoCart(serviceObject)} className="btnn btn-success btn-block btn-lg margintop-30 btnNext">Add to cart</button>
                            </fieldset>
                        </div>
                    </div>
                    <div className="AddToCartFormFooter"></div>
                </form>
            </div>

        );
    }

}
const mapStateToProps = state => {
    return {
        StoreData: state.groups
    };
};

export default connect(mapStateToProps, null)(AddToCart);

import React,{Component} from 'react';


class PayUnsuccessful extends Component {
  render(){
  return (
   <section id="quick-pay">
        <div className="container-fluid">
        <div className="col-md-12">
            <div className="col-lg-4 col-lg-offset-4 col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 text-center">
                <div className="thankyou-wrap">
                    <h3>Transaction Failed</h3>
                    <img src="~/Content/Images/fail.png"  alt="Failed"/>
                    <p>This payment failed because the card was expired, invalid or do not have sufficient funds.</p>
                    <a href="/" className="btn btn-info btn-lg margintop-20" type="button">Home</a>
                    <a href="/ShoppingCart" className="btn btn-success btn-lg margintop-20" type="button">TryAgain</a>
                </div>
            </div>
        </div>
        </div>
      </section>

  );
}
}

export default PayUnsuccessful;

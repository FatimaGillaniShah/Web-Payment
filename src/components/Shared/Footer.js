import React,{Component} from 'react';
import logo from '../../content/img/PCI_logo.gif';

class Footer extends Component {
  render(){
  return (
   <div className="footer">
        <div className="container">
		<div className="row">
			<div className="col-md-2">
          
						<img src={logo} alt ="footer"/>
			
            </div>
            <div className="col-md-10 text-center">
					<span className="copyright">
						Copyright © 2011 - 2019 SADAD Electronic Payment System BSC Closed. All Rights Reserved. <br/>
						SADAD Electronic Payment System BSC Closed is licensed and regulated as an Ancillary Payment Service Provider by the Central Bank of Bahrain. <br></br>
						<a href="https://sadadbahrain.com/app/tos.html">Terms of Services</a>  &nbsp;&nbsp;&nbsp;&nbsp;
                        <a href="https://sadadbahrain.com/app/privacy.html">Privacy Policy</a>
					</span>
				</div>

        </div>
      </div>
      </div>

  );
}
}

export default Footer;

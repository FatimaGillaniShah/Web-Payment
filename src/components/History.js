import React, { Component } from 'react';
import _ from 'lodash';
import { validateLogin } from '../components/common/common';
 import {getHistory} from "../store/actions/actions";
 import { connect } from 'react-redux';
 import { bindActionCreators } from 'redux'
 

class History extends Component {
    constructor(props) {
        super(props)
        this.state = {
            services: [],
        }
        let isValid = validateLogin();
        if (!isValid) {
            this.props.history.push("/login");
        }
    }
    componentDidMount() {

        this.props.Data();

    }

    render() {
      let data = this.props.historyData;
      if(data!= null){
       let details = [];
       data.forEach(element => {
         details = _.get(element, 'information');
         details["iconUrl"] = _.get(element, 'service-icon')
         this.state.services.push(details);
      });
      }
        return (

           <div class="row">

          <div 
          className={this.state.services.length === 0 ? "row loaderDiv show" : "row loaderDiv hide"} style={{width:'100%'}} 
          >
          <div className="col-md-12">
            <div className="ph-item">
              <div className="ph-col-12">
                <div className="ph-picture"></div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="ph-item">
              <div className="ph-col-12">
                <div className="ph-picture"></div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="ph-item">
              <div className="ph-col-12">
                <div className="ph-picture"></div>
              </div>
            </div>
          </div>
        </div>
                
           {this.state.services.map((e, i) =>
                    <div class="col-md-12">
    
                        <div class="history-title" style={{ marginTop: '30px' }}>
                            
                            <p>{(_.get(e, 'Date Time')).split(' ')[0]}</p>
                            
                        </div>
                        
                        <div class="col-md-12">
                            <div class="history-wrap clearfix">
                                <div class="col-md-12 history-content clearfix">

                                    <img alt="" class="img-responsive" src={e.iconUrl} />

                                    <div class="left">
                                        <h4> </h4>
                                        <p>{_.get(e, 'Service Name')}</p>
                                    </div>

                                    <div class="right">

                                        <span>
                                            BHD {e.Amount}
                                        </span>

                                        <p>{(_.get(e, 'Date Time')).split(' ')[1]}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </div>

        );
    }
}


const mapStateToProps = state => {
  
  return {historyData:state.historyReducer}
};

const mapDispatchToProps = (dispatch) => {

  return {
    Data:bindActionCreators(getHistory,dispatch)    
         }
};
export default connect(mapStateToProps, mapDispatchToProps)(History);
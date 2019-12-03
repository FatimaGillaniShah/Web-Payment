import React, { Component } from 'react';
import { Histroy } from '../api/ApiCalls';
import _ from 'lodash';
import { validateLogin } from '../components/common/common';
class History extends Component {
    constructor(props) {
        super(props)
        this.state = {
            transaction: [],
            services: [],
        }
        let isValid = validateLogin();
        if (!isValid) {
            this.props.history.push("/login");
        }
    }
    componentDidMount() {
        let sessionId = localStorage.getItem('sessionId');

        let historyRequestObject = {
            'session-id': sessionId,
            'offset': 0,
            'count': 0,
            'day-filter': 1,
            'transaction-type-filter': 1,
            'locale': 0,
        }
        let historyResult = Histroy(historyRequestObject);
        Promise.resolve(historyResult).then(value => {
            if (value != undefined) {
                this.setState({ transaction: value });
                this.state.transaction = value;
               
                let details = [];
                this.state.transaction.forEach(element => {
                    details = _.get(element, 'information');
                    details["iconUrl"] = _.get(element, 'service-icon')
                    this.state.services.push(details);
                });
                
                this.setState({
                    services: this.state.services
                });
        
            }
        })

    }

    render() {
        return (

           <div class="row">



<div className={this.state.services.length === 0 ? "row loaderDiv show" : "row loaderDiv hide"} style={{width:'100%'}} >
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
                        
                         {/* {this.DateDivStyle((_.get(e, 'Date Time')).split(' ')[0])}  */}
                         

                        <div class="history-title" style={{ marginTop: '30px' }}>
                            
                            <p>{(_.get(e, 'Date Time')).split(' ')[0]}</p>
                            
                        </div>
                        
                        <div class="col-md-12">
                            <div class="history-wrap clearfix">
                                <div class="col-md-12 history-content clearfix">

                                    <img alt="" class="img-responsive" src={e.iconUrl} />

                                    <div class="left">
                                        <h4></h4>
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

export default History;

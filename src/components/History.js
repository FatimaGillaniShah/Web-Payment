import React, { Component } from 'react';
import _ from 'lodash';
import Pagination from './Pagination';
import {paginate} from '../utils/Paginate';
import {validateLogin} from '../components/common/common';
import {getHistory} from "../store/actions/actions";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'

class History extends Component {
    constructor(props) {
        super(props)
        this.state = {
            services: [],
            pageSize : 15,
            currentPage : 1,
            initialState : []
        }
        let isValid = validateLogin();
        if (!isValid) {

            this.props.history.push("/login");
        }
        const HistoryDateFlag = "";
    }

    componentDidMount() {

        this.props.Data();

    }
    DateHeader(ServiceObject){


      let ServiceObjectDate = _.get(ServiceObject, 'Date Time').split(' ')[0];

      let OldServiceObjectDate = this.HistoryDateFlag;

      if(ServiceObjectDate === OldServiceObjectDate)
      {
        return false;
      }
      else
      {
        this.HistoryDateFlag = ServiceObjectDate;
        return true;
      }
    }
    handlePageChange = page =>{
     this.setState({
       currentPage : page
     })
    }

    render() {
      
      let data = this.props.historyData;
      if(data!= null){
         this.state.services = [];
         let details = [];
         data.forEach(element => {
         details = _.get(element, 'information');
         details["iconUrl"] = _.get(element, 'service-icon')
         this.state.services.push(details);
         
      });
      }
      const count = this.state.services.length;
      const {pageSize, currentPage, services:allServices} = this.state;
      const services = paginate(allServices,currentPage,pageSize);
      
      
        return (

           <div className="row">

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
          <div className="col-md-12">
             
          </div>
        
           {services.map((e, i) =>
                    <div className="col-md-12">
                    
                        <div className={this.DateHeader(e) ? "history-title show":"history-title hide"} style={{ marginTop: '30px' }}>
                            
                            <p>{(_.get(e, 'Date Time')).split(' ')[0]}</p>
                            
                        </div>
                        
                        <div className="col-md-12">
                            <div className="history-wrap clearfix">
                                <div className="col-md-12 history-content clearfix">

                                    <img alt="" className="img-responsive" src={e.iconUrl} />

                                    <div className="left">
                                        <h4> </h4>
                                        <p>{_.get(e, 'Service Name')}</p>
                                    </div>

                                    <div className="right">

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
                <div style={{marginLeft: "50px"}} >
                <Pagination 
                  itemsCount = {count}
                  pageSize = {this.state.pageSize}
                  onPageChange={this.handlePageChange}
                  currentPage = {this.state.currentPage}
                 />
                 </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
  
  return {historyData:state.historyReducer.transactions}
};

const mapDispatchToProps = (dispatch) => {

  return {
    Data:bindActionCreators(getHistory,dispatch)    
         }
};
export default connect(mapStateToProps, mapDispatchToProps)(History);
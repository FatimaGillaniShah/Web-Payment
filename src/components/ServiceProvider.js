import React, { Component } from 'react';
import { connect } from 'react-redux';
import { validateLogin } from '../components/common/common';
import _ from 'lodash';

class ServiceProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      servicesOrGroups: [],
      FoundGroups: false
    }
  }
  
  validateGroupsForServices(groupObject) {
    let serviceProviderId = _.get(groupObject, 'group-id');
    let isValid = validateLogin();
    if (!isValid) {
      localStorage.setItem('redirectTo' , 'ServiceProvider/'+serviceProviderId);
      this.props.history.push("/login");
    }
    else
    {
      let serviceCheckHasSteps = _.get(groupObject, 'has-steps');
      let GroupId = _.get(groupObject, 'id');
      if (serviceCheckHasSteps === undefined) {
        this.props.history.push("/SubGroups/" + GroupId);  
      }
      else {
        this.props.history.push("/AddToCart/" + GroupId);
      }
    }
  }

  prepareDataToRender(Id) {
    var StoreData = this.props.StoreData;
    if (StoreData !== null && StoreData !== undefined) {

      let AllGroups = _.get(this.props.StoreData, 'groups');
      let AllServices = _.get(this.props.StoreData, 'services');
      if(AllGroups !== undefined && AllServices !== undefined){
      AllGroups.forEach(groupElement => {
       
        let parent_group_id = _.get(groupElement, 'parent-group-id');
        if (parent_group_id === Id) {
         
          _.assign(groupElement, { iconUrl: _.get(groupElement, 'icons.650x420') })
          this.state.servicesOrGroups.push(groupElement);

        }
      });
    
      AllServices.forEach(element => {

        let group_id = _.get(element, 'group-id');
        if (group_id === Id) {
        
          _.assign(element, { iconUrl: _.get(element, 'icons.650x420') })
          this.state.servicesOrGroups.push(element);

        }
      });

    }
}}
  
  render() {
  
    var Id = this.props.match.params.id;
   
     this.prepareDataToRender(Id);
    
    return (

      <div className="Main">
        <div className="col-md-12">

          {this.state.servicesOrGroups.map((e, i) =>

            <div className="col-lg-3 col-md-3 col-sm-1 col-xs-1" key={i}>
        
              <div className="portfolio-box " onClick={() => this.validateGroupsForServices(e)}>
              
                <div >
                
                  <div className="price"></div>
                  <img alt="" className="img-responsive" src={e.iconUrl} />
                  <div className="portfolio-box-caption portfolio-box-block">
                    <div className="portfolio-box-caption-content">
                      <div className="project-name">{e.name}</div>
                    </div>
                  </div>
                  <div className="info-wrap">
                    <h4>{e.name}</h4>
                  </div>
                </div>
        
    </div>
    
            </div>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {  
  
  return {
    StoreData: state.groups
  };
};

export default connect(mapStateToProps, null)(ServiceProvider);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

class ServiceProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      servicesOrGroups: [],
      CheckColor: true,
      FoundGroups: false
    }
  }
  
  validateGroupsForServices(groupObject) {
    let serviceCheckHasSteps = _.get(groupObject, 'has-steps');
    let GroupId = _.get(groupObject, 'id');
    if (serviceCheckHasSteps == undefined) {
      this.props.history.push("/SubGroups/" + GroupId);  
    }
    else {
      this.props.history.push("/AddToCart/" + GroupId);
    }

  }

  prepareDataToRender(Id) {
    var Id = Id;
    debugger;
    var StoreData = this.props.StoreData;

    if (StoreData != null && StoreData != undefined) {

      let AllGroups = _.get(this.props.StoreData, 'groups');
      let AllServices = _.get(this.props.StoreData, 'services');
      if(AllGroups!=undefined && AllServices!=undefined){
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

  ChangeColor(i) {
    if (i % 2 == 0) {
      this.state.CheckColor = true

    }
    else {
      this.state.CheckColor = false
    }
  }
  
  render() {
  
    var Id = this.props.match.params.id
   
     this.prepareDataToRender(Id)
    
    return (

      <div className="Main">
        <div className="row">

          {this.state.servicesOrGroups.map((e, i) =>

            <div className="col-md-3 col-sm-1" key={i}>
        
              <a class="portfolio-box " onClick={() => this.validateGroupsForServices(e)}>
              
                <div >
                
                  <div class="price"></div>
                  <img alt="" class="img-responsive" src={e.iconUrl} />
                  <div class="portfolio-box-caption portfolio-box-block">
                    <div class="portfolio-box-caption-content">
                      <div class="project-name">{e.name}</div>
                    </div>
                  </div>
                  <div class="info-wrap">
                    <h4>{e.name}</h4>
                  </div>
                </div>
        
    </a>
    
            </div>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {  
  debugger;
  return {
    StoreData: state.groups
  };
};

export default connect(mapStateToProps, null)(ServiceProvider);

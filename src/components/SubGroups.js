import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

class ServiceProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      servicesOrGroups: [],

    }
  }

  validateGroupsForServices(groupObject) {
    let serviceCheckHasSteps = _.get(groupObject, 'has-steps');
    let GroupId = _.get(groupObject, 'id');
    if (serviceCheckHasSteps == undefined) {
      this.prepareDataToRender(GroupId);
    }
    else {
      this.props.history.push("/AddToCart/" + GroupId);
    }
  }

  prepareDataToRender(Id) {
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
    }}
  }

  render() {
    var Id = this.props.match.params.id;
    this.prepareDataToRender(Id);
    return (

      <div className="Main">
        <div className="row">

          {this.state.servicesOrGroups.map((e, i) =>

            <div className="col-md-3 col-sm-1" key={i}>

              <div className="portfolio-box" onClick={() => this.validateGroupsForServices(e)}>

              <div class="price"></div>
                <img alt="" class="img-responsive" src={e.iconUrl} />
                <div class="portfolio-box-caption portfolio-box-block">
                  <div class="portfolio-box-caption-content">
                    <div class="project-name">{e.identifier}</div>
                  </div>
                </div>
                <div class="info-wrap">
                  <h4>{e.identifier}</h4>
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

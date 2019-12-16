import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';


class Home extends Component {
  
  ChangeColor(i) {
    if (i % 2 === 0) {
      return true;
    }
    else {
      return false;
    }
  }

  render() {
   
    var filteredGruops = [];
    let groups = this.props.data;
    if(groups!=null){
      groups.forEach(e => {
        let isParent = _.get(e, 'parent-group-id');
        if (isParent === "") {
          filteredGruops.push(e);
        }
        let isAvailable = _.get(e, 'available');
        if (isAvailable) {
           _.assign(e, { iconUrlSmall: _.get(e, 'icons.75x75'), iconUrlLarge: _.get(e, 'icons.650x420') });
        }
      });
   
   }
    
   groups = filteredGruops;

    return (
      <div className="Main">
        <div className="container-fluid online-pay-content">        
          <div className={groups.length === 0 ? "row loaderDiv show" : "row loaderDiv hide"} >
          <div className="col-md-3">
            <div className="ph-item">
              <div className="ph-col-12">
                <div className="ph-picture"></div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="ph-item">
              <div className="ph-col-12">
                <div className="ph-picture"></div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="ph-item">
              <div className="ph-col-12">
                <div className="ph-picture"></div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="ph-item">
              <div className="ph-col-12">
                <div className="ph-picture"></div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="ph-item">
              <div className="ph-col-12">
                <div className="ph-picture"></div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="ph-item">
              <div className="ph-col-12">
                <div className="ph-picture"></div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="ph-item">
              <div className="ph-col-12">
                <div className="ph-picture"></div>
              </div>
            </div>
          </div>
        </div>
        
          <div className="row">
            {groups.map((e, i) =>

              <div className="col-md-3 col-sm-1" key={i}>
                
                <Link to={{
                  pathname: "/ServiceProvider/" + e.id,

                }} className="portfolio-box">

                  <div
                    className={this.ChangeColor(i) ? "portfolio-box-caption" : "portfolio-box-caption purple"}
                  >
                    <div className="portfolio-box-caption-content">

                      <div className="project-category">
                        <img alt="img" src={e.iconUrlSmall} />
                      </div>
                      <div className="project-name">{e.name} </div>
                    </div>
                  </div>
                  <img alt="img" className="img-responsive" src={e.iconUrlLarge} />

                </Link>

              </div>

            )}
          </div>
        </div>
      </div>
     );
  }
}


const mapStateToProps = state => {
    return {data:state.groups.groups}
 };

export default connect(mapStateToProps, null)(Home);

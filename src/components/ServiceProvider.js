import React, { Component } from 'react';
import { connect } from 'react-redux';
import { validateLogin } from '../components/common/common';
import _ from 'lodash';
import {Grid, Container, Typography, Card} from '@material-ui/core';

const styles = {
  paper1: {
    display: 'block',
    position: 'relative',
    marginTop: '30px',
    marginBottom: '15px',
    border: 'solid 10px #fff',
    color: 'white'
  },
  paper2: {
    display: 'block',
    position: 'relative',
    marginTop: '15px',
    marginBottom: '15px',
    background: '#0061ae',
    border: 'solid 10px #fff',
    color: 'white'
  },
  paperImg: {
    color: 'black',
    maxWidth: '100%',
    borderBottom: 'solid 1px #ddd'
  },
  paperHeading: {    
    color: 'black',
    marginTop: '10px'
  }
}

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
      localStorage.setItem('redirectTo', 'ServiceProvider/' + serviceProviderId);
      this.props.history.push("/login");
    }
    else {
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
      if (AllGroups !== undefined && AllServices !== undefined) {
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
    }
  }

  render() {

    var Id = this.props.match.params.id;

    this.prepareDataToRender(Id);

    return (
      <Container maxWidth="false">
        <Grid container spacing={3}>
          {this.state.servicesOrGroups.map((e, i) =>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card elevation={16} style={styles.paper1} onClick={() => this.validateGroupsForServices(e)}>
                <img alt="img" src={e.iconUrl} style={styles.paperImg} />
                <Typography variant="h4" style={styles.paperHeading}>{e.name}</Typography>
              </Card>
            </Grid>
          )}
        </Grid>
      </Container>
    );
  }
}
const mapStateToProps = state => {

  return {
    StoreData: state.groups
  };
};

export default connect(mapStateToProps, null)(ServiceProvider);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { validateLogin } from '../components/common/common';
import _ from 'lodash';
import {Grid, Container, CardMedia,CardHeader,Avatar, Card} from '@material-ui/core';

const styles = {
  card: {
    maxWidth: '345',
    marginTop:'30px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  },
  avatarEven: {
    backgroundColor: '#1cc1f7',
    textAlign:'left',
    color:'white',
    fontFamily: 'inherit',
    fontSize: '18px'
  },
  avatarOdd: {
    backgroundColor: '#1961d7',
    textAlign:'left',
    color:'white',
    fontFamily: 'inherit',
    fontSize: '18px'
  },
  avatarImage: {
    maxWidth: '85%'
  },
  LinkText: {
    color: 'white',
    cursor: 'pointer'
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

  ChangeColor(i) {
    if (i % 2 === 0) {
      return true;
    }
    else {
      return false;
    }
  }

  render() {

    var Id = this.props.match.params.id;

    this.prepareDataToRender(Id);

    return (

<Container maxWidth="xl">
        <Grid container spacing={3}>
          {this.state.servicesOrGroups.map((e, i) =>
            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
              <Card elevation={16} style={styles.card} onClick={() => this.validateGroupsForServices(e)}>                      
                  <CardMedia
                    style={styles.media}
                    image={e.iconUrl}
                    title={e.name}
                  />
                  <CardHeader 
                  avatar={
                    <Avatar aria-label="recipe" style={this.ChangeColor(i) ? styles.avatarEven : styles.avatarOdd}>
                      <img alt="img" src={e.iconUrl} style={styles.avatarImage} />
                    </Avatar>}
                    titleTypographyProps={{ variant: 'h4', }}
                    disableTypography={true}
                    style={this.ChangeColor(i) ? styles.avatarEven : styles.avatarOdd}
                    title={e.name}
                  />                
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

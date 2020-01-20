import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import LoadingHtml from '../components/Shared/LoadingHtml';
import { Grid, Container, CardHeader, Avatar, Paper, InputBase, IconButton, TextField } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { validateLogin } from './common/common';
import Image from 'material-ui-image';
import styles from '../content/css/styles';
import { Spring, animated } from "react-spring/renderprops";
import SearchIcon from '@material-ui/icons/Search';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      show: false,
      searchedServices: [],
      searchedServiceName: ""
    }
    let isValid = validateLogin();
    if (isValid) {

      this.props.history.push("/");
    }
    this.searchServices = this.searchServices.bind(this);
  }

  ChangeColor(i) {
    if (i % 2 === 0) {
      return true;
    }
    else {
      return false;
    }
  }
  reload = () => {
    this.setState({ show: false })
    this.setTimeout(() => this.setState(state => ({ count: state.count + 1, show: true })), 500)
  }

  searchServices(event) {
    let searchedServiceName = event.target.value;
    if (searchedServiceName !== "") {
      searchedServiceName = searchedServiceName.toLowerCase();
      let searchedServicesArray = [];
      let groupsAndServices = this.props.services;

      if (groupsAndServices != null) {
        groupsAndServices.forEach(e => {
          let serviceName = (_.get(e, 'name')).toLowerCase();
          let parentServiceId = _.get(e, 'parent-service-id');
          let isAvailable = _.get(e, 'available');
          if (serviceName.includes(searchedServiceName) && parentServiceId === null && isAvailable === true) {
            searchedServicesArray.push(e);
          }
        });
      }

      this.setState({
        searchedServices: searchedServicesArray,
        searchedServiceName:searchedServiceName
      });
    }
    else
    {
      this.setState({
        searchedServices: [],
        searchedServiceName:""
      });
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

  render() {

    var filteredGruops = [];
    let groups = this.props.data;
    if (groups != null) {
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

      <Spring
        native
        from={{ o: 0, xyz: [0, 500, 0] }}
        to={{ o: 1, xyz: [0, 0, 0] }}
      >
        {({ o, xyz }) => (
          <animated.div style={{
            transform: xyz.interpolate(
              (x, y, z) => `translate3d(${x}px, ${y}px, ${z}px)`
            )
          }}>
            <Container maxWidth="xl">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Paper component="form" style={styles.searchBar}>
                    <InputBase
                      style={styles.searchInput}
                      placeholder="Search Services"
                      inputProps={{ 'aria-label': 'search services' }}
                      onChange={this.searchServices}
                      value={this.state.searchedServiceName}
                    />
                    <IconButton type="button" onClick={() => this.searchServices()} style={styles.searchButton} aria-label="search">
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                </Grid>
              </Grid>

              {this.state.searchedServices.length > 0 ?
                <Fragment>
                  <Grid container spacing={3}>
                    {this.state.searchedServices.map((e, i) =>
                      <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                        <Card elevation={16} style={styles.card} onClick={() => this.validateGroupsForServices(e)}>
                          <Image
                            src={_.get(e, 'icons.650x420')}
                            style={styles.media}
                            title={e.name}
                          />
                          <CardHeader
                            titleTypographyProps={{ variant: 'h4', }}
                            disableTypography={true}
                            style={this.ChangeColor(i) ? styles.avatarEven : styles.avatarOdd}
                            title={e.name}
                          />
                        </Card>
                      </Grid>
                    )}
                  </Grid>
                </Fragment>
                :
                <Fragment></Fragment>
              }
              <Grid container spacing={3}>
                {groups.length === 0 ? <LoadingHtml /> : <Fragment></Fragment>}
                {groups.map((e, i) =>
                  <Grid item xs={12} sm={6} md={4} lg={3} key={i}>

                    <Card elevation={16} style={styles.card}>
                      <Link to={{ pathname: "/ServiceProvider/" + e.id, }} style={styles.LinkTextHome}>
                        <Image
                          src={e.iconUrlLarge}
                          style={styles.media}
                          title={e.name}
                        />
                        <CardHeader
                          avatar={
                            <Avatar aria-label="recipe" style={this.ChangeColor(i) ? styles.avatarEven : styles.avatarOdd}>
                              <img alt="img" src={e.iconUrlSmall} style={styles.avatarImage} />
                            </Avatar>}
                          titleTypographyProps={{ variant: 'h4', }}
                          disableTypography={true}
                          style={this.ChangeColor(i) ? styles.avatarEven : styles.avatarOdd}
                          title={e.name}
                        />
                      </Link>
                    </Card>

                  </Grid>
                )}
              </Grid>
            </Container>
          </animated.div>
        )}
      </Spring>
    );
  }
}

const mapStateToProps = state => {
  //console.log(state.groups.services);
  return { data: state.groups.groups, services: state.groups.services }
};
export default connect(mapStateToProps, null)(Home);

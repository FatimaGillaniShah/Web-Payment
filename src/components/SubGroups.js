import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Grid, Container, CardHeader, Card } from '@material-ui/core';
import styles from '../content/css/styles';
import Image from 'material-ui-image';
import { Spring, animated } from "react-spring/renderprops";

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
    if (serviceCheckHasSteps === undefined) {
      this.prepareDataToRender(GroupId);
    }
    else {
      this.props.history.push("/AddToCart/" + GroupId);
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
                {this.state.servicesOrGroups.map((e, i) =>
                  <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                    <Card elevation={16} style={styles.card} onClick={() => this.validateGroupsForServices(e)}>

                      <Image
                        src={e.iconUrl}
                        style={styles.media}
                        title={e.name}
                      />

                      <CardHeader
                        titleTypographyProps={{ variant: 'h4', }}
                        disableTypography={true}
                        style={this.ChangeColor(i) ? styles.avatarEven : styles.avatarOdd}
                        title={e.identifier}
                      />
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
  return {
    StoreData: state.groups
  };
};

export default connect(mapStateToProps, null)(ServiceProvider);

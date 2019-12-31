import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import LoadingHtml from '../components/Shared/LoadingHtml';
import {Paper, Grid, Container, Typography} from '@material-ui/core';

const styles = {
  paper1: {
    display: 'block',
    position: 'relative',
    marginTop: '15px',
    marginBottom: '15px',
    background: '#1cc1f7',
    boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.15)',
    border: 'solid 10px #fff',
    color: 'white'
  },
  paper2: {
    display: 'block',
    position: 'relative',
    marginTop: '15px',
    marginBottom: '15px',
    background: '#0061ae',
    boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.15)',
    border: 'solid 10px #fff',
    color: 'white'
  },
  LinkText:
  {
    color: 'white'
  }

}



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
      <Container maxWidth="false">
        <Grid container spacing={1}>
          {groups.map((e, i) =>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Paper style={this.ChangeColor(i) ?  styles.paper1 : styles.paper2}>
                <Link to={{ pathname: "/ServiceProvider/" + e.id, }} style={styles.LinkText}>
                <img alt="img" src={e.iconUrlSmall} />
                <img alt="img" style={{ display: "none" }} src={e.iconUrlLarge} />
                <Typography variant="h3">{e.name}</Typography>
                </Link>
              </Paper>
            </Grid>
          )}
        </Grid>        
      </Container>
    );
  }
}


const mapStateToProps = state => {
  return { data: state.groups.groups }
};

export default connect(mapStateToProps, null)(Home);

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import LoadingHtml from '../components/Shared/LoadingHtml';
import { Paper, Grid, Container, Typography, CardHeader, Avatar, CardMedia } from '@material-ui/core';
import Card from '@material-ui/core/Card';

const styles = {
  card: {
    maxWidth: '345',
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  },
  avatarEven: {
    backgroundColor: '#1cc1f7'
  },
  avatarOdd: {
    backgroundColor: '#1961d7'
  },
  avatarImage: {
    maxWidth: '85%'
  },
  LinkText: {
    color: 'black'
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
        <Grid container spacing={3}>
          {groups.map((e, i) =>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card elevation={16} style={styles.card}>
                <Link to={{ pathname: "/ServiceProvider/" + e.id, }} style={styles.LinkText}>
                  <CardHeader
                    avatar={<Avatar aria-label="recipe" style={this.ChangeColor(i) ? styles.avatarEven : styles.avatarOdd}>
                      <img alt="img" src={e.iconUrlSmall} style={styles.avatarImage} />
                    </Avatar>}
                    titleTypographyProps={{ variant: 'h4', }}
                    style={{ textAlign: 'left' }}
                    title={e.name}
                  />
                  <CardMedia
                    style={styles.media}
                    image={e.iconUrlLarge}
                    title={e.name}
                  />
                </Link>
              </Card>
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

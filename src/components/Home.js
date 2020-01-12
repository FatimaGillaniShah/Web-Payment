import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import LoadingHtml from '../components/Shared/LoadingHtml';
import {Grid, Container, CardHeader, Avatar, CardMedia } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { validateLogin } from './common/common';
import CircularProgress from '@material-ui/core/CircularProgress';
//import Image from 'material-ui-image'

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


class Home extends Component {
  constructor(props) {
    super(props);
    this.state={
      count: 0,
      show: false
    }
  
    
    let isValid = validateLogin();
    if (isValid) {
        this.props.history.push("/");
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
  reload = () => {
    this.setState({ show: false })
    this.setTimeout(() => this.setState(state => ({ count: state.count + 1, show: true })), 500)
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
      <Container maxWidth="xl">
        <Grid container spacing={3}>
        {groups.length === 0 ? <LoadingHtml /> : " " }
       
          {groups.map((e, i) =>
            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
              <Card elevation={16} style={styles.card}>
                <Link to={{ pathname: "/ServiceProvider/" + e.id, }} style={styles.LinkText}> 
                {/* <Image
                     src={e.iconUrlLarge}
                  />  */}
                      
                  <CardMedia   
                  style={styles.media} 
                  image={e.iconUrlLarge}
                  title={e.name} >
                  </CardMedia>
                 
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
    );
  }
}


const mapStateToProps = state => {
  return { data: state.groups.groups }
};

export default connect(mapStateToProps, null)(Home);

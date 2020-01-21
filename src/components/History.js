import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import Pagination from './Pagination';
import { paginate } from '../utils/Paginate';
import { validateLogin } from '../components/common/common';
import { getHistory } from "../store/actions/actions";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import LoadingHtmlHistory from '../components/Shared/LoadingHtmlHistory';
import { Container, Grid, Card, CardContent, Typography, Hidden,Fab } from '@material-ui/core';
import styles from '../content/css/styles';
import { Spring, animated } from "react-spring/renderprops";
var isLoading = true;
class History extends Component {
  constructor(props) {
    super(props)
    this.state = {
      services: [],
      pageSize: 15,
      currentPage: 1
    }
    let isValid = validateLogin();
    if (!isValid) {

      this.props.history.push("/login");
    }
  }

  componentDidMount() {
    this.props.Data();
  }
  DateHeader(ServiceObject) {

    let ServiceObjectDate = _.get(ServiceObject, 'Date Time').split(' ')[0];

    let OldServiceObjectDate = this.HistoryDateFlag;

    if (ServiceObjectDate === OldServiceObjectDate) {
      return false;
    }
    else {
      this.HistoryDateFlag = ServiceObjectDate;
      return true;
    }
  }

  handlePageChange = page => {
    this.setState({
      currentPage: page
    })
  }
  NavigateToHome = () => {
    this.props.history.push('/');
}

  render() {

    let data = this.props.historyData;
    let localServices = [];
    if (data !== null && data !== undefined) {
      localServices = [];
      let details = [];
      isLoading = false;
      data.forEach(element => {
        details = _.get(element, 'information');
        details["iconUrl"] = _.get(element, 'service-icon');
        localServices.push(details);
      });
    }
    const count = localServices.length;
    const { pageSize, currentPage } = this.state;
    const services = paginate(localServices, currentPage, pageSize);


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
            <Container style={styles.containerStart}>
              <Grid item xs={12} sm={12} md={12} lg={12}>

                <Pagination
                  itemsCount={count}
                  pageSize={this.state.pageSize}
                  onPageChange={this.handlePageChange}
                  currentPage={this.state.currentPage}
                />

              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  {services.length === 0 && isLoading === true ? 
                  <LoadingHtmlHistory /> 
                  : 

                  services.length === 0 && isLoading === false ?
                  (
                    <Grid container spacing={10}>
                                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={styles.cardGrid}>
                                            <Card elevation={16} style={styles.CardCard}>
                                                <CardContent>
                                                    <Fragment>
                                                        <Grid>
                                                            <Grid item style={styles.CardContentSegments}>
                                                                <Typography style={styles.EmptyCartHeading}>OOPS! NOTHING FOUND!</Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Fragment>
                                                    <Fragment>
                                                        <Grid>
                                                            <Grid item style={styles.CardContentSegments}>
                                                                <img style={{ marginBottom: '3%' }} src={require('../content/img/empty-cart.png')} alt="sadad" />
                                                            </Grid>
                                                        </Grid>
                                                        <Typography style={styles.CartSubHeading}>No records found. Please do some transactions to see history.</Typography>
                                                        <Fab variant="extended" color="primary" aria-label="add" onClick={() => this.NavigateToHome()} style={styles.TakeMeHomeBtn} >
                                                            TAKE ME HOME
                                            </Fab>
                                                    </Fragment>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    </Grid>
                  )
                  
                  :
                  null}

                  {services.map((e, i) =>
                    <Card>
                      <CardContent style={styles.cardArea}>

                        {this.DateHeader(e) ? (
                          <Grid style={styles.cardHeader}>
                            <Grid item>
                              <Typography variant='h4'>
                                {(_.get(e, 'Date Time')).split(' ')[0]}
                              </Typography>
                            </Grid>
                          </Grid>
                        ) : (
                            <Fragment></Fragment>
                          )
                        }

                        <Grid container spacing={3}>
                          <Grid Item item xs={1} sm={1} md={1} lg={1}>
                            <img alt="" src={e.iconUrl} style={styles.CardIcon} />
                          </Grid>

                          <Grid Item item xs={8} sm={8} md={8} lg={8} >
                            <Hidden smDown='true'>
                              <Typography variant='h5' style={styles.CardName}>
                                {_.get(e, 'Service Name')}
                              </Typography>
                            </Hidden>
                          </Grid>

                          <Grid Item item xs={2} sm={2} md={2} lg={2}>
                            <Typography style={styles.CardAmount}>BHD {e.Amount}</Typography>
                            <p>{(_.get(e, 'Date Time')).split(' ')[1]}</p>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>

                  )}
                </Grid>
              </Grid>

            </Container>
          </animated.div>
        )}
      </Spring>
    );
  }
}

const mapStateToProps = state => {

  return { historyData: state.historyReducer.transactions }
};

const mapDispatchToProps = (dispatch) => {

  return {
    Data: bindActionCreators(getHistory, dispatch)
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(History);
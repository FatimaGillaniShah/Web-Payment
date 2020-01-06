import React, { Component,Fragment } from 'react';
import _ from 'lodash';
import Pagination from './Pagination';
import { paginate } from '../utils/Paginate';
import { validateLogin } from '../components/common/common';
import { getHistory } from "../store/actions/actions";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import LoadingHtmlHistory from '../components/Shared/LoadingHtmlHistory';
import { Container, Grid, Card, CardContent, Typography, Hidden } from '@material-ui/core';

const styles = {
  containerStart:{
    marginTop:'30px'
  },
  cardArea:{
    paddingBottom: 'unset'
  },
  cardHeader: {
    backgroundColor:'#DDDDDD',
    width:'100%',
    textAlign:'Center',
    padding:'10px 15px',
    marginTop: '10px',
    marginBottom: '10px'
  },
  CardName:{
    textAlign: 'left',
    paddingTop: '20px',
    paddingLeft: '20px'
  },
  CardIcon:{
    height:'50px'
  },
  CardAmount:{
    color:'#0888e9',
    fontSize: '18px',
    fontWeight:'800'
  }
}

class History extends Component {
  constructor(props) {
    super(props)
    this.state = {
      services: [],
      pageSize: 15,
      currentPage: 1,
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
  
  render() {

    let data = this.props.historyData;
    let localServices = [];
    if (data != null) {
      localServices = [];     
      let details = [];
      data.forEach(element => {
        details = _.get(element, 'information');
        details["iconUrl"] = _.get(element, 'service-icon');
        localServices.push(details);

      });
    }
    const count = localServices.length;
    const { pageSize, currentPage} = this.state;
    const services = paginate(localServices, currentPage, pageSize);


    return (


      <Container  style={styles.containerStart}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
          {services.length === 0 ? <LoadingHtmlHistory /> : "" }


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
        <Grid item xs={12} sm={12} md={12} lg={12}>
        
          <Pagination
            itemsCount={count}
            pageSize={this.state.pageSize}
            onPageChange={this.handlePageChange}
            currentPage={this.state.currentPage}
          />
        
        </Grid>
      </Container>

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
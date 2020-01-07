import React, { Component } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { Grid, Card } from '@material-ui/core';
import { Fragment } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
  card: {
    marginTop: '30px'
  },

}

function LoadingHTML() {
  return (

    <Fragment>
      <Grid item xs={12} sm={6} md={4} lg={3} key={0}>
        <Card elevation={16} style={styles.card}>

          <Skeleton variant="rect" height={210}>


            {/* <CircularProgress  style={{marginTop:'75px'}} variant="indeterminate" />  */}


          </Skeleton>

        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} key={1}>
        <Card elevation={16} style={styles.card}>
          <Skeleton variant="rect" height={210} >

          </Skeleton>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} key={2}>
        <Card elevation={16} style={styles.card}>
          <Skeleton variant="rect" height={210} >

          </Skeleton>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} key={2}>
        <Card elevation={16} style={styles.card}>
          <Skeleton variant="rect" height={210} >

          </Skeleton>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} key={2}>
        <Card elevation={16} style={styles.card}>
          <Skeleton variant="rect" height={210} >

          </Skeleton>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} key={2}>
        <Card elevation={16} style={styles.card}>
          <Skeleton variant="rect" height={210} >

          </Skeleton>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} key={2}>
        <Card elevation={16} style={styles.card}>
          <Skeleton variant="rect" height={210}>

          </Skeleton>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} key={2}>
        <Card elevation={16} style={styles.card}>
          <Skeleton variant="rect" height={210} >

          </Skeleton>
        </Card>
      </Grid>
    </Fragment>

  );

}

export default LoadingHTML;
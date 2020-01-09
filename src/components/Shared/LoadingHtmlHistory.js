import React  from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import {Grid, Card } from '@material-ui/core';
import { Fragment } from 'react';

function LoadingHTMLHistory() {
  return (

          <Fragment>
            <Grid item xs={12} sm={12} md={12} lg={12} key={0}>
              <Card elevation={16} style={{marginTop:'30px'}}>                           
                <Skeleton variant="rect" height={210} />                
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} key={0}>
              <Card elevation={16} style={{marginTop:'30px'}}>                           
                <Skeleton variant="rect" height={210} />                
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} key={0}>
              <Card elevation={16} style={{marginTop:'30px'}}>                           
                <Skeleton variant="rect" height={210} />                
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} key={0}>
              <Card elevation={16} style={{marginTop:'30px'}}>                           
                <Skeleton variant="rect" height={210} />                
              </Card>
            </Grid>
            </Fragment>

        );
    }


export default LoadingHTMLHistory;
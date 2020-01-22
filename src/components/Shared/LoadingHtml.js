import React  from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { Grid, Card, CardHeader } from '@material-ui/core';
import { Fragment } from 'react';


function LoadingHTML() {
  return (
    <Fragment>
      <Grid item xs={12} sm={6} md={4} lg={3} key={0}>
        <Card elevation={16} style={{marginTop:'30px'}}>
        <Skeleton variant="rect" height={210}>
          </Skeleton>
          <CardHeader
          avatar={<Skeleton variant="circle" width={40} height={40} />}
          title={<Skeleton height={10} width="80%" style={{ marginBottom: 6 }} />}
          subheader={<Skeleton height={10} width="40%" />}
          ></CardHeader>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} key={1}>
        <Card elevation={16} style={{marginTop:'30px'}}>
        <Skeleton variant="rect" height={210}>
          </Skeleton>
          <CardHeader
          avatar={<Skeleton variant="circle" width={40} height={40} />}
          title={<Skeleton height={10} width="80%" style={{ marginBottom: 6 }} />}
          subheader={<Skeleton height={10} width="40%" />}
          ></CardHeader>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} key={2}>
        <Card elevation={16} style={{marginTop:'30px'}}>
        <Skeleton variant="rect" height={210}>
          </Skeleton>
          <CardHeader
          avatar={<Skeleton variant="circle" width={40} height={40} />}
          title={<Skeleton height={10} width="80%" style={{ marginBottom: 6 }} />}
          subheader={<Skeleton height={10} width="40%" />}
          ></CardHeader>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} key={3}>
        <Card elevation={16} style={{marginTop:'30px'}}>
        <Skeleton variant="rect" height={210}>
          </Skeleton>
          <CardHeader
          avatar={<Skeleton variant="circle" width={40} height={40} />}
          title={<Skeleton height={10} width="80%" style={{ marginBottom: 6 }} />}
          subheader={<Skeleton height={10} width="40%" />}
          ></CardHeader>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} key={4}>
        <Card elevation={16} style={{marginTop:'30px'}}>
        <Skeleton variant="rect" height={210}>
          </Skeleton>
          <CardHeader
          avatar={<Skeleton variant="circle" width={40} height={40} />}
          title={<Skeleton height={10} width="80%" style={{ marginBottom: 6 }} />}
          subheader={<Skeleton height={10} width="40%" />}
          ></CardHeader>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} key={5}>
        <Card elevation={16} style={{marginTop:'30px'}}>
        <Skeleton variant="rect" height={210}>
          </Skeleton>
          <CardHeader
          avatar={<Skeleton variant="circle" width={40} height={40} />}
          title={<Skeleton height={10} width="80%" style={{ marginBottom: 6 }} />}
          subheader={<Skeleton height={10} width="40%" />}
          ></CardHeader>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} key={6}>
        <Card elevation={16} style={{marginTop:'30px'}}>
        <Skeleton variant="rect" height={210}>
          </Skeleton>
          <CardHeader
          avatar={<Skeleton variant="circle" width={40} height={40} />}
          title={<Skeleton height={10} width="80%" style={{ marginBottom: 6 }} />}
          subheader={<Skeleton height={10} width="40%" />}
          ></CardHeader>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} key={7}>
        <Card elevation={16} style={{marginTop:'30px'}}>
        <Skeleton variant="rect" height={210}>
          </Skeleton>
          <CardHeader
          avatar={<Skeleton variant="circle" width={40} height={40} />}
          title={<Skeleton height={10} width="80%" style={{ marginBottom: 6 }} />}
          subheader={<Skeleton height={10} width="40%" />}
          ></CardHeader>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} key={8}>
        <Card elevation={16} style={{marginTop:'30px'}}>
        <Skeleton variant="rect" height={210}>
          </Skeleton>
          <CardHeader
          avatar={<Skeleton variant="circle" width={40} height={40} />}
          title={<Skeleton height={10} width="80%" style={{ marginBottom: 6 }} />}
          subheader={<Skeleton height={10} width="40%" />}
          ></CardHeader>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} key={9}>
        <Card elevation={16} style={{marginTop:'30px'}}>
        <Skeleton variant="rect" height={210}>
          </Skeleton>
          <CardHeader
          avatar={<Skeleton variant="circle" width={40} height={40} />}
          title={<Skeleton height={10} width="80%" style={{ marginBottom: 6 }} />}
          subheader={<Skeleton height={10} width="40%" />}
          ></CardHeader>
        </Card>
      </Grid>
    </Fragment>

  );

}

export default LoadingHTML;
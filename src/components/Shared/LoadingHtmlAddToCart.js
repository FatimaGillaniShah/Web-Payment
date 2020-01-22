import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { Grid, Card, CardContent, TextField } from '@material-ui/core';
import { Fragment } from 'react';
import styles from '../../content/css/styles';
function LoadingHtmlAddToCart() {
    return (
        <Fragment>
            <Grid item xs={12} sm={12} md={12} lg={12} key={0}>

                <Card elevation={16} style={{ marginTop: '50px' }}>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Skeleton style={{ margin: 'auto' }} width={200} height={200} />
                                <Grid item style={styles.CardContentSegments} xs={12} sm={12} md={12} lg={12} xl={12}>

                                    <Skeleton style={{ margin: 'auto' }} width={500} height={70} />
                                    <Skeleton style={{ margin: 'auto' }} width={500} height={70} />
                                    <Skeleton style={{ margin: 'auto' }} width={300} height={70} />


                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>


            </Grid>
        </Fragment>

    );
}


export default LoadingHtmlAddToCart;
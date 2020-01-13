import React, { Component, Fragment } from 'react';
import { Fab, CardContent, Grid, Typography, Card } from '@material-ui/core';
import styles from '../content/css/styles';
import { Spring, animated } from "react-spring/renderprops";

class PageNotFound extends Component {

    NavigateToHome = () => {
        this.props.history.push('/');
    }
    render() {
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

                        <Grid container spacing={10}>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={styles.cardGrid}>
                                <Card elevation={16} style={styles.CardCard}>
                                    <CardContent>

                                        <Fragment>
                                            <Grid>
                                                <Grid item style={styles.CardContentSegments}>
                                                    <img style={{ marginBottom: '3%' }} src={require('../content/img/fail.png')} alt="sadad" />
                                                </Grid>
                                            </Grid>
                                            <Typography style={styles.CartSubHeading}>Page Not Found</Typography>
                                            <Fab variant="extended" color="primary" aria-label="add" onClick={() => this.NavigateToHome()} style={styles.TakeMeHomeBtn} >
                                                TAKE ME HOME
                                            </Fab>
                                        </Fragment>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </animated.div>
                )}
            </Spring>
        );
    }
}

export default PageNotFound;
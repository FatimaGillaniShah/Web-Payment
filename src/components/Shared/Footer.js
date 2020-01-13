import React, { Component } from 'react';
import logo from '../../content/img/PCI_logo.gif';
import { Container, Grid, Typography } from '@material-ui/core';
import styles from '../../content/css/styles';
class Footer extends Component {
  render() {
    return (

      <Container style={styles.FooterContainer}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Grid container spacing={3} style={styles.FooterStyling}>
              <Grid item xs={6} sm={6} md={2} lg={2}>
                <img src={logo} alt="footer" />
              </Grid>
              <Grid item xs={6} sm={6} md={10} lg={10}>
                <Typography style={styles.FooterText}>
                  Copyright © 2011 - 2019 SADAD Electronic Payment System BSC Closed. All Rights Reserved. <br />
                  SADAD Electronic Payment System BSC Closed is licensed and regulated as an Ancillary Payment Service Provider by the Central Bank of Bahrain. <br></br>
                  <a href="https://sadadbahrain.com/app/tos.html">Terms of Services</a>  &nbsp;&nbsp;&nbsp;&nbsp;
                        <a href="https://sadadbahrain.com/app/privacy.html">Privacy Policy</a>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>

    );
  }
}

export default Footer;

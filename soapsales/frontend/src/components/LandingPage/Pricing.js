import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PricingCard from '../CardPaper/PricingCard';
import Title from './Title';
import styles from './landingStyle-jss';

class Pricing extends React.Component {
  render() {
    const { classes, slideMode } = this.props;
    return (
      <div className={classes.pricing}>
        <div className={slideMode ? classes.fullWidth : classes.container}>
          <Title title="OUR GOALS" desc="NOTHING FOR US WITHOUT US" align="center" monocolor={slideMode && true} />
          <Grid container className={classes.root} spacing={5}>
            <Grid item md={4} xs={12}>
              <PricingCard
                title="TO"
                price="Acquire"
                tier="lean"
                feature={[]}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <PricingCard
                title="TO"
                price="Develop"
                tier="cheap"
                feature={[]}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <PricingCard
                title="TO"
                price="Help"
                tier="cf"
                feature={[]}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

Pricing.propTypes = {
  classes: PropTypes.object.isRequired,
  slideMode: PropTypes.bool,
};

Pricing.defaultProps = {
  slideMode: false
};

export default withStyles(styles)(Pricing);
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ShowcaseCard from '../CardPaper/ShowcaseCard';
import Title from './Title';
import styles from './landingStyle-jss';
import thumb1 from '../../images/screen/thumb1.jpg';
import thumb3 from '../../images/screen/thumb3.jpg';
import thumb5 from '../../images/screen/thumb5.jpg';
import thumb2 from '../../images/screen/thumb2.jpg';
import thumb4 from '../../images/screen/thumb4.jpg';

class ShowcaseSlider extends React.Component {
  render() {
    const { classes, slideMode } = this.props;
    return (
      <div className={classes.showcase}>
        <div className={slideMode ? classes.fullWidth : classes.container}>
          <Grid container className={classes.root} spacing={5}>
            <Grid item md={6} xs={12}>
              <Title title="Our Services" align="left" monocolor={slideMode && true} />
              <ShowcaseCard
                landscape
                title="Nam sollicitudin"
                desc="Aenean facilisis vitae purus facilisis semper."
                action="Try it"
                image={thumb1}
              />
              <ShowcaseCard
                landscape
                title="Vestibulum nec"
                desc="Cras convallis lacus orci, tristique tincidunt magna"
                action="See Demo"
                image={thumb3}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <ShowcaseCard
                landscape
                title="Curabitur"
                desc="Nulla vehicula leo ut augue tincidunt"
                action="See Demo"
                image={thumb5}
              />
              <ShowcaseCard
                landscape
                title="Nam sollicitudin"
                desc="Aenean facilisis vitae purus facilisis semper."
                action="Try It"
                image={thumb2}
              />
              <ShowcaseCard
                landscape
                title="Nam posuere accumsan"
                desc="Duis sed augue phasellus ante massa."
                action="See Demo"
                image={thumb4}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}


ShowcaseSlider.propTypes = {
  classes: PropTypes.object.isRequired,
  slideMode: PropTypes.bool
};

ShowcaseSlider.defaultProps = {
  slideMode: false
};


export default withStyles(styles)(ShowcaseSlider);

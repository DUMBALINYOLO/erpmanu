import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import reactLogo from '../../api/images/logo/react.png';
import reduxLogo from '../../api/images/logo/redux.png';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import muiLogo from '../../api/images/logo/mui.png';
import routerLogo from '../../api/images/logo/react_router.png';
import webpackLogo from '../../api/images/logo/webpack.png';
import jssLogo from '../../api/images/logo/jss.png';
import Title from './Title';
import styles from './landingStyle-jss';
import lineSide3 from '../../images/decoration/lineSide3.svg';
import lineSide4 from '../../images/decoration/lineSide4.svg';
import v1 from './images/16.jpg';
import v2 from './images/2.jpg';
import v3 from './images/12.jpg';
import v4 from './images/4.jpeg';
import v5 from './images/18.jpg';
import v6 from './images/17.jpg';


function ParallaxDeco(props) {
  const { classes } = props;
  return (
    <div className={classes.parallaxWrap}>
      <ParallaxProvider>
        <Parallax
          offsetYMax={180}
          offsetYMin={-200}
          slowerScrollRate
          tag="figure"
        >
          <svg
            fill="#fff"
            className={
              classNames(
                classes.parallaxVertical,
                classes.parallaxLineSide3
              )
            }
          >
            <use xlinkHref={lineSide3} />
          </svg>
        </Parallax>
        <Parallax
          offsetYMax={100}
          offsetYMin={-200}
          slowerScrollRate
          tag="figure"
        >
          <svg
            fill="#fff"
            className={
              classNames(
                classes.parallaxVertical,
                classes.parallaxLineSide4
              )
            }
          >
            <use xlinkHref={lineSide4} />
          </svg>
        </Parallax>
      </ParallaxProvider>
    </div>
  );
}

ParallaxDeco.propTypes = {
  classes: PropTypes.object.isRequired,
};

const ParallaxDecoStyled = withStyles(styles)(ParallaxDeco);

class Technology extends React.Component {
  render() {
    const { classes, slideMode } = this.props;
    return (
      <div className={classes.tech}>
        {!slideMode && (<ParallaxDecoStyled />)}
        <div className={slideMode ? classes.fullWidth : classes.container}>
          <Title title="KEY SKILLS AND CORE COMPETENCES GAINED" desc="NOTHING FOR US WITHOUT US" align="center" monocolor={slideMode && true} />
          <Grid container className={classes.root} spacing={3}>
            <Grid item sm={4} xs={12}>
              <div className={classNames(classes.wool, slideMode && classes.slideMode)}>
                <figure>
                  <img src={v2} alt="react" />
                </figure>
                <Typography variant="h5" className={classes.react}>MAINTAINING FOCUS</Typography>
              </div>
              <div className={classNames(classes.wool, slideMode && classes.slideMode)}>
                <figure>
                  <img src={v1} alt="react router" />
                </figure>
                <Typography variant="h5" className={classes.router}>TEAMWORK</Typography>
              </div>
            </Grid>
            <Grid item sm={4} xs={12}>
              <div className={classes.centerTech}>
                <div className={classNames(classes.wool, slideMode && classes.slideMode)}>
                  <figure>
                    <img src={v5} alt="redux" />
                  </figure>
                  <Typography variant="h5" className={classes.redux}>SUCCESS</Typography>
                </div>
                <Hidden smDown>
                  <Link style={{ textDecoration: 'none', color: 'white' }} to="/about-us">
                    <Button variant="contained" size="large" color="secondary">MORE ABOUT US</Button>
                  </Link>
                </Hidden>
                <div className={classNames(classes.wool, slideMode && classes.slideMode)}>
                  <figure>
                    <img src={v3} alt="webpack" />
                  </figure>
                  <Typography variant="h5" className={classes.webpack}>KNOWLEDGE</Typography>
                </div>
              </div>
            </Grid>
            <Grid item sm={4} xs={12}>
              <div className={classNames(classes.wool, slideMode && classes.slideMode)}>
                <figure>
                  <img src={v4} alt="mui" />
                </figure>
                <Typography variant="h5" className={classes.mui}>MARKETING AND PROMOTIONS</Typography>
              </div>
              <div className={classNames(classes.wool, slideMode && classes.slideMode)}>
                <figure>
                  <img src={v6} alt="jss" />
                </figure>
                <Typography variant="h5" className={classes.jss}>INTELLIGENCE</Typography>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

Technology.propTypes = {
  classes: PropTypes.object.isRequired,
  slideMode: PropTypes.bool,
};

Technology.defaultProps = {
  slideMode: false
};

export default withStyles(styles)(Technology);

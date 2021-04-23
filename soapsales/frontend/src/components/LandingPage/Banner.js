import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import { withStyles } from '@material-ui/core/styles';
import link from '../../api/ui/link';
import styles from './landingStyle-jss';
import one from './images/6.jpeg';
import two from './images/7.jpeg';
import three from './images/9.jpeg';

function ParallaxDeco(props) {
  const { classes } = props;
  return (
    <ParallaxProvider>
      <div className={classes.bannerParallaxWrap}>
        <Parallax
          offsetYMax={10}
          offsetYMin={-60}
          slowerScrollRate
          tag="figure"
        >
          <span className={classNames(classes.paralaxFull, classes.lineBanner1)} />
        </Parallax>
        <Parallax
          offsetYMax={15}
          offsetYMin={-50}
          slowerScrollRate
          tag="figure"
        >
          <span className={classNames(classes.paralaxFull, classes.lineBanner2)} />
        </Parallax>
        <Parallax
          offsetYMax={70}
          offsetYMin={-1}
          slowerScrollRate
          tag="figure"
        >
          <span className={classNames(classes.paralaxFull, classes.petalBanner1)} />
        </Parallax>
        <Parallax
          offsetYMax={60}
          offsetYMin={-30}
          slowerScrollRate
          tag="figure"
        >
          <span className={classNames(classes.paralaxFull, classes.petalBanner2)} />
        </Parallax>
      </div>
    </ParallaxProvider>
  );
}

ParallaxDeco.propTypes = {
  classes: PropTypes.object.isRequired,
};

const ParallaxDecoStyled = withStyles(styles)(ParallaxDeco);

class Banner extends React.Component {
  render() {
    const { classes, gradient, slideMode } = this.props;
    return (
      <div
        className={
          classNames(
            classes.banner,
            gradient ? classes.gradient : classes.solid,
            slideMode ? classes.out : classes.fit
          )
        }
      >

        {!slideMode && <ParallaxDecoStyled />}
        <div className={!slideMode ? classes.container : ''}>
          <Typography component="h2" variant="h2" gutterBottom>ERPMANU ONLINE SYSTEM</Typography>
          <Typography component="p" variant="h5" gutterBottom>ERPMANU Is A Fully Functional Accounting, Inventory, Production, and Marketing Platform.</Typography>
          <div className={classes.btnArea}>
            <Link style={{ textDecoration: 'none', color: 'white' }} to="/about-us">
              <Button
                size="large"
                variant="outlined"
                className={classNames(classes.button, classes.btnLight)}
                component={Link}
                to={link.about}
              >
                More About Us
              </Button>
            </Link>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              className={classes.button}
              component={Link}
              to={link.about}
            >
              Share Fun
            </Button>
          </div>
          <div className={classes.previewApp}>
            <Hidden smDown>
              <div className={classNames(classes.m2, classes.screen, slideMode ? classes.bottom : '')}>
                <img src={one} alt="crm dashboard" />
              </div>
            </Hidden>
            <div className={classNames(classes.m1, classes.screen)}>
              <img src={two} alt="personal dashboard" />
            </div>
            <Hidden smDown>
              <div className={classNames(classes.m3, classes.screen, slideMode ? classes.bottom : '')}>
                <img src={three} alt="crypto dashboard" />
              </div>
            </Hidden>
          </div>
        </div>
      </div>
    );
  }
}

Banner.propTypes = {
  classes: PropTypes.object.isRequired,
  gradient: PropTypes.bool.isRequired,
  slideMode: PropTypes.bool
};

Banner.defaultProps = {
  slideMode: false
};


const mapStateToProps = state => ({
  gradient: state.ui.gradient,
});

const BannerMaped = connect(
  mapStateToProps,
)(Banner);

export default (withStyles(styles)(BannerMaped));

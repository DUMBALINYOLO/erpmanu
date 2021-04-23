import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import withWidth from '@material-ui/core/withWidth';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import Grid from '@material-ui/core/Grid';
import ShowcaseCard from '../CardPaper/ShowcaseCard';
import Title from './Title';
import styles from './landingStyle-jss';
import v1 from './images/7.jpeg';
import v2 from './images/10.jpeg';
import v3 from './images/9.jpeg';
import v4 from './images/4.jpeg';
import v5 from './images/5.jpeg';
import v6 from './images/6.jpeg';

function ParallaxDeco(props) {
  const { classes } = props;
  return (
    <div className={classes.parallaxWrap}>
      <ParallaxProvider>
        <div className={classes.bannerParallaxWrap}>
          <Parallax
            offsetYMax={70}
            offsetYMin={-200}
            slowerScrollRate
            tag="figure"
          >
            <svg
              fill="#fff"
              className={
                classNames(
                  classes.parallaxVertical,
                  classes.parallaxPetal1
                )
              }
            >
              <use xlinkHref="/images/decoration/petal3.svg#Petal-3" />
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
                  classes.parallaxPetal2
                )
              }
            >
              <use xlinkHref="/images/decoration/petal4.svg#Petal-4" />
            </svg>
          </Parallax>
        </div>
      </ParallaxProvider>
    </div>
  );
}

ParallaxDeco.propTypes = {
  classes: PropTypes.object.isRequired,
};

const ParallaxDecoStyled = withStyles(styles)(ParallaxDeco);

class Showcase extends React.Component {
  render() {
    const { classes, slideMode, width } = this.props;
    return (
      <section className={classes.showcase}>
        {!slideMode && <ParallaxDecoStyled />}
        <div className={classes.container}>
          <Grid container className={classes.root} spacing={5}>
            <Grid item sm={6} md={4} xs={12}>
              <Title title="Showcase" align={width === 'lg' ? 'left' : 'center'} monocolor={slideMode && true} />
              <ShowcaseCard
                title="Study In Turkey"
                desc="Turkey has low tuition fees and scholarship opportunities, with modern technological campuses."
                action="Try it"
                image={v2}
              />
              <ShowcaseCard
                title="Study In Russia"
                desc="Russian degree is international recognised and programs are available in English language"
                action="Try it"
                image={v5}
              />
            </Grid>
            <Grid item sm={6} md={4} xs={12}>
              <ShowcaseCard
                title="Study In Germany"
                desc="Germany has world class staff and modern infrastructure."
                action="Try it"
                image={v6}
              />
              <ShowcaseCard
                title="Study In Poland"
                desc="Poland has part time jobs for international students."
                action="Try It"
                image={v1}
              />
            </Grid>
            <Grid item sm={6} md={4} xs={12}>
              <div className={classes.lastShowcase}>
                <ShowcaseCard
                  title="Study In India"
                  desc="India is home to the world's 2nd largest higher education system."
                  action="Try It"
                  image={v3}
                />
              </div>
            </Grid>
          </Grid>
        </div>
      </section>
    );
  }
}


Showcase.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
  slideMode: PropTypes.bool
};

Showcase.defaultProps = {
  slideMode: false
};


export default withWidth()(withStyles(styles)(Showcase));

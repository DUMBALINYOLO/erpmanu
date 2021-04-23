import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Slider from 'react-animated-slider';
import './styles.css';
import Title from './Title';
import styles from './landingStyle-jss';
import v1 from './images/11.jpg';
import v2 from './images/12.jpg';
import v3 from './images/14.jpg';
import v4 from './images/15.jpg';
import v5 from './images/16.jpg';
import v6 from './images/13.png';
import v7 from './images/17.jpg';


const content = [
  {
    title: 'Study Abroad with Primelead Consultancy',
    image: v1,
    user: '',
  },
  {
    title: 'Study Abroad with Primelead Consultancy',
    image: v7,
    user: '',
  },
  {
    title: 'Study Abroad with Primelead Consultancy',
    image: v2,
    user: '',
  },
  {
    title: 'Study Abroad with Primelead Consultancy',
    image: v3,
    user: '',
  },
  {
    title: 'Study Abroad with Primelead Consultancy',
    image: v4,
    user: '',
  },
  {
    title: 'Study Abroad with Primelead Consultancy',
    image: v5,
    user: '',
  },
  {
    title: 'Study Abroad with Primelead Consultancy',
    image: v6,
    user: '',
  },
  
];

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
                classes.parallaxLineSide1
              )
            }
          >
            <use xlinkHref="/images/decoration/lineSide1.svg#Line-Side1" />
          </svg>
        </Parallax>
        <Parallax
          offsetYMax={100}
          offsetYMin={-350}
          slowerScrollRate
          tag="figure"
        >
          <svg
            fill="#fff"
            className={
              classNames(
                classes.parallaxVertical,
                classes.parallaxLineSide2
              )
            }
          >
            <use xlinkHref="/images/decoration/lineSide2.svg#Line-Side2" />
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

class Testimonials extends React.Component {
  render() {
    const { classes, slideMode } = this.props;
    return (
      <div className={classes.testimonials}>
        {!slideMode && (<ParallaxDecoStyled />)}
        <div className={!slideMode ? classes.container : classes.fullSliderContent}>
          <Title title="TESTIMONIAL" align="center" monocolor={slideMode && true} />
          <div className={classes.sliderWrap}>
            <Slider className="slider-wrapper">
              {content.map((item, index) => (
                <div
                  key={index.toString()}
                  className="slider-content"
                  style={{ background: `url('${item.image}') no-repeat center center` }}
                >
                  <IconButton aria-label="Play/pause" className={classes.playIcon}>
                    <PlayArrowIcon />
                  </IconButton>
                  <p className={classNames(classes.videoCaption, slideMode ? classes.mono : classes.color)}>
                    <Typography variant="h6" component="span" gutterBottom>{item.title}</Typography>
                    <Typography component="span">{item.user}</Typography>
                  </p>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

Testimonials.propTypes = {
  classes: PropTypes.object.isRequired,
  slideMode: PropTypes.bool,
};

Testimonials.defaultProps = {
  slideMode: false
};

export default withStyles(styles)(Testimonials);

import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Title from './Title';
import styles from './landingStyle-jss';


let counter = 0;
function createFeatureData(icon, title, desc) {
  counter += 1;
  return {
    id: counter,
    icon,
    title,
    desc
  };
}

class Feature extends React.Component {
  state = {
    featureList: [
      createFeatureData('ion-ios-infinite-outline', 'Vision', 'To be the market leader in providing one-stop study abroad solutions for the students and successfully place students for the course at an institution only that are in the best interest of the student or their profile. To help them achieve their goals through proper career counseling & guidance, to add value for our partner institutions and all other stakeholders. To provide effortless and distinctive quality service and commit to improve continually.'),
      createFeatureData('ion-ios-flower-outline', 'Mission', 'We aim to take leadership in matching the student’s abilities, performance, and desires with the best possible career options. To provide customized solutions to the students aspiring to study overseas. Strive for the organic growth of our organization through integrity, honesty, excellence and to uphold the excellence of higher education by providing inclusive, competent and professional supports to student community and educational institutions. To build a strong and credible relationship with the partner institutions by recognizing shared values & goals.'),
      createFeatureData('ion-ios-ionic-outline', 'Our Values', 'Honesty, Integrity and Objectivity. Open Communication and Transparency. Professional Skills and Due Care. Confidentiality and Professional Behavior. Inclusiveness, Impartiality and Respect. Consideration, Empathy and Inspiration. Culture of diversity, Innovation and Creativity. Best Value Education. Enterprising Gene and Advance Developing Economy.')
    ]
  }

  render() {
    const { classes, slideMode } = this.props;
    const { featureList } = this.state;
    return (
      <div className={classNames(classes.feature, slideMode ? classes.mono : classes.color)}>
        <div className={!slideMode ? classes.container : ''}>
          <Title title="ERPMANU ONLINE SYSTEM" align="center" monocolor={slideMode && true} />
          <Grid container className={classes.root} spacing={5}>
            { featureList.map(item => (
              <Grid key={item.id.toString()} item xs={12} md={4}>
                <Typography component="h4" variant="h6">
                  <span className={classes.icon}>
                    <i className={item.icon} />
                  </span>
                  {item.title}
                </Typography>
                <Typography className={slideMode ? classes.colorWhite : ''}>
                  {item.desc}
                </Typography>
              </Grid>
            )) }
          </Grid>
        </div>
      </div>
    );
  }
}

Feature.propTypes = {
  classes: PropTypes.object.isRequired,
  slideMode: PropTypes.bool
};

Feature.defaultProps = {
  slideMode: false
};

export default withStyles(styles)(Feature);

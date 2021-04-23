import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import LocalPhone from '@material-ui/icons/LocalPhone';
import DateRange from '@material-ui/icons/DateRange';
import LocationOn from '@material-ui/icons/LocationOn';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Check from '@material-ui/icons/Check';
import AcUnit from '@material-ui/icons/AcUnit';
import Adb from '@material-ui/icons/Adb';
import AllInclusive from '@material-ui/icons/AllInclusive';
import AssistantPhoto from '@material-ui/icons/AssistantPhoto';
import imgData from '../../api/images/imgData';
import Company from '../../containers/HelpSupport/Company';
import PapperBlock from '../PapperBlock/PapperBlock';
import styles from './profile-jss';

class About extends React.Component {
  render() {
    const { classes, data } = this.props;
    return (
      <Grid
        container
        alignItems="flex-start"
        justify="flex-start"
        direction="row"
        spacing={3}
      >
        <Grid item md={7} xs={12}>
          <div>
            <Company />   
          </div>
        </Grid>

        <Grid item md={5} xs={12}>
          {/* Profile Progress */}
          <div className={classes.progressRoot}>
            <Paper className={classes.styledPaper} elevation={4}>
              <Typography className={classes.title} variant="h5" component="h3">
              </Typography>
              <Grid container justify="center">
                <Chip
                  avatar={(
                    <Avatar>
                      <Check />
                    </Avatar>
                  )}
                  label="PROGRESS IS  A PROCCESS"
                  className={classes.chip}
                  color="primary"
                />
              </Grid>
              <LinearProgress variant="determinate" className={classes.progress} value={60} />
            </Paper>
          </div>
          {/* ----------------------------------------------------------------------*/}
          {/* About Me */}
          <PapperBlock title="About PrimeLead" icon="ios-contact-outline" whiteBg noMargin desc="Study Abroad With Primelead Consultancy">
            <Divider className={classes.divider} />
            <List dense className={classes.profileList}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <DateRange />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="YEAR FOUNDED" secondary="2018" />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <LocalPhone />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Phone" secondary="+263 776 320 294, +263 714 286 727, +263 734 326 631" />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <LocationOn />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Address" secondary="BULAWAYO ZIMBABWE" />
              </ListItem>
            </List>
          </PapperBlock>
          <Divider className={classes.divider} />
          
        </Grid>
      </Grid>
    );
  }
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
  // data: PropTypes.object.isRequired
};

export default withStyles(styles)(About);



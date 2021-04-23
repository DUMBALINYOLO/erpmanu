import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from '../../api/dummy/brand';
import AppBar from '@material-ui/core/AppBar';
import dummy from '../../api/dummy/dummyContents';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Hidden from '@material-ui/core/Hidden';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import Favorite from '@material-ui/icons/Favorite';
import PhotoLibrary from '@material-ui/icons/PhotoLibrary';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Cover from '../../components/SocialMedia/Cover';

import Connection from '../../components/Profile/Connection';
import About from '../../components/Profile/About';

import Favorites from '../../components/Profile/Favorites';
import Albums from '../../components/Profile/Albums';
import bgCover from '../../images/petal_bg.svg';
import styles from '../../components/SocialMedia/jss/cover-jss';
import data from '../SampleApps/Timeline/api/timelineData';
import { fetchAction } from '../../actions/timeline';


function TabContainer(props) {
  const { children } = props;
  return (
    <div style={{ paddingTop: 8 * 3 }}>
      {children}
    </div>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class CompanyProfile extends React.Component {
  state = {
    value: 0
  };

  componentDidMount() {
    const { fetchData } = this.props;
    fetchData(data);
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const title = brand.name + ' - Profile';
    const description = brand.desc;
    const { dataProps, classes } = this.props;
    const { value } = this.state;
    return (
      <div>

        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <Cover
          coverImg={bgCover}
          name={dummy.user.name}
        />
        <AppBar position="static" className={classes.profileTab}>
          <Hidden mdUp>
            <Tabs
              value={value}
              onChange={this.handleChange}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab icon={<AccountCircle />} />
              <Tab icon={<PhotoLibrary />} />
            </Tabs>
          </Hidden>
          <Hidden smDown>
            <Tabs
              value={value}
              onChange={this.handleChange}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab icon={<AccountCircle />} label="ABOUT" />
              <Tab icon={<PhotoLibrary />} label="PHOTO LIBRARY" />
            </Tabs>
          </Hidden>
        </AppBar>
        {value === 0 && <TabContainer><About data={dataProps} /></TabContainer>}
        {value === 1 && <TabContainer><Albums /></TabContainer>}
      </div>
    );
  }
}

CompanyProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  // dataProps: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  force: state, // force state from reducer
  dataProps: state.timelines.timelines,
});

const constDispatchToProps = dispatch => ({
  fetchData: bindActionCreators(fetchAction, dispatch)
});

const UserProfileMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(CompanyProfile);

export default withStyles(styles)(UserProfileMapped);

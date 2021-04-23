import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import logo from './images/2.jpg';
import brand from '../../api/dummy/brand';
import link from '../../api/ui/link';

import styles from './landingStyle-jss';

let counter = 0;
function createData(name, url) {
  counter += 1;
  return {
    id: counter,
    name,
    url,
  };
}

function Decoration(props) {
  const { classes } = props;
  return (
    <div>
      <svg fill="#fff" className={classes.footerDecoration}>
        <use xlinkHref="/images/decoration/petal5.svg#Petal-Bottom" />
      </svg>
    </div>
  );
}

Decoration.propTypes = {
  classes: PropTypes.object.isRequired,
};

const DecorationStyled = withStyles(styles)(Decoration);

class Footer extends React.Component {
  state = {
    menuList: [
      createData('feature', '#feature'),
      createData('showcase', '#showcase'),
      createData('testimonials', '#testi'),
      createData('technology', '#tech'),
      createData('our belief', '#pricing'),
      createData('contact', '#contact'),
    ]
  }

  render() {
    const { menuList } = this.state;
    const { classes } = this.props;
    return (
      <footer className={classes.footer}>
        <DecorationStyled />
        <div className={classes.container}>
          <div className={classes.spaceContainer}>
            <div className={classes.brand}>
              <img src={logo} alt={brand.name} />
              {brand.name}
            </div>
            <nav>
              <ul>
                { menuList.map(item => (
                  <li key={item.id.toString()}>
                    <Button size="small" href={item.url}>{item.name}</Button>
                  </li>
                )) }
              </ul>
            </nav>
          </div>
        </div>
        <div className={classes.copyright}>
          <div className={classes.container}>
            <p>&copy; 2021 developed by almux </p>
            <span>
              <IconButton color="primary" className={classes.button} href={link.twitter} target="_blank"><i className="ion-social-twitter" /></IconButton>
              <IconButton color="primary" className={classes.button} href={link.pinterest} target="_blank"><i className="ion-social-pinterest" /></IconButton>
            </span>
          </div>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);

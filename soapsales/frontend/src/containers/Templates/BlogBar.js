import React from 'react';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from 'react-router-dom';
import { purple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: purple,
  },
});

export default function BlogBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          {/* <ThemeProvider theme={theme}>
            <Button variant="contained" color="primary" className={classes.margin}>
            <Link style={{ textDecoration: 'none' }} to='/blog'>Stay Update</Link>
            </Button>
          </ThemeProvider> */}
          <ThemeProvider theme={theme}>
            <Button variant="contained" color="primary" className={classes.title}>
            <Link style={{ textDecoration: 'none' }} to='/'>Flexible Dimensions</Link>
            </Button>
          </ThemeProvider>
        </Toolbar>
      </AppBar>
    </div>
  );
}

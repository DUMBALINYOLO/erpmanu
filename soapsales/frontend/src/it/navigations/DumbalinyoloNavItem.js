import React from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Icon,
  makeStyles
} from "@material-ui/core";
import NavLinkAdapter from "./NavLinkAdapter";
import DumbalinyoloNavBadge from "./DumbalinyoloNavBadge";

const useStyles = makeStyles(theme => ({
  active: {
    background: "#2467db",
    color: "#fff",
    "&:hover": {
      background: "#1a4fab"
    }
  }
}));

const DumbalinyoloNavItem = props => {
  const classes = useStyles();
  const { item } = props;

  return (
    <ListItem
      button
      component={NavLinkAdapter}
      to={item.url}
      activeClassName={classes.active}
      exact={item.exact}
    >
      {item.icon && (
        <ListItemIcon>
          <Icon>{item.icon}</Icon>
        </ListItemIcon>
      )}
      <ListItemText primary={item.title} />
      {item.badge && <DumbalinyoloNavBadge className="mr-4" badge={item.badge} />}
    </ListItem>
  );
};

export default DumbalinyoloNavItem;





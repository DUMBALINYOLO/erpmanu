import React from "react";
import { makeStyles } from "@material-ui/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import DumbalinyoloNavGroup from "./DumbalinyoloNavGroup";
import DumbalinyoloNavItem from "./DumbalinyoloNavItem";
import DumbalinyoloNavLink from "./DumbalinyoloNavLink";
import { Icon } from "@material-ui/core";
import DumbalinyoloNavBadge from "./DumbalinyoloNavBadge";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: 0
  }
}));

const persistCollapseOpen = (location, item) => {
  return location && checkPathInChildren(item, location.pathname);
};

const checkPathInChildren = (parent, url) => {
  if (!parent.children) {
    return false;
  }

  for (let i = 0; i < parent.children.length; i++) {
    if (parent.children[i].children) {
      if (checkPathInChildren(parent.children[i], url)) {
        return true;
      }
    }

    if (
      parent.children[i].url === url ||
      url.includes(parent.children[i].url)
    ) {
      return true;
    }
  }

  return false;
};

const DumbalinyoloNavCollapse = props => {
  const { item, location } = props;
  const classes = useStyles(props);
  const [open, setOpen] = React.useState(() =>
    persistCollapseOpen(location, item)
  );
  // const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (persistCollapseOpen(location, item)) {
      setOpen(true);
    }
  }, [location, item]);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <ul className={classes.root}>
      <ListItem button onClick={handleClick}>
        {item.icon && (
          <ListItemIcon>
            <Icon>{item.icon}</Icon>
          </ListItemIcon>
        )}
        <ListItemText primary={item.title} />
        {item.badge && <DumbalinyoloNavBadge className="mr-4" badge={item.badge} />}
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      {item.children && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          {item.children.map(item => (
            <React.Fragment key={item.id}>
              {item.type === "group" && <DumbalinyoloNavGroup item={item} />}

              {item.type === "collapse" && <NavCollapse item={item} />}

              {item.type === "item" && <DumbalinyoloNavItem item={item} />}

              {item.type === "link" && <DumbalinyoloNavLink item={item} />}
            </React.Fragment>
          ))}
        </Collapse>
      )}
    </ul>
  );
};

const NavCollapse = withRouter(React.memo(DumbalinyoloNavCollapse));

export default NavCollapse;

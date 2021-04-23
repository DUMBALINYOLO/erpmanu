import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";

import DumbalinyoloNavigation from "../navigations/DumbalinyoloNavigation";
import NavigationContext from "../../context/NavigationContext";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: (props) => props.drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: (props) => props.drawerWidth,
    "& *": {
      color: "rgba(255, 255, 255, 0.7)",
    },
  },
}));

const DumbalinyoloDrawer = (props) => {
  const classes = useStyles(props);
  const { open } = React.useContext(NavigationContext);

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      < DumbalinyoloNavigation />
    </Drawer>
  );
};





export default DumbalinyoloDrawer;

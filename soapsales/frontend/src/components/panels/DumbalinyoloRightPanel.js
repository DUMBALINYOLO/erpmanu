import React from "react";
import { Drawer, makeStyles } from "@material-ui/core";
import DumbalinyoloRightPanelTab from "./DumbalinyoloRightPanelTab";
import NavigationContext from "../../context/NavigationContext";

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 330,
    flexShrink: 0
  },
  drawerPaper: {
    width: 330,
    [theme.breakpoints.down("sm")]: {
      width: 320
    }
  }
}));

const DumbalinyoloRightPanel = props => {
  const classes = useStyles();

  const { handleRightPanelOpen, openRightPanel } = React.useContext(
    NavigationContext
  );

  return (
    <Drawer
      className={classes.drawer}
      variant="temporary"
      anchor="right"
      open={openRightPanel}
      onClose={event => handleRightPanelOpen(event, 0)}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <DumbalinyoloRightPanelTab />
    </Drawer>
  );
};

export default DumbalinyoloRightPanel;

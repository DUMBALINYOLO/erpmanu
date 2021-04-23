import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";

import DumbalinyoloListItems from ".././components/listitems/DumbalinyoloListItems";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

const notifList = [
  {
    id: 1,
    title: "There seems to be a scale problem in Rutenga",
    icon: "info",
    color: "primary",
    subTitle: "Dec 4, 2020, 2:20:11 pm"
  },
  {
    id: 2,
    title: "A double Transaction was created in Bulawayo",
    icon: "adjust",
    color: "secondary",
    subTitle: "Dec 4, 2020, 12:57:11 am"
  },
  {
    id: 3,
    title: "wakeup",
    icon: "alarm",
    color: "error",
    subTitle: "Sithole Just Deleted a transaction 20, 2020, 1:03:13 pm"
  }
];

const NotificationsContainer = props => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <DumbalinyoloListItems type="ListItemIcon" data={notifList} />
    </List>
  );
};

export default NotificationsContainer;

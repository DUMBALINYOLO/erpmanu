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

const MsgList = [
  {
    id: 1,
    title: "Backup the Database every 30mins",
    subTitle: "December 4, 2020, 1:03:13 pm"
  },
  {
    id: 2,
    title: "Fix the WeighBridge Sensors",
    subTitle: "December 3, 2020, 12:57:11 am"
  },
  {
    id: 3,
    title: "Go to the Rutenga Branch",
    subTitle: "December 4, 2020, 1:03:13 pm"
  }
];

const EventsContainer = props => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <DumbalinyoloListItems type="ListItemText" data={MsgList} />
    </List>
  );
};

export default EventsContainer;

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

const NoteList = [
  {
    id: 1,
    title: "Load Truck to Gweru",
    subTitle: "December 4, 2020, 1:03:13 pm"
  },
  {
    id: 2,
    title: "Backup the Database",
    subTitle: "December 4, 2020, 12:57:11 am"
  },
  {
    id: 3,
    title: "Fix the WeighBridge Sensor",
    subTitle: "December 4, 2020, 1:03:13 pm"
  }
];

const NotesContainer = () => {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      <DumbalinyoloListItems type="ListItemText" data={NoteList} />
    </List>
  );
};

export default NotesContainer;


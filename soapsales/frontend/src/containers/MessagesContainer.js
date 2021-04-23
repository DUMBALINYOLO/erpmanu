import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';

import DumbalinyoloListItems from "../components/listitems/DumbalinyoloListItems";

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
    title: "Maximimillem Dumbalinyolo",
    avatar: < RemoveRedEyeIcon />,
    subTitle: "Benibehango its Urgent..."
  },
  {
    id: 2,
    title: "Pascal Sithole",
    avatar: < RemoveRedEyeIcon />,
    subTitle: "Hi we are still waiting for the slip .."
  },
  {
    id: 3,
    title: "Chirandu",
    avatar: < RemoveRedEyeIcon />,
    subTitle: "The screen is running in 0 0  0 0 0 0 0 0 0 ?"
  }
];

const MessagesContainer = props => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <DumbalinyoloListItems type="ListItemAvatar" data={MsgList} />
    </List>
  );
};

export default MessagesContainer;

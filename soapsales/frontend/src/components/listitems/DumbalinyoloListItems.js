import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DumbalinyoloListItemIcon from "./DumbalinyoloListItemIcon";
import DumbalinyoloListItemAvatar from "./DumbalinyoloListItemAvatar";

const DumbalinyoloListItems = props => {
  const { data, type, divider, button } = props;

  return (
    <>
      {data.map(item => (
        <ListItem divider={divider} button={button} key={item.id}>
          <React.Fragment>
            {type === "ListItemIcon" && <DumbalinyoloListItemIcon item={item} />}

            {type === "ListItemAvatar" && <DumbalinyoloListItemAvatar item={item} />}

            {type === "ListItemText" && (
              <ListItemText
                primary={item.title}
                secondary={item.subTitle ? item.subTitle : ""}
              />
            )}
          </React.Fragment>
        </ListItem>
      ))}
    </>
  );
};

export default DumbalinyoloListItems;
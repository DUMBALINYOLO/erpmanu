import React from "react";

import DumbalinyoloNavCollapse from "./DumbalinyoloNavCollapse";
import DumbalinyoloNavItem from "./DumbalinyoloNavItem";
import DumbalinyoloNavLink from "./DumbalinyoloNavLink";
import { ListSubheader } from "@material-ui/core";

const DumbalinyoloNavGroup = props => {
  const { item } = props;

  return (
    <>
      <ListSubheader>{item.title}</ListSubheader>

      {item.children && (
        <React.Fragment>
          {item.children.map(item => (
            <React.Fragment key={item.id}>
              {item.type === "group" && <NavGroup item={item} />}

              {item.type === "collapse" && <DumbalinyoloNavCollapse item={item} />}

              {item.type === "item" && <DumbalinyoloNavItem item={item} />}

              {item.type === "link" && <DumbalinyoloNavLink item={item} />}
            </React.Fragment>
          ))}
        </React.Fragment>
      )}
    </>
  );
};

const NavGroup = React.memo(DumbalinyoloNavGroup);

export default NavGroup;

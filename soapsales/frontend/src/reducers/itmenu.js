
import {
    OPEN_SUBMENU

  } from '.././types/uitypes';
import MenuContent from '.././it/navigations/navigationConfig';


const initialState = {
    subMenuOpen: [],

}

const getMenus = menuArray => menuArray.map(item => {
  if (item.child) {
    return item.child;
  }
  return false;
});

const setNavCollapse = (arr, curRoute) => {
  let headMenu = 'not found';
  for (let i = 0; i < arr.length; i += 1) {
    for (let j = 0; j < arr[i].length; j += 1) {
      if (arr[i][j].link === curRoute) {
        headMenu = MenuContent[i].key;
      }
    }
  }
  return headMenu;
};

export default function app(state = initialState, action){
    switch(action.type){
        case OPEN_SUBMENU:
            const activeParent = setNavCollapse(
                getMenus(MenuContent),
                action.initialLocation
              );
            return  {
                ...state,
                subMenuOpen: [
                    ...state.subMenuOpen, activeParent
                ]
            };
        default:
            return state;
    }
}


import * as types from '.././types/uitypes';

export const toggleAction = { type: types.TOGGLE_SIDEBAR };
export const openMenuAction = { type: types.OPEN_MENU };
export const closeMenuAction = { type: types.CLOSE_MENU };


export const openAction = initialLocation => ({
  type: types.OPEN_SUBMENU,
  payload: initialLocation
});
export const changeThemeAction = theme => ({
  type: types.CHANGE_THEME,
  payload: theme

});
export const changeRandomThemeAction = {
  type: types.CHANGE_RANDOM_THEME,
};
export const changeModeAction = mode => ({
  type: types.CHANGE_MODE,
  payload: mode
});

export const changeGradientAction = gradient => ({
  type: types.CHANGE_GRADIENT,
  payload: gradient
});
export const changeDecoAction = deco => ({
  type: types.CHANGE_DECO,
  payload: deco
});
export const changeLayoutAction = layout => ({
  type: types.CHANGE_LAYOUT,
  payload: layout
});
export const changeBgPositionAction = position => ({
  type: types.CHANGE_BG_POSITION,
  payload: position
});
export const changeDirectionAction = direction => ({
  type: types.CHANGE_DIRECTION,
  payload: direction
});
export const playTransitionAction = isLoaded => ({
  type: types.LOAD_PAGE,
  payload: isLoaded
});

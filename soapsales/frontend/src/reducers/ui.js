
import {
  CHANGE_THEME,
  CHANGE_RANDOM_THEME,
  CHANGE_MODE,
  CHANGE_GRADIENT,
  CHANGE_DECO,
  CHANGE_BG_POSITION,
  CHANGE_LAYOUT,
  CHANGE_DIRECTION,
  LOAD_PAGE,
  TOGGLE_SIDEBAR,
  OPEN_MENU,
  CLOSE_MENU
} from '.././types/uitypes';

const initialState = {
  /* Settings for Themes and layout */
  theme: 'skyBlueTheme',
  direction: 'ltr',
  type: 'dark', // light or dark
  gradient: true, // true or false
  decoration: true, // true or false
  bgPosition: 'half', // half, header, full
  layout: 'left-sidebar', // big-sidebar, left-sidebar, top-navigation, mega-menu
  /* End settings */
  palette: [
    { name: 'Ocean Sky', value: 'skyBlueTheme' },
    { name: 'Purple', value: 'purpleRedTheme' },
    { name: 'Rose Gold', value: 'magentaTheme' },
    { name: 'Leaf', value: 'cyanTheme' },
    { name: 'Mint', value: 'blueCyanTheme' },
    { name: 'Ubuntu', value: 'orangeTheme' },
    { name: 'Ultra Violet', value: 'purpleTheme' },
    { name: 'Vintage', value: 'yellowCyanTheme' },
    { name: 'Fruit', value: 'greenOrangeTheme' },
    { name: 'Botani', value: 'pinkGreenTheme' },
    { name: 'Deep Ocean', value: 'blueTheme' },
    { name: 'School', value: 'yellowBlueTheme' },
    { name: 'Queen', value: 'pinkBlueTheme' },
    { name: 'Joker', value: 'greenPurpleTheme' },
    { name: 'Ruby', value: 'redTheme' },
    { name: 'Sultan', value: 'goldTheme' },
    { name: 'Monochrome', value: 'greyTheme' },
  ],

  pageLoaded: false,
  sidebarOpen: true,
 
};


export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return  {
        ...state,
        sidebarOpen: !state.sidebarOpen
      };
    case OPEN_MENU:
      return {
        ...state,
        sidebarOpen: state.sidebarOpen
      };
    case CLOSE_MENU:
      return {
        ...state,
        sidebarOpen: state.sidebarOpen
      };
      
    case CHANGE_RANDOM_THEME:
      return {
        ...state,
        palette: action.payload,
      };
    case CHANGE_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    case CHANGE_MODE:
      return {
        ...state,
        type: action.payload,  
      };
    case CHANGE_GRADIENT:
      return {
        ...state,
        gradient: action.payload,
      };
    case CHANGE_DECO:
      return{
        ...state,
        decoration: action.payload,
      };
    case CHANGE_BG_POSITION:
      return {
        ...state,
        bgPosition: action.payload
      };
    case CHANGE_LAYOUT:
      return  {
        ...state,
        layout: action.payload 
      };
    case CHANGE_DIRECTION:
      return  {
        ...state,
        direction: action.payload,
      };
    case LOAD_PAGE:
      return  {
        ...state,
        pageLoaded: action.payload,
      };
    default:
      return state;
  }
}

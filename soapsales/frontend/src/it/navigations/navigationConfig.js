import React from 'react';
import {
  Home as HomeIcon,
  NotificationsNone as NotificationsIcon,
  FormatSize as TypographyIcon,
  FilterNone as UIElementsIcon,
  BorderAll as TableIcon,
  QuestionAnswer as SupportIcon,
  LibraryBooks as LibraryIcon,
  HelpOutline as FAQIcon,
  ArrowBack as ArrowBackIcon,

} from "@material-ui/icons";
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import TrainIcon from '@material-ui/icons/Train';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ShutterSpeedIcon from '@material-ui/icons/ShutterSpeed';
import LocalCarWashIcon from '@material-ui/icons/LocalCarWash';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import BuildIcon from '@material-ui/icons/Build';
import CategoryIcon from '@material-ui/icons/Category';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import BusinessIcon from '@material-ui/icons/Business';
import PersonIcon from '@material-ui/icons/Person';


const navigationConfig = [
  {
    id: "Main",
    type: "group",
    children: [
      {
        id: "dashboard",
        title: "Landing Page",
        type: "item",
        url: "/",
        exact: true,
        icon: <SupervisorAccountIcon/>
      },
      {
        id: "primelead",
        title: "PRIMELEAD",
        type: "item",
        url: "/about-us",
        exact: true,
        icon: <AccountBalanceIcon/>
      },
    ],
  },
];

export default navigationConfig;



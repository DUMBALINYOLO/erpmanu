import { combineReducers } from 'redux';
import uiReducer from './ui';
import timelines from './timelines';
import auth from './auth';
import subMenuOpen from './itmenu';
import products from './products';
import customers from './customers';
import hauliers from './hauliers';
import companybranches from './companybranches';
import headoffices from './headoffices';
import productcategories from './productcategories';
import productstatuschoices from "./productstatuschoices";
import haulierstatuschoices from "./haulierstatuschoices";
import customerstatuschoices from "./customerstatuschoices";
import transactions from './transactions';
import transactionchoices from './transactionchoices';
import vehicles from './vehicles';
import scales from './scales';




export default combineReducers({
    ui: uiReducer,
	timelines,
	subMenuOpen,
    auth,
    products,
	headoffices,
	hauliers,
	customers,
	companybranches,
	productcategories,
	productstatuschoices,
	customerstatuschoices,
	haulierstatuschoices,
	transactions,
	transactionchoices,
	vehicles,
	scales,


});


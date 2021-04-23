import axios from 'axios';
import { 
	GET_CASH_DRAWERS_START,
	GET_CASH_DRAWERS_SUCCESS,
	GET_CASH_DRAWERS_FAIL,
	GET_CASH_DRAWER_START,
	GET_CASH_DRAWER_SUCCESS,
	GET_CASH_DRAWER_FAIL
} from './types';
import { cashdrawersURL } from '../constants';

//cash drawers
const getCashDrawerListStart = () => {
  return {
    type: GET_CASH_DRAWERS_START
  };
};

const getCashDrawerListSuccess = cashdrawers => {
  return {
    type: GET_CASH_DRAWERS_SUCCESS,
    cashdrawers
  };
};

const getCashDrawerListFail = error => {
  return {
    type: GET_CASH_DRAWERS_FAIL,
    error: error
  };
};

const getCashDrawerDetailStart = () => {
  return {
    type: GET_CASH_DRAWER_START
  };
};

const getCashDrawerDetailSuccess = cashdrawer => {
  return {
    type: GET_CASH_DRAWER_SUCCESS,
    cashdrawer
  };
};

const getCashDrawerDetailFail = error => {
  return {
    type: GET_CASH_DRAWER_FAIL,
    error: error
  };
};

export const getCashDrawers = (token) => {
  return dispatch => {
      dispatch(getCashDrawerListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(cashdrawersURL, headers)
        .then(res => {
          const cashdrawers = res.data;
          dispatch(getCashDrawerListSuccess(cashdrawers));
          })
        .catch(err => {
          dispatch(getCashDrawerListStart(err));
        });
    };
};

export const getCashDrawer = (id, token) => {
  return dispatch => {
      dispatch(getCashDrawerDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${cashdrawersURL}${id}`, headers)
        .then(res => {
          const cashdrawer = res.data;
          dispatch(getCashDrawerDetailSuccess(cashdrawer));
          })
        .catch(err => {
          dispatch(getCashDrawerDetailFail(err));
        });
    };
};


import axios from 'axios';
import {
    GET_DEACTIVATED_CUSTOMERS_START,
	GET_DEACTIVATED_CUSTOMERS_SUCCESS,
	GET_DEACTIVATED_CUSTOMERS_FAIL
    } from '../types/deactivatedcustomerTypes';
import { deactivatedcustomersURL } from '../constants';

//deactivated customers
const getDeactivatedCustomerListStart = () => {
  return {
    type: GET_DEACTIVATED_CUSTOMERS_START
  };
};

const getDeactivatedCustomerListSuccess = deactivatedcustomers => {
  return {
    type: GET_DEACTIVATED_CUSTOMERS_SUCCESS,
    deactivatedcustomers
  };
};

const getDeactivatedCustomerListFail = error => {
  return {
    type: GET_DEACTIVATED_CUSTOMERS_FAIL,
    error: error
  };
};

export const getDeactivatedCustomers = (token) => {
  return dispatch => {
      dispatch(getDeactivatedCustomerListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(deactivatedcustomersURL, headers)
        .then(res => {
          const deactivatedcustomers = res.data;
          dispatch(getDeactivatedCustomerListSuccess(deactivatedcustomers));
          })
        .catch(err => {
          dispatch(getDeactivatedCustomerListStart(err));
        });
    };
};

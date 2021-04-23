import axios from 'axios';
import {
    GET_ACTIVE_CUSTOMERS_START,
    GET_ACTIVE_CUSTOMERS_SUCCESS,
    GET_ACTIVE_CUSTOMERS_FAIL,
    CREATE_ACTIVE_CUSTOMER_START,
    CREATE_ACTIVE_CUSTOMER_SUCCESS,
    CREATE_ACTIVE_CUSTOMER_FAIL,
    GET_ACTIVE_CUSTOMER_START,
    GET_ACTIVE_CUSTOMER_SUCCESS,
    GET_ACTIVE_CUSTOMER_FAIL,
    EDIT_ACTIVE_CUSTOMER
    } from '../types/activecustomerTypes';
import { activecustomersURL } from '../constants';

//active customers
const getActiveCustomerListStart = () => {
  return {
    type: GET_ACTIVE_CUSTOMERS_START
  };
};

const getActiveCustomerListSuccess = activecustomers => {
  return {
    type: GET_ACTIVE_CUSTOMERS_SUCCESS,
    activecustomers
  };
};

const getActiveCustomerListFail = error => {
  return {
    type: GET_ACTIVE_CUSTOMERS_FAIL,
    error: error
  };
};

const createActiveCustomerStart = () => {
  return {
    type: CREATE_ACTIVE_CUSTOMER_START
  };
};


const createActiveCustomerSuccess = activecustomer => {
  return {
    type: CREATE_ACTIVE_CUSTOMER_SUCCESS,
    activecustomer
  };
};

const createActiveCustomerFail = error => {
  return {
    type: CREATE_ACTIVE_CUSTOMER_FAIL,
    error: error
  };
};

const getActiveCustomerDetailStart = () => {
  return {
    type: GET_ACTIVE_CUSTOMER_START
  };
};

const getActiveCustomerDetailSuccess = activecustomer => {
  return {
    type: GET_ACTIVE_CUSTOMER_SUCCESS,
    activecustomer
  };
};

const getActiveCustomerDetailFail = error => {
  return {
    type: GET_ACTIVE_CUSTOMER_FAIL,
    error: error
  };
};

export const getActiveCustomers = (token) => {
  return dispatch => {
      dispatch(getActiveCustomerListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(activecustomersURL, headers)
        .then(res => {
          const activecustomers = res.data;
          dispatch(getActiveCustomerListSuccess(activecustomers));
          })
        .catch(err => {
          dispatch(getActiveCustomerListStart(err));
        });
    };
};

export const getActiveCustomer = (id, token) => {
  return dispatch => {
      dispatch(getAccountingAdjustmentDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${activecustomersURL}${id}`, headers)
        .then(res => {
          const activecustomer = res.data;
          dispatch(getActiveCustomerDetailSuccess(activecustomer));
          })
        .catch(err => {
          dispatch(getActiveCustomerDetailFail(err));
        });
    };
};

export const addActiveCustomer = (activecustomer, token) => {
  return dispatch => {
      dispatch(createActiveCustomerStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(activecustomersURL, activecustomer, headers)
        .then(res => {
          dispatch(createActiveCustomerSuccess(activecustomer));
        })
        .catch(err => {
          dispatch(createActiveCustomerFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editActiveCustomer = (id, activecustomer, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${activecustomersURL}${id}/`, activecustomer, headers)
    .then(res => {
        dispatch({
            type: EDIT_ACTIVE_CUSTOMER,
            payload: res.data
        });
    }).catch(err => console.log(err))
}

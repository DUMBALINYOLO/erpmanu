import axios from 'axios';
import {
    GET_CUSTOMER_ADDRESSES_START,
    GET_CUSTOMER_ADDRESSES_SUCCESS,
    GET_CUSTOMER_ADDRESSES_FAIL,
    CREATE_CUSTOMER_ADDRESS_START,
    CREATE_CUSTOMER_ADDRESS_SUCCESS,
    CREATE_CUSTOMER_ADDRESS_FAIL,
    GET_CUSTOMER_ADDRESS_START,
    GET_CUSTOMER_ADDRESS_SUCCESS,
    GET_CUSTOMER_ADDRESS_FAIL,
    EDIT_CUSTOMER_ADDRESS
    } from '../types/customeraddressTypes';
import { customeraddressesURL } from '../constants';

//customeraddresses
const getCustomerAddressListStart = () => {
  return {
    type: GET_CUSTOMER_ADDRESSES_START
  };
};

const getCustomerAddressListSuccess = customeraddresses => {
  return {
    type: GET_CUSTOMER_ADDRESSES_SUCCESS,
    customeraddresses
  };
};

const getCustomerAddressListFail = error => {
  return {
    type: GET_CUSTOMER_ADDRESSES_FAIL,
    error: error
  };
};

const createCustomerAddressStart = () => {
  return {
    type: CREATE_CUSTOMER_ADDRESS_START
  };
};


const createCustomerAddressSuccess = customeraddress => {
  return {
    type: CREATE_CUSTOMER_ADDRESS_SUCCESS,
    customeraddress
  };
};

const createCustomerAddressFail = error => {
  return {
    type: CREATE_CUSTOMER_ADDRESS_FAIL,
    error: error
  };
};

const getCustomerAddressDetailStart = () => {
  return {
    type: GET_CUSTOMER_ADDRESS_START
  };
};

const getCustomerAddressDetailSuccess = customeraddress => {
  return {
    type: GET_CUSTOMER_ADDRESS_SUCCESS,
    customeraddress
  };
};

const getCustomerAddressDetailFail = error => {
  return {
    type: GET_CUSTOMER_ADDRESS_FAIL,
    error: error
  };
};

export const getCustomerAddresses = (token) => {
  return dispatch => {
      dispatch(getCustomerAddressListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(customeraddressesURL, headers)
        .then(res => {
          const customeraddresses = res.data;
          dispatch(getCustomerAddressListSuccess(customeraddresses));
          })
        .catch(err => {
          dispatch(getCustomerAddressListStart(err));
        });
    };
};

export const getCustomerAddress = (id, token) => {
  return dispatch => {
      dispatch(getCustomerAddressDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${customeraddressesURL}${id}`, headers)
        .then(res => {
          const customeraddress = res.data;
          dispatch(getCustomerAddressDetailSuccess(customeraddress));
          })
        .catch(err => {
          dispatch(getCustomerAddressDetailFail(err));
        });
    };
};

export const addCustomerAddress = (customeraddress, token) => {
  return dispatch => {
      dispatch(createCustomerAddressStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(customeraddressesURL, customeraddress, headers)
        .then(res => {
          dispatch(createCustomerAddressSuccess(customeraddress));
        })
        .catch(err => {
          dispatch(createCustomerAddressFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editCustomerAddress = (id, customeraddress, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${customeraddressesURL}${id}/`, customeraddress, headers)
    .then(res => {
        dispatch({
            type: EDIT_CUSTOMER_ADDRESS,
            payload: res.data
        });
    }).catch(err => console.log(err))
}

import axios from 'axios';
import {
    GET_SUPPLIER_ADDRESSES_START,
    GET_SUPPLIER_ADDRESSES_SUCCESS,
    GET_SUPPLIER_ADDRESSES_FAIL,
    CREATE_SUPPLIER_ADDRESS_START,
    CREATE_SUPPLIER_ADDRESS_SUCCESS,
    CREATE_SUPPLIER_ADDRESS_FAIL,
    GET_SUPPLIER_ADDRESS_START,
    GET_SUPPLIER_ADDRESS_SUCCESS,
    GET_SUPPLIER_ADDRESS_FAIL,
    EDIT_SUPPLIER_ADDRESS
    } from '../types/supplieraddressTypes';
import { supplieraddressesURL } from '../constants';

//supplier addresses
const getSupplierAddressListStart = () => {
  return {
    type: GET_SUPPLIER_ADDRESSES_START
  };
};

const getSupplierAddressListSuccess = supplieraddresses => {
  return {
    type: GET_SUPPLIER_ADDRESSES_SUCCESS,
    supplieraddresses
  };
};

const getSupplierAddressListFail = error => {
  return {
    type: GET_SUPPLIER_ADDRESSES_FAIL,
    error: error
  };
};

const createSupplierAddressStart = () => {
  return {
    type: CREATE_SUPPLIER_ADDRESS_START
  };
};

const createSupplierAddressSuccess = supplieraddress => {
  return {
    type: CREATE_SUPPLIER_ADDRESS_SUCCESS,
    supplieraddress
  };
};

const createSupplierAddressFail = error => {
  return {
    type: CREATE_SUPPLIER_ADDRESS_FAIL,
    error: error
  };
};

const getSupplierAddressDetailStart = () => {
  return {
    type: GET_SUPPLIER_ADDRESS_START
  };
};

const getSupplierAddressDetailSuccess = supplieraddress => {
  return {
    type: GET_SUPPLIER_ADDRESS_SUCCESS,
    supplieraddress
  };
};

const getSupplierAddressDetailFail = error => {
  return {
    type: GET_SUPPLIER_ADDRESS_FAIL,
    error: error
  };
};

export const getSupplierAddresses = (token) => {
  return dispatch => {
      dispatch(getSupplierAddressListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(supplieraddressesURL, headers)
        .then(res => {
          const supplieraddresses = res.data;
          dispatch(getSupplierAddressListSuccess(supplieraddresses));
          })
        .catch(err => {
          dispatch(getSupplierAddressListStart(err));
        });
    };
};

export const getSupplierAddress = (id, token) => {
  return dispatch => {
      dispatch(getSupplierAddressDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${supplieraddressesURL}${id}`, headers)
        .then(res => {
          const supplieraddress = res.data;
          dispatch(getSupplierAddressDetailSuccess(supplieraddress));
          })
        .catch(err => {
          dispatch(getSupplierAddressDetailFail(err));
        });
    };
};

export const addSupplierAddress = (supplieraddress, token) => {
  return dispatch => {
      dispatch(createSupplierAddressStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(supplieraddressesURL, supplieraddress, headers)
        .then(res => {
          dispatch(createSupplierAddressSuccess(supplieraddress));
        })
        .catch(err => {
          dispatch(createSupplierAddressFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editSupplierAddress = (id, supplieraddress, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${supplieraddressesURL}${id}/`, supplieraddress, headers)
    .then(res => {
        dispatch({
            type: EDIT_SUPPLIER_ADDRESS,
            payload: res.data
        });
    }).catch(err => console.log(err))
}

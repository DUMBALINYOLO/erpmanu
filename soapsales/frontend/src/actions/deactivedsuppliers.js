import axios from 'axios';
import {
    GET_DEACTIVED_SUPPLIERS_START,
    GET_DEACTIVED_SUPPLIERS_SUCCESS,
    GET_DEACTIVED_SUPPLIERS_FAIL
    } from '../types/deactivedsupplierTypes';
import { deactivedsuppliersURL } from '../constants';

//deactived suppliers
const getDeactivedSupplierListStart = () => {
  return {
    type: GET_DEACTIVED_SUPPLIERS_START
  };
};

const getDeactivedSupplierListSuccess = deactivedsuppliers => {
  return {
    type: GET_DEACTIVED_SUPPLIERS_SUCCESS,
    deactivedsuppliers
  };
};

const getDeactivedSupplierListFail = error => {
  return {
    type: GET_DEACTIVED_SUPPLIERS_FAIL,
    error: error
  };
};

export const getDeactivedSuppliers = (token) => {
  return dispatch => {
      dispatch(getDeactivedSupplierListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(deactivedsuppliersURL, headers)
        .then(res => {
          const deactivedsuppliers = res.data;
          dispatch(getDeactivedSupplierListSuccess(deactivedsuppliers));
          })
        .catch(err => {
          dispatch(getDeactivedSupplierListStart(err));
        });
    };
};


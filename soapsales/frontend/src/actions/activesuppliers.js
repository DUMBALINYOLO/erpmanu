import axios from 'axios';
import {
    GET_ACTIVE_SUPPLIERS_START,
    GET_ACTIVE_SUPPLIERS_SUCCESS,
    GET_ACTIVE_SUPPLIERS_FAIL,
    CREATE_ACTIVE_SUPPLIER_START,
    CREATE_ACTIVE_SUPPLIER_SUCCESS,
    CREATE_ACTIVE_SUPPLIER_FAIL,
    GET_ACTIVE_SUPPLIER_START,
    GET_ACTIVE_SUPPLIER_SUCCESS,
    GET_ACTIVE_SUPPLIER_FAIL,
    EDIT_ACTIVE_SUPPLIER
    } from '../types/activesupplierTypes';
import { activesuppliersURL } from '../constants';

//active suppliers
const getActiveSupplierListStart = () => {
  return {
    type: GET_ACTIVE_SUPPLIERS_START
  };
};

const getActiveSupplierListSuccess = activesuppliers => {
  return {
    type: GET_ACTIVE_SUPPLIERS_SUCCESS,
    activesuppliers
  };
};

const getActiveSupplierListFail = error => {
  return {
    type: GET_ACTIVE_SUPPLIERS_FAIL,
    error: error
  };
};

const createActiveSupplierStart = () => {
  return {
    type: CREATE_ACTIVE_SUPPLIER_START
  };
};


const createActiveSupplierSuccess = activesupplier => {
  return {
    type: CREATE_ACTIVE_SUPPLIER_SUCCESS,
    activesupplier
  };
};

const createActiveSupplierFail = error => {
  return {
    type: CREATE_ACTIVE_SUPPLIER_FAIL,
    error: error
  };
};

const getActiveSupplierDetailStart = () => {
  return {
    type: GET_ACTIVE_SUPPLIER_START
  };
};

const getActiveSupplierDetailSuccess = activesupplier => {
  return {
    type: GET_ACTIVE_SUPPLIER_SUCCESS,
    activesupplier
  };
};

const getActiveSupplierDetailFail = error => {
  return {
    type: GET_ACTIVE_SUPPLIER_FAIL,
    error: error
  };
};

export const getActiveSuppliers = (token) => {
  return dispatch => {
      dispatch(getActiveSupplierListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(activesuppliersURL, headers)
        .then(res => {
          const activesuppliers = res.data;
          dispatch(getActiveSupplierListSuccess(activesuppliers));
          })
        .catch(err => {
          dispatch(getActiveSupplierListStart(err));
        });
    };
};

export const getActiveSupplier = (id, token) => {
  return dispatch => {
      dispatch(getActiveSupplierDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${activesuppliersURL}${id}`, headers)
        .then(res => {
          const activesupplier = res.data;
          dispatch(getActiveSupplierDetailSuccess(activesupplier));
          })
        .catch(err => {
          dispatch(getActiveSupplierDetailFail(err));
        });
    };
};

export const addActiveSupplier = (activesupplier, token) => {
  return dispatch => {
      dispatch(createActiveSupplierStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(activesuppliersURL, activesupplier, headers)
        .then(res => {
          dispatch(createActiveSupplierSuccess(activesupplier));
        })
        .catch(err => {
          dispatch(createActiveSupplierFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editActiveSupplier = (id, activesupplier, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${activesuppliersURL}${id}/`, activesupplier, headers)
    .then(res => {
        dispatch({
            type: EDIT_ACTIVE_SUPPLIER,
            payload: res.data
        });
    }).catch(err => console.log(err))
}

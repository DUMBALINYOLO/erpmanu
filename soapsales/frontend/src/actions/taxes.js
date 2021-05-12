import axios from 'axios';
import {
    CREATE_TAX_START,
    CREATE_TAX_SUCCESS,
    CREATE_TAX_FAIL,
    EDIT_TAX,
    GET_TAXES_START,
    GET_TAXES_SUCCESS,
    GET_TAXES_FAIL
    } from '../types/taxTypes';
import { taxesURL } from '../constants';

//taxes
const getTaxListStart = () => {
  return {
    type: GET_TAXES_START
  };
};

const getTaxListSuccess = taxes => {
  return {
    type: GET_TAXES_SUCCESS,
    taxes
  };
};

const getTaxListFail = error => {
  return {
    type: GET_TAXES_FAIL,
    error: error
  };
};

const createTaxStart = () => {
  return {
    type: CREATE_TAX_START
  };
};


const createTaxSuccess = tax => {
  return {
    type: CREATE_TAX_SUCCESS,
    tax
  };
};

const createTaxFail = error => {
  return {
    type: CREATE_TAX_FAIL,
    error: error
  };
};

export const getTaxes = (token) => {
  return dispatch => {
      dispatch(getTaxListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(taxesURL, headers)
        .then(res => {
          const taxes = res.data;
          dispatch(getTaxListSuccess(taxes));
          })
        .catch(err => {
          dispatch(getTaxListStart(err));
        });
    };
};

export const addTax = (tax, token) => {
  return dispatch => {
      dispatch(createTaxStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(taxesURL, tax, headers)
        .then(res => {
          dispatch(createTaxSuccess(tax));
        })
        .catch(err => {
          dispatch(createTaxFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editTax = (id, tax, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${taxesURL}${id}/`, tax, headers)
        .then(res => {
            dispatch({
                type: EDIT_TAX,
                payload: res.data
            });
        }).catch(err => console.log(err))
}


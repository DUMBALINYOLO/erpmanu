import axios from 'axios';
import {
    GET_DEBITS_START,
    GET_DEBITS_SUCCESS,
    GET_DEBITS_FAIL,
    GET_DEBIT_START,
    GET_DEBIT_SUCCESS,
    GET_DEBIT_FAIL
    } from '../types/debitTypes';
import { debitsURL } from '../constants';

//debits
const getDebitListStart = () => {
  return {
    type: GET_DEBITS_START
  };
};

const getDebitListSuccess = debits => {
  return {
    type: GET_DEBITS_SUCCESS,
    debits
  };
};

const getDebitListFail = error => {
  return {
    type: GET_DEBITS_FAIL,
    error: error
  };
};

const getDebitDetailStart = () => {
  return {
    type: GET_DEBIT_START
  };
};

const getDebitDetailSuccess = debit => {
  return {
    type: GET_DEBIT_SUCCESS,
    debit
  };
};

const getDebitDetailFail = error => {
  return {
    type: GET_DEBIT_FAIL,
    error: error
  };
};

export const getDebits = (token) => {
  return dispatch => {
      dispatch(getDebitListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(debitsURL, headers)
        .then(res => {
          const debits = res.data;
          dispatch(getDebitListSuccess(debits));
          })
        .catch(err => {
          dispatch(getDebitListStart(err));
        });
    };
};

export const getDebit = (id, token) => {
  return dispatch => {
      dispatch(getDebitDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${debitsURL}${id}`, headers)
        .then(res => {
          const debit = res.data;
          dispatch(getDebitDetailSuccess(debit));
          })
        .catch(err => {
          dispatch(getDebitDetailFail(err));
        });
    };
};

import axios from 'axios';
import {
    GET_IN_ACTIVE_ACCOUNTS_START,
    GET_IN_ACTIVE_ACCOUNTS_SUCCESS,
    GET_IN_ACTIVE_ACCOUNTS_FAIL,
    GET_IN_ACTIVE_ACCOUNT_START,
    GET_IN_ACTIVE_ACCOUNT_SUCCESS,
    GET_IN_ACTIVE_ACCOUNT_FAIL
    } from '../types/inactiveaccountTypes';
import { inactiveaccountsURL } from '../constants';

//in active accounts
const getInActiveAccountListStart = () => {
  return {
    type: GET_IN_ACTIVE_ACCOUNTS_START
  };
};

const getInActiveAccountListSuccess = inactiveaccounts => {
  return {
    type: GET_IN_ACTIVE_ACCOUNTS_SUCCESS,
    inactiveaccounts
  };
};

const getInActiveAccountListFail = error => {
  return {
    type: GET_IN_ACTIVE_ACCOUNTS_FAIL,
    error: error
  };
};

const getInActiveAccountDetailStart = () => {
  return {
    type: GET_IN_ACTIVE_ACCOUNT_START
  };
};

const getInActiveAccountDetailSuccess = inactiveaccount => {
  return {
    type: GET_IN_ACTIVE_ACCOUNT_SUCCESS,
    inactiveaccount
  };
};

const getInActiveAccountDetailFail = error => {
  return {
    type: GET_IN_ACTIVE_ACCOUNT_FAIL,
    error: error
  };
};

export const getInActiveAccounts = (token) => {
  return dispatch => {
      dispatch(getInActiveAccountListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(inactiveaccountsURL, headers)
        .then(res => {
          const inactiveaccounts = res.data;
          dispatch(getInActiveAccountListSuccess(inactiveaccounts));
          })
        .catch(err => {
          dispatch(getInActiveAccountListStart(err));
        });
    };
};

export const getInActiveAccount = (id, token) => {
  return dispatch => {
      dispatch(getInActiveAccountDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${inactiveaccountsURL}${id}`, headers)
        .then(res => {
          const inactiveaccount = res.data;
          dispatch(getInActiveAccountDetailSuccess(inactiveaccount));
          })
        .catch(err => {
          dispatch(getInActiveAccountDetailFail(err));
        });
    };
};


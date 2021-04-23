import axios from 'axios';
import {
    GET_ACCOUNTS_START,
    GET_ACCOUNTS_SUCCESS,
    GET_ACCOUNTS_FAIL,
    CREATE_ACCOUNT_START,
    CREATE_ACCOUNT_SUCCESS,
    CREATE_ACCOUNT_FAIL,
    GET_ACCOUNT_START,
    GET_ACCOUNT_SUCCESS,
    GET_ACCOUNT_FAIL,
    EDIT_ACCOUNT
    } from '../types/accountTypes';
import { accountsURL } from '../constants';

//accounts
const getAccountListStart = () => {
  return {
    type: GET_ACCOUNTS_START
  };
};

const getAccountListSuccess = accounts => {
  return {
    type: GET_ACCOUNTS_SUCCESS,
    accounts
  };
};

const getAccountListFail = error => {
  return {
    type: GET_ACCOUNTS_FAIL,
    error: error
  };
};

const createAccountStart = () => {
  return {
    type: CREATE_ACCOUNT_START
  };
};


const createAccountSuccess = account => {
  return {
    type: CREATE_ACCOUNT_SUCCESS,
    account
  };
};

const createAccountFail = error => {
  return {
    type: CREATE_ACCOUNT_FAIL,
    error: error
  };
};

const getAccountDetailStart = () => {
  return {
    type: GET_ACCOUNT_START
  };
};

const getAccountDetailSuccess = account => {
  return {
    type: GET_ACCOUNT_SUCCESS,
    account
  };
};

const getAccountDetailFail = error => {
  return {
    type: GET_ACCOUNT_FAIL,
    error: error
  };
};

export const getAccounts = (token) => {
  return dispatch => {
      dispatch(getAccountListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(accountsURL, headers)
        .then(res => {
          const accounts = res.data;
          dispatch(getAccountListSuccess(accounts));
          })
        .catch(err => {
          dispatch(getAccountListStart(err));
        });
    };
};

export const getAccount = (id, token) => {
  return dispatch => {
      dispatch(getAccountDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${accountsURL}${id}`, headers)
        .then(res => {
          const account = res.data;
          dispatch(getAccountDetailSuccess(account));
          })
        .catch(err => {
          dispatch(getAccountDetailFail(err));
        });
    };
};

export const addAccount = (account, token) => {
  return dispatch => {
      dispatch(createAccountStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(accountsURL, account, headers)
        .then(res => {
          dispatch(createAccountSuccess(account));
        })
        .catch(err => {
          dispatch(createAccountFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editAccount = (id, account, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${accountsURL}${id}/`, account, headers)
        .then(res => {
            dispatch({
                type: EDIT_ACCOUNT,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

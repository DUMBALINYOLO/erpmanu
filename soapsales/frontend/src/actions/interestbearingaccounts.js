import axios from 'axios';
import {
    GET_INTEREST_BEARING_ACCOUNTS_START,
    GET_INTEREST_BEARING_ACCOUNTS_SUCCESS,
    GET_INTEREST_BEARING_ACCOUNTS_FAIL,
    CREATE_INTEREST_BEARING_ACCOUNT_START,
    CREATE_INTEREST_BEARING_ACCOUNT_SUCCESS,
    CREATE_INTEREST_BEARING_ACCOUNT_FAIL,
    GET_INTEREST_BEARING_ACCOUNT_START,
    GET_INTEREST_BEARING_ACCOUNT_SUCCESS,
    GET_INTEREST_BEARING_ACCOUNT_FAIL,
    EDIT_INTEREST_BEARING_ACCOUNT
    } from '../types/interestbearingaccountTypes';
import { interestbearingaccountsURL } from '../constants';

//interest bearing accounts
const getInterestBearingAccountListStart = () => {
  return {
    type: GET_INTEREST_BEARING_ACCOUNTS_START
  };
};

const getInterestBearingAccountListSuccess = interestbearingaccounts => {
  return {
    type: GET_INTEREST_BEARING_ACCOUNTS_SUCCESS,
    interestbearingaccounts
  };
};

const getInterestBearingAccountListFail = error => {
  return {
    type: GET_INTEREST_BEARING_ACCOUNTS_FAIL,
    error: error
  };
};

const createInterestBearingAccountStart = () => {
  return {
    type: CREATE_INTEREST_BEARING_ACCOUNT_START
  };
};


const createInterestBearingAccountSuccess = interestbearingaccount => {
  return {
    type: CREATE_INTEREST_BEARING_ACCOUNT_SUCCESS,
    interestbearingaccount
  };
};

const createInterestBearingAccountFail = error => {
  return {
    type: CREATE_INTEREST_BEARING_ACCOUNT_FAIL,
    error: error
  };
};

const getInterestBearingAccountDetailStart = () => {
  return {
    type: GET_INTEREST_BEARING_ACCOUNT_START
  };
};

const getInterestBearingAccountDetailSuccess = interestbearingaccount => {
  return {
    type: GET_INTEREST_BEARING_ACCOUNT_SUCCESS,
    interestbearingaccount
  };
};

const getInterestBearingAccountDetailFail = error => {
  return {
    type: GET_INTEREST_BEARING_ACCOUNT_FAIL,
    error: error
  };
};

export const getInterestBearingAccounts = (token) => {
  return dispatch => {
      dispatch(getInterestBearingAccountListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(interestbearingaccountsURL, headers)
        .then(res => {
          const interestbearingaccounts = res.data;
          dispatch(getInterestBearingAccountListSuccess(interestbearingaccounts));
          })
        .catch(err => {
          dispatch(getInterestBearingAccountListStart(err));
        });
    };
};

export const getInterestBearingAccount = (id, token) => {
  return dispatch => {
      dispatch(getInterestBearingAccountDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${interestbearingaccountsURL}${id}`, headers)
        .then(res => {
          const interestbearingaccount = res.data;
          dispatch(getInterestBearingAccountDetailSuccess(interestbearingaccount));
          })
        .catch(err => {
          dispatch(getInterestBearingAccountDetailFail(err));
        });
    };
};

export const addInterestBearingAccount = (interestbearingaccount, token) => {
  return dispatch => {
      dispatch(createInterestBearingAccountStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(interestbearingaccountsURL, interestbearingaccount, headers)
        .then(res => {
          dispatch(createInterestBearingAccountSuccess(interestbearingaccount));
        })
        .catch(err => {
          dispatch(createInterestBearingAccountFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editInterestBearingAccount = (id, interestbearingaccount, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${interestbearingaccountsURL}${id}/`, interestbearingaccount, headers)
    .then(res => {
        dispatch({
            type: EDIT_INTEREST_BEARING_ACCOUNT,
            payload: res.data
        });
    }).catch(err => console.log(err))
}

import axios from 'axios';
import {
    GET_CREDITS_START,
    GET_CREDITS_SUCCESS,
    GET_CREDITS_FAIL,
    CREATE_CREDIT_START,
    CREATE_CREDIT_SUCCESS,
    CREATE_CREDIT_FAIL,
    GET_CREDIT_START,
    GET_CREDIT_SUCCESS,
    GET_CREDIT_FAIL
    } from '../types/creditTypes';
import { creditsURL } from '../constants';

//credits
const getCreditListStart = () => {
  return {
    type: GET_CREDITS_START
  };
};

const getCreditListSuccess = credits => {
  return {
    type: GET_CREDITS_SUCCESS,
    credits
  };
};

const getCreditListFail = error => {
  return {
    type: GET_CREDITS_FAIL,
    error: error
  };
};

const createCreditStart = () => {
  return {
    type: CREATE_CREDIT_START
  };
};


const createCreditSuccess = credit => {
  return {
    type: CREATE_CREDIT_SUCCESS,
    credit
  };
};

const createCreditFail = error => {
  return {
    type: CREATE_CREDIT_FAIL,
    error: error
  };
};

const getCreditDetailStart = () => {
  return {
    type: GET_CREDIT_START
  };
};

const getCreditDetailSuccess = credit => {
  return {
    type: GET_CREDIT_SUCCESS,
    credit
  };
};

const getCreditDetailFail = error => {
  return {
    type: GET_CREDIT_FAIL,
    error: error
  };
};

export const getCredits = (token) => {
  return dispatch => {
      dispatch(getCreditListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(creditsURL, headers)
        .then(res => {
          const credits = res.data;
          dispatch(getCreditListSuccess(credits));
          })
        .catch(err => {
          dispatch(getCreditListStart(err));
        });
    };
};

export const getCredit = (id, token) => {
  return dispatch => {
      dispatch(getCreditDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${creditsURL}${id}`, headers)
        .then(res => {
          const credit = res.data;
          dispatch(getCreditDetailSuccess(credit));
          })
        .catch(err => {
          dispatch(getCreditDetailFail(err));
        });
    };
};

export const addCredit = (credit, token) => {
  return dispatch => {
      dispatch(createCreditStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(creditsURL, credit, headers)
        .then(res => {
          dispatch(createCreditSuccess(credit));
        })
        .catch(err => {
          dispatch(createCreditFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};


import axios from 'axios';
import {
    GET_ACCOUNTING_ADJUSTMENTS_START,
    GET_ACCOUNTING_ADJUSTMENTS_SUCCESS,
    GET_ACCOUNTING_ADJUSTMENTS_FAIL,
    CREATE_ACCOUNTING_ADJUSTMENT_START,
    CREATE_ACCOUNTING_ADJUSTMENT_SUCCESS,
    CREATE_ACCOUNTING_ADJUSTMENT_FAIL,
    GET_ACCOUNTING_ADJUSTMENT_START,
    GET_ACCOUNTING_ADJUSTMENT_SUCCESS,
    GET_ACCOUNTING_ADJUSTMENT_FAIL,
    EDIT_ACCOUNTING_ADJUSTMENT
    } from '../types/accountingadjustmentTypes';
import { accountingadjustmentsURL } from '../constants';

//accounting adjustments
const getAccountingAdjustmentListStart = () => {
  return {
    type: GET_ACCOUNTING_ADJUSTMENTS_START
  };
};

const getAccountingAdjustmentListSuccess = accountingadjustments => {
  return {
    type: GET_ACCOUNTING_ADJUSTMENTS_SUCCESS,
    accountingadjustments
  };
};

const getAccountingAdjustmentListFail = error => {
  return {
    type: GET_ACCOUNTING_ADJUSTMENTS_FAIL,
    error: error
  };
};

const createAccountingAdjustmentStart = () => {
  return {
    type: CREATE_ACCOUNTING_ADJUSTMENT_START
  };
};


const createAccountingAdjustmentSuccess = accountingadjustment => {
  return {
    type: CREATE_ACCOUNTING_ADJUSTMENT_SUCCESS,
    accountingadjustment
  };
};

const createAccountingAdjustmentFail = error => {
  return {
    type: CREATE_ACCOUNTING_ADJUSTMENT_FAIL,
    error: error
  };
};

const getAccountingAdjustmentDetailStart = () => {
  return {
    type: GET_ACCOUNTING_ADJUSTMENT_START
  };
};

const getAccountingAdjustmentDetailSuccess = accountingadjustment => {
  return {
    type: GET_ACCOUNTING_ADJUSTMENT_SUCCESS,
    accountingadjustment
  };
};

const getAccountingAdjustmentDetailFail = error => {
  return {
    type: GET_ACCOUNTING_ADJUSTMENT_FAIL,
    error: error
  };
};

export const getAccountingAdjustments = (token) => {
  return dispatch => {
      dispatch(getAccountingAdjustmentListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(accountingadjustmentsURL, headers)
        .then(res => {
          const accountingadjustments = res.data;
          dispatch(getAccountingAdjustmentListSuccess(accountingadjustments));
          })
        .catch(err => {
          dispatch(getAccountingAdjustmentListStart(err));
        });
    };
};

export const getAccountingAdjustment = (id, token) => {
  return dispatch => {
      dispatch(getAccountingAdjustmentDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${accountingadjustmentsURL}${id}`, headers)
        .then(res => {
          const accountingadjustment = res.data;
          dispatch(getAccountingAdjustmentDetailSuccess(accountingadjustment));
          })
        .catch(err => {
          dispatch(getAccountingAdjustmentDetailFail(err));
        });
    };
};

export const addAccountingAdjustment = (accountingadjustment, token) => {
  return dispatch => {
      dispatch(createAccountingAdjustmentStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(accountingadjustmentsURL, accountingadjustment, headers)
        .then(res => {
          dispatch(createAccountingAdjustmentSuccess(accountingadjustment));
        })
        .catch(err => {
          dispatch(createAccountingAdjustmentFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editAccountingAdjustment = (id, accountingadjustment, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${accountingadjustmentsURL}${id}/`, accountingadjustment, headers)
        .then(res => {
            dispatch({
                type: EDIT_ACCOUNTING_ADJUSTMENT,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

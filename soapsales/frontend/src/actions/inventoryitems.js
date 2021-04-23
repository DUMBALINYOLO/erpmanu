import axios from 'axios';
import { GET_INVENTORY_ITEMS } from './types';
import { inventoryitemsURL } from '../constants';

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


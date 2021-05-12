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
import { updateObject } from "../utility";

const initialState = {
    accountingadjustments: [],
    accountingadjustment: [],
    loading: false,
    error: null,
}

const getAccountingAdjustmentListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getAccountingAdjustmentListSuccess = (state, action) => {
  return updateObject(state, {
    accountingadjustments: action.accountingadjustments,
    error: null,
    loading: false
  });
};

const getAccountingAdjustmentListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createAccountingAdjustmentStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createAccountingAdjustmentSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createAccountingAdjustmentFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getAccountingAdjustmentDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getAccountingAdjustmentDetailSuccess = (state, action) => {
  return updateObject(state, {
    accountingadjustment: action.accountingadjustment,
    error: null,
    loading: false
  });
};

const getAccountingAdjustmentDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function accountingadjustments(state = initialState, action){
    switch(action.type){
        case GET_ACCOUNTING_ADJUSTMENTS_START:
            return getAccountingAdjustmentListStart(state, action);
        case GET_ACCOUNTING_ADJUSTMENTS_SUCCESS:
            return getAccountingAdjustmentListSuccess(state, action);
        case GET_ACCOUNTING_ADJUSTMENTS_FAIL:
            return getAccountingAdjustmentListFail(state, action);
        case CREATE_ACCOUNTING_ADJUSTMENT_START:
            return createAccountingAdjustmentStart(state, action);
        case CREATE_ACCOUNTING_ADJUSTMENT_SUCCESS:
            return createAccountingAdjustmentSuccess(state, action);
        case CREATE_ACCOUNTING_ADJUSTMENT_FAIL:
            return createAccountingAdjustmentFail(state, action);
        case GET_ACCOUNTING_ADJUSTMENT_START:
        return getAccountingAdjustmentDetailStart(state, action);
        case GET_ACCOUNTING_ADJUSTMENT_SUCCESS:
            return getAccountingAdjustmentDetailSuccess(state, action);
        case GET_ACCOUNTING_ADJUSTMENT_FAIL:
            return getAccountingAdjustmentDetailFail(state, action);
        case EDIT_ACCOUNTING_ADJUSTMENT:
            const arrayList = state.accountingadjustments;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                accountingadjustments: arrayList,
            };
        default:
            return state;
    }
}

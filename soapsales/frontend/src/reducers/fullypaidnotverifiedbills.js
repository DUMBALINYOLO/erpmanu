import {
    GET_FULLY_PAID_NOT_VERIFIED_BILLS_START,
    GET_FULLY_PAID_NOT_VERIFIED_BILLS_SUCCESS,
    GET_FULLY_PAID_NOT_VERIFIED_BILLS_FAIL,
    GET_FULLY_PAID_NOT_VERIFIED_BILL_START,
    GET_FULLY_PAID_NOT_VERIFIED_BILL_SUCCESS,
    GET_FULLY_PAID_NOT_VERIFIED_BILL_FAIL
} from '../types/fullypaidnotverifiedbillTypes';
import { updateObject } from "../utility";

const initialState = {
    fullypaidnotverifiedbills: [],
    fullypaidnotverifiedbill: {},
    loading: false,
    error: null,
}

const getFullyPaidNotVerifiedBillListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getFullyPaidNotVerifiedBillListSuccess = (state, action) => {
  return updateObject(state, {
    fullypaidnotverifiedbills: action.fullypaidnotverifiedbills,
    error: null,
    loading: false
  });
};

const getFullyPaidNotVerifiedBillListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getFullyPaidNotVerifiedBillDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getFullyPaidNotVerifiedBillDetailSuccess = (state, action) => {
  return updateObject(state, {
    fullypaidnotverifiedbill: action.fullypaidnotverifiedbill,
    error: null,
    loading: false
  });
};

const getFullyPaidNotVerifiedBillDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function fullypaidnotverifiedbills(state = initialState, action){
    switch(action.type){
        case GET_FULLY_PAID_NOT_VERIFIED_BILLS_START:
            return getFullyPaidNotVerifiedBillListStart(state, action);
        case GET_FULLY_PAID_NOT_VERIFIED_BILLS_SUCCESS:
            return getFullyPaidNotVerifiedBillListSuccess(state, action);
        case GET_FULLY_PAID_NOT_VERIFIED_BILLS_FAIL:
            return getFullyPaidNotVerifiedBillListFail(state, action);
        case GET_FULLY_PAID_NOT_VERIFIED_BILL_START:
        return getFullyPaidNotVerifiedBillDetailStart(state, action);
        case GET_FULLY_PAID_NOT_VERIFIED_BILL_SUCCESS:
            return getFullyPaidNotVerifiedBillDetailSuccess(state, action);
        case GET_FULLY_PAID_NOT_VERIFIED_BILL_FAIL:
            return getFullyPaidNotVerifiedBillDetailFail(state, action);
        default:
            return state;
    }
}

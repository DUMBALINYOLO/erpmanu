import {
    GET_FULLY_PAID_BILLS_START,
    GET_FULLY_PAID_BILLS_SUCCESS,
    GET_FULLY_PAID_BILLS_FAIL,
    GET_FULLY_PAID_BILL_START,
    GET_FULLY_PAID_BILL_SUCCESS,
    GET_FULLY_PAID_BILL_FAIL
} from '../types/fullypaidbillTypes';
import { updateObject } from "../utility";

const initialState = {
    fullypaidbills: [],
    fullypaidbill: {},
    loading: false,
    error: null,
}

const getFullyPaidBillListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getFullyPaidBillListSuccess = (state, action) => {
  return updateObject(state, {
    fullypaidbills: action.fullypaidbills,
    error: null,
    loading: false
  });
};

const getFullyPaidBillListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getFullyPaidBillDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getFullyPaidBillDetailSuccess = (state, action) => {
  return updateObject(state, {
    fullypaidbill: action.fullypaidbill,
    error: null,
    loading: false
  });
};

const getFullyPaidBillDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function fullypaidbills(state = initialState, action){
    switch(action.type){
        case GET_FULLY_PAID_BILLS_START:
            return getFullyPaidBillListStart(state, action);
        case GET_FULLY_PAID_BILLS_SUCCESS:
            return getFullyPaidBillListSuccess(state, action);
        case GET_FULLY_PAID_BILLS_FAIL:
            return getFullyPaidBillListFail(state, action);
        case GET_FULLY_PAID_BILL_START:
        return getFullyPaidBillDetailStart(state, action);
        case GET_FULLY_PAID_BILL_SUCCESS:
            return getFullyPaidBillDetailSuccess(state, action);
        case GET_FULLY_PAID_BILL_FAIL:
            return getFullyPaidBillDetailFail(state, action);
        default:
            return state;
    }
}

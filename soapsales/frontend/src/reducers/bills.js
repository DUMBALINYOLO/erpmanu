import {
    GET_BILLS_START,
    GET_BILLS_SUCCESS,
    GET_BILLS_FAIL,
    CREATE_BILL_START,
    CREATE_BILL_SUCCESS,
    CREATE_BILL_FAIL,
    GET_BILL_START,
    GET_BILL_SUCCESS,
    GET_BILL_FAIL,
    EDIT_BILL
    } from '../types/billTypes';
import { updateObject } from "../utility";

const initialState = {
    bills: [],
    bill: {},
    loading: false,
    error: null,
}

const getBillListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getBillListSuccess = (state, action) => {
  return updateObject(state, {
    bills: action.bills,
    error: null,
    loading: false
  });
};

const getBillListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createBillStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createBillSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createBillFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getBillDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getBillDetailSuccess = (state, action) => {
  return updateObject(state, {
    bill: action.bill,
    error: null,
    loading: false
  });
};

const getBillDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function bills(state = initialState, action){
    switch(action.type){
        case GET_BILLS_START:
            return getBillListStart(state, action);
        case GET_BILLS_SUCCESS:
            return getBillListSuccess(state, action);
        case GET_BILLS_FAIL:
            return getBillListFail(state, action);
        case CREATE_BILL_START:
            return createBillStart(state, action);
        case CREATE_BILL_SUCCESS:
            return createBillSuccess(state, action);
        case CREATE_BILL_FAIL:
            return createBillFail(state, action);
        case GET_BILL_START:
        return getBillDetailStart(state, action);
        case GET_BILL_SUCCESS:
            return getBillDetailSuccess(state, action);
        case GET_BILL_FAIL:
            return getBillDetailFail(state, action);
        case EDIT_BILL:
            const arrayList = state.bills;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                bills: arrayList,
            };
        default:
            return state;
    }
}


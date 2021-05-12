import {
    GET_BILL_PAYMENTS_START,
    GET_BILL_PAYMENTS_SUCCESS,
    GET_BILL_PAYMENTS_FAIL,
    CREATE_BILL_PAYMENT_START,
    CREATE_BILL_PAYMENT_SUCCESS,
    CREATE_BILL_PAYMENT_FAIL,
    GET_BILL_PAYMENT_START,
    GET_BILL_PAYMENT_SUCCESS,
    GET_BILL_PAYMENT_FAIL,
    EDIT_BILL_PAYMENT
    } from '../types/billpaymentTypes';
import { updateObject } from "../utility";

const initialState = {
    billpayments: [],
    billpayment: {},
    loading: false,
    error: null,
}

const getBillPaymentListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getBillPaymentListSuccess = (state, action) => {
  return updateObject(state, {
    billpayments: action.billpayments,
    error: null,
    loading: false
  });
};

const getBillPaymentListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createBillPaymentStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createBillPaymentSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createBillPaymentFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getBillPaymentDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getBillPaymentDetailSuccess = (state, action) => {
  return updateObject(state, {
    billpayment: action.billpayment,
    error: null,
    loading: false
  });
};

const getBillPaymentDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function billpayments(state = initialState, action){
    switch(action.type){
        case GET_BILL_PAYMENTS_START:
            return getBillPaymentListStart(state, action);
        case GET_BILL_PAYMENTS_SUCCESS:
            return getBillPaymentListSuccess(state, action);
        case GET_BILL_PAYMENTS_FAIL:
            return getBillPaymentListFail(state, action);
        case CREATE_BILL_PAYMENT_START:
            return createBillPaymentStart(state, action);
        case CREATE_BILL_PAYMENT_SUCCESS:
            return createBillPaymentSuccess(state, action);
        case CREATE_BILL_PAYMENT_FAIL:
            return createBillPaymentFail(state, action);
        case GET_BILL_PAYMENT_START:
        return getBillPaymentDetailStart(state, action);
        case GET_BILL_PAYMENT_SUCCESS:
            return getBillPaymentDetailSuccess(state, action);
        case GET_BILL_PAYMENT_FAIL:
            return getBillPaymentDetailFail(state, action);
        case EDIT_BILL_PAYMENT:
            const arrayList = state.billpayments;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                billpayments: arrayList,
            };
        default:
            return state;
    }
}

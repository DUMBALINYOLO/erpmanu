import { 
    GET_PAYMENTS_START,
    GET_PAYMENTS_SUCCESS,
    GET_PAYMENTS_FAIL,
    GET_PAYMENT_START,
    GET_PAYMENT_SUCCESS,
    GET_PAYMENT_FAIL,
    CREATE_PAYMENT_START,
    CREATE_PAYMENT_SUCCESS,
    CREATE_PAYMENT_FAIL
} from '../types/paymentTypes';
import { updateObject } from "../utility";

const initialState = {
    payments: [],
    payment: {},
    loading: false,
    error: null,
}

const getPaymentListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getPaymentListSuccess = (state, action) => {
  return updateObject(state, {
    payments: action.payments,
    error: null,
    loading: false
  });
};

const getPaymentListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createPaymentStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createPaymentSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createPaymentFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getPaymentDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getPaymentDetailSuccess = (state, action) => {
  return updateObject(state, {
    payment: action.payment,
    error: null,
    loading: false
  });
};

const getPaymentDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function payments(state = initialState, action){
    switch(action.type){
        case GET_PAYMENTS_START:
            return getPaymentListStart(state, action);
        case GET_PAYMENTS_SUCCESS:
            return getPaymentListSuccess(state, action);
        case GET_PAYMENTS_FAIL:
            return getPaymentListFail(state, action);
        case GET_PAYMENT_START:
            return getPaymentDetailStart(state, action);
        case GET_PAYMENT_SUCCESS:
            return getPaymentDetailSuccess(state, action);
        case GET_PAYMENT_FAIL:
            return getPaymentDetailFail(state, action);
        case CREATE_PAYMENT_START:
            return createPaymentStart(state, action);
        case CREATE_PAYMENT_SUCCESS:
            return createPaymentSuccess(state, action);
        case CREATE_PAYMENT_FAIL:
            return createPaymentFail(state, action);
        default:
            return state;
    }
}

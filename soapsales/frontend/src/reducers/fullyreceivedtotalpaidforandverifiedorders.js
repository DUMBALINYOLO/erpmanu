import {
    GET_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDERS_START,
    GET_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDERS_SUCCESS,
    GET_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDERS_FAIL,
    CREATE_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDER_START,
    CREATE_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDER_SUCCESS,
    CREATE_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDER_FAIL,
    GET_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDER_START,
    GET_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDER_SUCCESS,
    GET_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDER_FAIL,
    EDIT_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDER
} from '../types/fullyreceivedtotalpaidforandverifiedorderTypes';
import { updateObject } from "../utility";

const initialState = {
    fullyreceivedtotalpaidforandverifiedorders: [],
    fullyreceivedtotalpaidforandverifiedorder: {},
    loading: false,
    error: null,
}

const getFullyReceivedTotalPaidForAndVerifiedOrderListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getFullyReceivedTotalPaidForAndVerifiedOrderListSuccess = (state, action) => {
  return updateObject(state, {
    fullyreceivedtotalpaidforandverifiedorders: action.fullyreceivedtotalpaidforandverifiedorders,
    error: null,
    loading: false
  });
};

const getFullyReceivedTotalPaidForAndVerifiedOrderListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createFullyReceivedTotalPaidForAndVerifiedOrderStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createFullyReceivedTotalPaidForAndVerifiedOrderSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createFullyReceivedTotalPaidForAndVerifiedOrderFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getFullyReceivedTotalPaidForAndVerifiedOrderDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getFullyReceivedTotalPaidForAndVerifiedOrderDetailSuccess = (state, action) => {
  return updateObject(state, {
    fullyreceivedtotalpaidforandverifiedorder: action.fullyreceivedtotalpaidforandverifiedorder,
    error: null,
    loading: false
  });
};

const getFullyReceivedTotalPaidForAndVerifiedOrderDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function fullyreceivedtotalpaidforandverifiedorders(state = initialState, action){
    switch(action.type){
        case GET_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDERS_START:
            return getFullyReceivedTotalPaidForAndVerifiedOrderListStart(state, action);
        case GET_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDERS_SUCCESS:
            return getFullyReceivedTotalPaidForAndVerifiedOrderListSuccess(state, action);
        case GET_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDERS_FAIL:
            return getFullyReceivedTotalPaidForAndVerifiedOrderListFail(state, action);
        case CREATE_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDER_START:
            return createFullyReceivedTotalPaidForAndVerifiedOrderStart(state, action);
        case CREATE_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDER_SUCCESS:
            return createFullyReceivedTotalPaidForAndVerifiedOrderSuccess(state, action);
        case CREATE_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDER_FAIL:
            return createFullyReceivedTotalPaidForAndVerifiedOrderFail(state, action);
        case GET_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDER_START:
        return getFullyReceivedTotalPaidForAndVerifiedOrderDetailStart(state, action);
        case GET_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDER_SUCCESS:
            return getFullyReceivedTotalPaidForAndVerifiedOrderDetailSuccess(state, action);
        case GET_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDER_FAIL:
            return getFullyReceivedTotalPaidForAndVerifiedOrderDetailFail(state, action);
        case EDIT_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDER:
            const arrayList = state.fullyreceivedtotalpaidforandverifiedorders;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                fullyreceivedtotalpaidforandverifiedorders: arrayList,
            };
        default:
            return state;
    }
}

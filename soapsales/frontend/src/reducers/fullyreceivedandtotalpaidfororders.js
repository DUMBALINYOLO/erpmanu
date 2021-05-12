import {
    GET_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDERS_START,
    GET_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDERS_SUCCESS,
    GET_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDERS_FAIL,
    CREATE_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDER_START,
    CREATE_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDER_SUCCESS,
    CREATE_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDER_FAIL,
    GET_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDER_START,
    GET_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDER_SUCCESS,
    GET_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDER_FAIL,
    EDIT_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDER
} from '../types/fullyreceivedandtotalpaidfororderTypes';
import { updateObject } from "../utility";

const initialState = {
    fullyreceivedandtotalpaidfororders: [],
    fullyreceivedandtotalpaidfororder: {},
    loading: false,
    error: null,
}

const getFullyReceivedAndTotalPaidForOrderListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getFullyReceivedAndTotalPaidForOrderListSuccess = (state, action) => {
  return updateObject(state, {
    fullyreceivedandtotalpaidfororders: action.fullyreceivedandtotalpaidfororders,
    error: null,
    loading: false
  });
};

const getFullyReceivedAndTotalPaidForOrderListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createFullyReceivedAndTotalPaidForOrderStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createFullyReceivedAndTotalPaidForOrderSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createFullyReceivedAndTotalPaidForOrderFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getFullyReceivedAndTotalPaidForOrderDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getFullyReceivedAndTotalPaidForOrderDetailSuccess = (state, action) => {
  return updateObject(state, {
    fullyreceivedandtotalpaidfororder: action.fullyreceivedandtotalpaidfororder,
    error: null,
    loading: false
  });
};

const getFullyReceivedAndTotalPaidForOrderDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function fullyreceivedandtotalpaidfororders(state = initialState, action){
    switch(action.type){
        case GET_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDERS_START:
            return getFullyReceivedAndTotalPaidForOrderListStart(state, action);
        case GET_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDERS_SUCCESS:
            return getFullyReceivedAndTotalPaidForOrderListSuccess(state, action);
        case GET_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDERS_FAIL:
            return getFullyReceivedAndTotalPaidForOrderListFail(state, action);
        case CREATE_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDER_START:
            return createFullyReceivedAndTotalPaidForOrderStart(state, action);
        case CREATE_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDER_SUCCESS:
            return createFullyReceivedAndTotalPaidForOrderSuccess(state, action);
        case CREATE_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDER_FAIL:
            return createFullyReceivedAndTotalPaidForOrderFail(state, action);
        case GET_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDER_START:
        return getFullyReceivedAndTotalPaidForOrderDetailStart(state, action);
        case GET_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDER_SUCCESS:
            return getFullyReceivedAndTotalPaidForOrderDetailSuccess(state, action);
        case GET_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDER_FAIL:
            return getFullyReceivedAndTotalPaidForOrderDetailFail(state, action);
        case EDIT_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDER:
            const arrayList = state.fullyreceivedandtotalpaidfororders;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                fullyreceivedandtotalpaidfororders: arrayList,
            };
        default:
            return state;
    }
}

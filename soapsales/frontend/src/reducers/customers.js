import { GET_CUSTOMER } from '../types/customerTypes';
import {
    ADD_CUSTOMER,
    GET_CUSTOMERS,
    EDIT_CUSTOMER,
    DELETE_CUSTOMER
} from '../types/customerTypes';
import { updateObject } from "../utility";

const initialState = {
    customers: [],
    customer: {},
    loading: false,
    error: null,
}

const getCustomerListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getCustomerListSuccess = (state, action) => {
  return updateObject(state, {
    customers: action.customers,
    error: null,
    loading: false
  });
};

const getCustomerListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createCustomerStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createCustomerSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createCustomerFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getCustomerDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getCustomerDetailSuccess = (state, action) => {
  return updateObject(state, {
    customer: action.customer,
    error: null,
    loading: false
  });
};

const getCustomerDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function customers(state = initialState, action){
    switch(action.type){
        case GET_ACCOUNTING_ADJUSTMENTS_START:
            return getCustomerListStart(state, action);
        case GET_ACCOUNTING_ADJUSTMENTS_SUCCESS:
            return getCustomerListSuccess(state, action);
        case GET_ACCOUNTING_ADJUSTMENTS_FAIL:
            return getCustomerListFail(state, action);
        case CREATE_ACCOUNTING_ADJUSTMENT_START:
            return createCustomerStart(state, action);
        case CREATE_ACCOUNTING_ADJUSTMENT_SUCCESS:
            return createCustomerSuccess(state, action);
        case CREATE_ACCOUNTING_ADJUSTMENT_FAIL:
            return createCustomerFail(state, action);
        case GET_ACCOUNTING_ADJUSTMENT_START:
        return getCustomerDetailStart(state, action);
        case GET_ACCOUNTING_ADJUSTMENT_SUCCESS:
            return getCustomerDetailSuccess(state, action);
        case GET_ACCOUNTING_ADJUSTMENT_FAIL:
            return getCustomerDetailFail(state, action);
        case EDIT_ACCOUNTING_ADJUSTMENT:
            const arrayList = state.customers;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                customers: arrayList,
            };
        default:
            return state;
    }
}


import {
    GET_ACTIVE_CUSTOMERS_START,
    GET_ACTIVE_CUSTOMERS_SUCCESS,
    GET_ACTIVE_CUSTOMERS_FAIL,
    CREATE_ACTIVE_CUSTOMER_START,
    CREATE_ACTIVE_CUSTOMER_SUCCESS,
    CREATE_ACTIVE_CUSTOMER_FAIL,
    GET_ACTIVE_CUSTOMER_START,
    GET_ACTIVE_CUSTOMER_SUCCESS,
    GET_ACTIVE_CUSTOMER_FAIL,
    EDIT_ACTIVE_CUSTOMER
    } from '../types/activecustomerTypes';
import { updateObject } from "../utility";

const initialState = {
    activecustomers: [],
    activecustomer: {},
    loading: false,
    error: null,
}

const getActiveCustomerListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getActiveCustomerListSuccess = (state, action) => {
  return updateObject(state, {
    activecustomers: action.activecustomers,
    error: null,
    loading: false
  });
};

const getActiveCustomerListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createActiveCustomerStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createActiveCustomerSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createActiveCustomerFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getActiveCustomerDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getActiveCustomerDetailSuccess = (state, action) => {
  return updateObject(state, {
    activecustomer: action.activecustomer,
    error: null,
    loading: false
  });
};

const getActiveCustomerDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function activecustomers(state = initialState, action){
    switch(action.type){
        case GET_ACTIVE_CUSTOMERS_START:
            return getActiveCustomerListStart(state, action);
        case GET_ACTIVE_CUSTOMERS_SUCCESS:
            return getActiveCustomerListSuccess(state, action);
        case GET_ACTIVE_CUSTOMERS_FAIL:
            return getActiveCustomerListFail(state, action);
        case CREATE_ACTIVE_CUSTOMER_START:
            return createActiveCustomerStart(state, action);
        case CREATE_ACTIVE_CUSTOMER_SUCCESS:
            return createActiveCustomerSuccess(state, action);
        case CREATE_ACTIVE_CUSTOMER_FAIL:
            return createActiveCustomerFail(state, action);
        case GET_ACTIVE_CUSTOMER_START:
        return getActiveCustomerDetailStart(state, action);
        case GET_ACTIVE_CUSTOMER_SUCCESS:
            return getActiveCustomerDetailSuccess(state, action);
        case GET_ACTIVE_CUSTOMER_FAIL:
            return getActiveCustomerDetailFail(state, action);
        case EDIT_ACTIVE_CUSTOMER:
            const arrayList = state.activecustomers;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                activecustomers: arrayList,
            };
        default:
            return state;
    }
}

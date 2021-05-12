import {
    GET_DEACTIVATED_CUSTOMERS_START,
    GET_DEACTIVATED_CUSTOMERS_SUCCESS,
    GET_DEACTIVATED_CUSTOMERS_FAIL
} from '../types/deactivatedcustomerTypes';
import { updateObject } from "../utility";

const initialState = {
    deactivatedcustomers: [],
    loading: false,
    error: null,
}

const getDeactivatedCustomerListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getDeactivatedCustomerListSuccess = (state, action) => {
  return updateObject(state, {
    deactivatedcustomers: action.deactivatedcustomers,
    error: null,
    loading: false
  });
};

const getDeactivatedCustomerListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function deactivatedcustomers(state = initialState, action){
    switch(action.type){
        case GET_DEACTIVATED_CUSTOMERS_START:
            return getDeactivatedCustomerListStart(state, action);
        case GET_DEACTIVATED_CUSTOMERS_SUCCESS:
            return getDeactivatedCustomerListSuccess(state, action);
        case GET_DEACTIVATED_CUSTOMERS_FAIL:
            return getDeactivatedCustomerListFail(state, action);
        default:
            return state;
    }
}


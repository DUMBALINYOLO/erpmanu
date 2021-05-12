import {
    GET_CUSTOMER_ADDRESSES_START,
    GET_CUSTOMER_ADDRESSES_SUCCESS,
    GET_CUSTOMER_ADDRESSES_FAIL,
    CREATE_CUSTOMER_ADDRESS_START,
    CREATE_CUSTOMER_ADDRESS_SUCCESS,
    CREATE_CUSTOMER_ADDRESS_FAIL,
    GET_CUSTOMER_ADDRESS_START,
    GET_CUSTOMER_ADDRESS_SUCCESS,
    GET_CUSTOMER_ADDRESS_FAIL,
    EDIT_CUSTOMER_ADDRESS
} from '../types/customeraddressTypes';
import { updateObject } from "../utility";

const initialState = {
    customeraddresses: [],
    customeraddress: {},
    loading: false,
    error: null,
}

const getCustomerAddressListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getCustomerAddressListSuccess = (state, action) => {
  return updateObject(state, {
    customeraddresses: action.customeraddresses,
    error: null,
    loading: false
  });
};

const getCustomerAddressListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createCustomerAddressStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createCustomerAddressSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createCustomerAddressFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getCustomerAddressDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getCustomerAddressDetailSuccess = (state, action) => {
  return updateObject(state, {
    customeraddress: action.customeraddress,
    error: null,
    loading: false
  });
};

const getCustomerAddressDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function customeraddresses(state = initialState, action){
    switch(action.type){
        case GET_CUSTOMER_ADDRESSES_START:
            return getCustomerAddressListStart(state, action);
        case GET_CUSTOMER_ADDRESSES_SUCCESS:
            return getCustomerAddressListSuccess(state, action);
        case GET_CUSTOMER_ADDRESSES_FAIL:
            return getCustomerAddressListFail(state, action);
        case CREATE_CUSTOMER_ADDRESS_START:
            return createCustomerAddressStart(state, action);
        case CREATE_CUSTOMER_ADDRESS_SUCCESS:
            return createCustomerAddressSuccess(state, action);
        case CREATE_CUSTOMER_ADDRESS_FAIL:
            return createCustomerAddressFail(state, action);
        case GET_CUSTOMER_ADDRESS_START:
        return getCustomerAddressDetailStart(state, action);
        case GET_CUSTOMER_ADDRESS_SUCCESS:
            return getCustomerAddressDetailSuccess(state, action);
        case GET_CUSTOMER_ADDRESS_FAIL:
            return getCustomerAddressDetailFail(state, action);
        case EDIT_CUSTOMER_ADDRESS:
            const arrayList = state.customeraddresses;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                customeraddresses: arrayList,
            };
        default:
            return state;
    }
}

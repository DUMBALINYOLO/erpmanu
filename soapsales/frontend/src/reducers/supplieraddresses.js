import {
    GET_SUPPLIER_ADDRESSES_START,
    GET_SUPPLIER_ADDRESSES_SUCCESS,
    GET_SUPPLIER_ADDRESSES_FAIL,
    GET_SUPPLIER_ADDRESS_START,
    GET_SUPPLIER_ADDRESS_SUCCESS,
    GET_SUPPLIER_ADDRESS_FAIL,
    CREATE_SUPPLIER_ADDRESS_START,
    CREATE_SUPPLIER_ADDRESS_SUCCESS,
    CREATE_SUPPLIER_ADDRESS_FAIL,
    EDIT_SUPPLIER_ADDRESS
} from '../types/supplieraddressTypes';
import { updateObject } from "../utility";

const initialState = {
    supplieraddresses: [],
    supplieraddress: {},
    loading: false,
    error: null,
}

const getSupplierAddressListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getSupplierAddressListSuccess = (state, action) => {
  return updateObject(state, {
    supplieraddresses: action.supplieraddresses,
    error: null,
    loading: false
  });
};

const getSupplierAddressListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createSupplierAddressStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createSupplierAddressSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createSupplierAddressFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getSupplierAddressDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getSupplierAddressDetailSuccess = (state, action) => {
  return updateObject(state, {
    supplieraddress: action.supplieraddress,
    error: null,
    loading: false
  });
};

const getSupplierAddressDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function supplieraddresses(state = initialState, action){
    switch(action.type){
        case GET_SUPPLIER_ADDRESSES_START:
            return getSupplierAddressListStart(state, action);
        case GET_SUPPLIER_ADDRESSES_SUCCESS:
            return getSupplierAddressListSuccess(state, action);
        case GET_SUPPLIER_ADDRESSES_FAIL:
            return getSupplierAddressListFail(state, action);
        case GET_SUPPLIER_ADDRESS_START:
            return getSupplierAddressDetailStart(state, action);
        case GET_SUPPLIER_ADDRESS_SUCCESS:
            return getSupplierAddressDetailSuccess(state, action);
        case GET_SUPPLIER_ADDRESS_FAIL:
            return getSupplierAddressDetailFail(state, action);
        case CREATE_SUPPLIER_ADDRESS_START:
            return createSupplierAddressStart(state, action);
        case CREATE_SUPPLIER_ADDRESS_SUCCESS:
            return createSupplierAddressSuccess(state, action);
        case CREATE_SUPPLIER_ADDRESS_FAIL:
            return createSupplierAddressFail(state, action);
        case EDIT_SUPPLIER_ADDRESS:
            const arrayList = state.supplieraddresses;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                supplieraddresses: arrayList,
            };
        default:
            return state;
    }
}

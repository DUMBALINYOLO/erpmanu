import {
    GET_ACTIVE_SUPPLIERS_START,
    GET_ACTIVE_SUPPLIERS_SUCCESS,
    GET_ACTIVE_SUPPLIERS_FAIL,
    CREATE_ACTIVE_SUPPLIER_START,
    CREATE_ACTIVE_SUPPLIER_SUCCESS,
    CREATE_ACTIVE_SUPPLIER_FAIL,
    GET_ACTIVE_SUPPLIER_START,
    GET_ACTIVE_SUPPLIER_SUCCESS,
    GET_ACTIVE_SUPPLIER_FAIL,
    EDIT_ACTIVE_SUPPLIER
} from '../types/activesupplierTypes';
import { updateObject } from "../utility";

const initialState = {
    activesuppliers: [],
    activesupplier: {},
    loading: false,
    error: null,
}

const getActiveSupplierListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getActiveSupplierListSuccess = (state, action) => {
  return updateObject(state, {
    activesuppliers: action.activesuppliers,
    error: null,
    loading: false
  });
};

const getActiveSupplierListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createActiveSupplierStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createActiveSupplierSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createActiveSupplierFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getActiveSupplierDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getActiveSupplierDetailSuccess = (state, action) => {
  return updateObject(state, {
    activesupplier: action.activesupplier,
    error: null,
    loading: false
  });
};

const getActiveSupplierDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function activesuppliers(state = initialState, action){
    switch(action.type){
        case GET_ACTIVE_SUPPLIERS_START:
            return getActiveSupplierListStart(state, action);
        case GET_ACTIVE_SUPPLIERS_SUCCESS:
            return getActiveSupplierListSuccess(state, action);
        case GET_ACTIVE_SUPPLIERS_FAIL:
            return getActiveSupplierListFail(state, action);
        case CREATE_ACTIVE_SUPPLIER_START:
            return createActiveSupplierStart(state, action);
        case CREATE_ACTIVE_SUPPLIER_SUCCESS:
            return createActiveSupplierSuccess(state, action);
        case CREATE_ACTIVE_SUPPLIER_FAIL:
            return createActiveSupplierFail(state, action);
        case GET_ACTIVE_SUPPLIER_START:
        return getActiveSupplierDetailStart(state, action);
        case GET_ACTIVE_SUPPLIER_SUCCESS:
            return getActiveSupplierDetailSuccess(state, action);
        case GET_ACTIVE_SUPPLIER_FAIL:
            return getActiveSupplierDetailFail(state, action);
        case EDIT_ACTIVE_SUPPLIER:
            const arrayList = state.activesuppliers;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                activesuppliers: arrayList,
            };
        default:
            return state;
    }
}

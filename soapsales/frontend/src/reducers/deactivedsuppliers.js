import {
    GET_DEACTIVED_SUPPLIERS_START,
    GET_DEACTIVED_SUPPLIERS_SUCCESS,
    GET_DEACTIVED_SUPPLIERS_FAIL
} from '../types/deactivedsupplierTypes';
import { updateObject } from "../utility";

const initialState = {
    deactivedsuppliers: [],
    loading: false,
    error: null,
}

const getDeactivedSupplierListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getDeactivedSupplierListSuccess = (state, action) => {
  return updateObject(state, {
    deactivedsuppliers: action.deactivedsuppliers,
    error: null,
    loading: false
  });
};

const getDeactivedSupplierListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function deactivedsuppliers(state = initialState, action){
    switch(action.type){
        case GET_DEACTIVED_SUPPLIERS_START:
            return getDeactivedSupplierListStart(state, action);
        case GET_DEACTIVED_SUPPLIERS_SUCCESS:
            return getDeactivedSupplierListSuccess(state, action);
        case GET_DEACTIVED_SUPPLIERS_FAIL:
            return getDeactivedSupplierListFail(state, action);
        default:
            return state;
    }
}
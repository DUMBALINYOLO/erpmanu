import {
    GET_TAXES_START,
    GET_TAXES_SUCCESS,
    GET_TAXES_FAIL,
    CREATE_TAX_START,
    CREATE_TAX_SUCCESS,
    CREATE_TAX_FAIL,
    EDIT_TAX
    } from '../types/taxTypes';
import { updateObject } from "../utility";

const initialState = {
    taxes: [],
    loading: false,
    error: null,
}

const getTaxListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getTaxListSuccess = (state, action) => {
  return updateObject(state, {
    taxes: action.taxes,
    error: null,
    loading: false
  });
};

const getTaxListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createTaxStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createTaxSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createTaxFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function taxes(state = initialState, action){
    switch(action.type){
        case GET_TAXES_START:
            return getTaxListStart(state, action);
        case GET_TAXES_SUCCESS:
            return getTaxListSuccess(state, action);
        case GET_TAXES_FAIL:
            return getTaxListFail(state, action);
        case CREATE_TAX_START:
            return createTaxStart(state, action);
        case CREATE_TAX_SUCCESS:
            return createTaxSuccess(state, action);
        case CREATE_TAX_FAIL:
            return createTaxFail(state, action);
        case EDIT_TAX:
            const arrayList = state.taxes;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                taxes: arrayList,
            };
        default:
            return state;
    }
}

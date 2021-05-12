import {
    GET_COMPANY_SALESREPS_START,
    GET_COMPANY_SALESREPS_SUCCESS,
    GET_COMPANY_SALESREPS_FAIL,
    CREATE_COMPANY_SALESREP_START,
    CREATE_COMPANY_SALESREP_SUCCESS,
    CREATE_COMPANY_SALESREP_FAIL,
    GET_COMPANY_SALESREP_START,
    GET_COMPANY_SALESREP_SUCCESS,
    GET_COMPANY_SALESREP_FAIL,
    EDIT_COMPANY_SALESREP
    } from '../types/companysalesrepTypes';
import { updateObject } from "../utility";

const initialState = {
    companysalesreps: [],
    companysalesrep: {},
    loading: false,
    error: null,
}

const getCompanySalesrepListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getCompanySalesrepListSuccess = (state, action) => {
  return updateObject(state, {
    companysalesreps: action.companysalesreps,
    error: null,
    loading: false
  });
};

const getCompanySalesrepListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createCompanySalesrepStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createCompanySalesrepSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createCompanySalesrepFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getCompanySalesrepDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getCompanySalesrepDetailSuccess = (state, action) => {
  return updateObject(state, {
    companysalesrep: action.companysalesrep,
    error: null,
    loading: false
  });
};

const getCompanySalesrepDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function companysalesreps(state = initialState, action){
    switch(action.type){
        case GET_COMPANY_SALESREPS_START:
            return getCompanySalesrepListStart(state, action);
        case GET_COMPANY_SALESREPS_SUCCESS:
            return getCompanySalesrepListSuccess(state, action);
        case GET_COMPANY_SALESREPS_FAIL:
            return getCompanySalesrepListFail(state, action);
        case CREATE_COMPANY_SALESREP_START:
            return createCompanySalesrepStart(state, action);
        case CREATE_COMPANY_SALESREP_SUCCESS:
            return createCompanySalesrepSuccess(state, action);
        case CREATE_COMPANY_SALESREP_FAIL:
            return createCompanySalesrepFail(state, action);
        case GET_COMPANY_SALESREP_START:
        return getCompanySalesrepDetailStart(state, action);
        case GET_COMPANY_SALESREP_SUCCESS:
            return getCompanySalesrepDetailSuccess(state, action);
        case GET_COMPANY_SALESREP_FAIL:
            return getCompanySalesrepDetailFail(state, action);
        case EDIT_COMPANY_SALESREP:
            const arrayList = state.companysalesreps;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                companysalesreps: arrayList,
            };
        default:
            return state;
    }
}

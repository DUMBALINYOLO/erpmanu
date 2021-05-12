import {
    GET_COMPANY_MANAGERS_START,
    GET_COMPANY_MANAGERS_SUCCESS,
    GET_COMPANY_MANAGERS_FAIL,
    CREATE_COMPANY_MANAGER_START,
    CREATE_COMPANY_MANAGER_SUCCESS,
    CREATE_COMPANY_MANAGER_FAIL,
    GET_COMPANY_MANAGER_START,
    GET_COMPANY_MANAGER_SUCCESS,
    GET_COMPANY_MANAGER_FAIL,
    EDIT_COMPANY_MANAGER
    } from '../types/companymanagerTypes';
import { updateObject } from "../utility";

const initialState = {
    companymanagers: [],
    companymanager: {},
    loading: false,
    error: null,
}

const getCompanyManagerListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getCompanyManagerListSuccess = (state, action) => {
  return updateObject(state, {
    companymanagers: action.companymanagers,
    error: null,
    loading: false
  });
};

const getCompanyManagerListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createCompanyManagerStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createCompanyManagerSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createCompanyManagerFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getCompanyManagerDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getCompanyManagerDetailSuccess = (state, action) => {
  return updateObject(state, {
    companymanager: action.companymanager,
    error: null,
    loading: false
  });
};

const getCompanyManagerDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function companymanagers(state = initialState, action){
    switch(action.type){
        case GET_COMPANY_MANAGERS_START:
            return getCompanyManagerListStart(state, action);
        case GET_COMPANY_MANAGERS_SUCCESS:
            return getCompanyManagerListSuccess(state, action);
        case GET_COMPANY_MANAGERS_FAIL:
            return getCompanyManagerListFail(state, action);
        case CREATE_COMPANY_MANAGER_START:
            return createCompanyManagerStart(state, action);
        case CREATE_COMPANY_MANAGER_SUCCESS:
            return createCompanyManagerSuccess(state, action);
        case CREATE_COMPANY_MANAGER_FAIL:
            return createCompanyManagerFail(state, action);
        case GET_COMPANY_MANAGER_START:
        return getCompanyManagerDetailStart(state, action);
        case GET_COMPANY_MANAGER_SUCCESS:
            return getCompanyManagerDetailSuccess(state, action);
        case GET_COMPANY_MANAGER_FAIL:
            return getCompanyManagerDetailFail(state, action);
        case EDIT_COMPANY_MANAGER:
            const arrayList = state.companymanagers;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                companymanagers: arrayList,
            };
        default:
            return state;
    }
}

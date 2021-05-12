import {
    GET_COMPANY_DRIVERS_START,
    GET_COMPANY_DRIVERS_SUCCESS,
    GET_COMPANY_DRIVERS_FAIL,
    CREATE_COMPANY_DRIVER_START,
    CREATE_COMPANY_DRIVER_SUCCESS,
    CREATE_COMPANY_DRIVER_FAIL,
    GET_COMPANY_DRIVER_START,
    GET_COMPANY_DRIVER_SUCCESS,
    GET_COMPANY_DRIVER_FAIL,
    EDIT_COMPANY_DRIVER
    } from '../types/companydriverTypes';
import { updateObject } from "../utility";

const initialState = {
    companydrivers: [],
    companydriver: {},
    loading: false,
    error: null,
}

const getCompanyDriverListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getCompanyDriverListSuccess = (state, action) => {
  return updateObject(state, {
    companydrivers: action.companydrivers,
    error: null,
    loading: false
  });
};

const getCompanyDriverListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createCompanyDriverStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createCompanyDriverSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createCompanyDriverFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getCompanyDriverDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getCompanyDriverDetailSuccess = (state, action) => {
  return updateObject(state, {
    companydriver: action.companydriver,
    error: null,
    loading: false
  });
};

const getCompanyDriverDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function companydrivers(state = initialState, action){
    switch(action.type){
        case GET_COMPANY_DRIVERS_START:
            return getCompanyDriverListStart(state, action);
        case GET_COMPANY_DRIVERS_SUCCESS:
            return getCompanyDriverListSuccess(state, action);
        case GET_COMPANY_DRIVERS_FAIL:
            return getCompanyDriverListFail(state, action);
        case CREATE_COMPANY_DRIVER_START:
            return createCompanyDriverStart(state, action);
        case CREATE_COMPANY_DRIVER_SUCCESS:
            return createCompanyDriverSuccess(state, action);
        case CREATE_COMPANY_DRIVER_FAIL:
            return createCompanyDriverFail(state, action);
        case GET_COMPANY_DRIVER_START:
        return getCompanyDriverDetailStart(state, action);
        case GET_COMPANY_DRIVER_SUCCESS:
            return getCompanyDriverDetailSuccess(state, action);
        case GET_COMPANY_DRIVER_FAIL:
            return getCompanyDriverDetailFail(state, action);
        case EDIT_COMPANY_DRIVER:
            const arrayList = state.companydrivers;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                companydrivers: arrayList,
            };
        default:
            return state;
    }
}

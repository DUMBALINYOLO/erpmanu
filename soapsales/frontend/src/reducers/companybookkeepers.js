import {
    GET_COMPANY_BOOKKEEPERS_START,
    GET_COMPANY_BOOKKEEPERS_SUCCESS,
    GET_COMPANY_BOOKKEEPERS_FAIL,
    CREATE_COMPANY_BOOKKEEPER_START,
    CREATE_COMPANY_BOOKKEEPER_SUCCESS,
    CREATE_COMPANY_BOOKKEEPER_FAIL,
    GET_COMPANY_BOOKKEEPER_START,
    GET_COMPANY_BOOKKEEPER_SUCCESS,
    GET_COMPANY_BOOKKEEPER_FAIL,
    EDIT_COMPANY_BOOKKEEPER
    } from '../types/companybookkeeperTypes';
import { updateObject } from "../utility";

const initialState = {
    companybookkeepers: [],
    companybookkeeper: {},
    loading: false,
    error: null,
}

const getCompanyBookkeeperListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getCompanyBookkeeperListSuccess = (state, action) => {
  return updateObject(state, {
    companybookkeepers: action.companybookkeepers,
    error: null,
    loading: false
  });
};

const getCompanyBookkeeperListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createCompanyBookkeeperStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createCompanyBookkeeperSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createCompanyBookkeeperFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getCompanyBookkeeperDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getCompanyBookkeeperDetailSuccess = (state, action) => {
  return updateObject(state, {
    companybookkeeper: action.companybookkeeper,
    error: null,
    loading: false
  });
};

const getCompanyBookkeeperDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function companybookkeepers(state = initialState, action){
    switch(action.type){
        case GET_COMPANY_BOOKKEEPERS_START:
            return getCompanyBookkeeperListStart(state, action);
        case GET_COMPANY_BOOKKEEPERS_SUCCESS:
            return getCompanyBookkeeperListSuccess(state, action);
        case GET_COMPANY_BOOKKEEPERS_FAIL:
            return getCompanyBookkeeperListFail(state, action);
        case CREATE_COMPANY_BOOKKEEPER_START:
            return createCompanyBookkeeperStart(state, action);
        case CREATE_COMPANY_BOOKKEEPER_SUCCESS:
            return createCompanyBookkeeperSuccess(state, action);
        case CREATE_COMPANY_BOOKKEEPER_FAIL:
            return createCompanyBookkeeperFail(state, action);
        case GET_COMPANY_BOOKKEEPER_START:
        return getCompanyBookkeeperDetailStart(state, action);
        case GET_COMPANY_BOOKKEEPER_SUCCESS:
            return getCompanyBookkeeperDetailSuccess(state, action);
        case GET_COMPANY_BOOKKEEPER_FAIL:
            return getCompanyBookkeeperDetailFail(state, action);
        case EDIT_COMPANY_BOOKKEEPER:
            const arrayList = state.companybookkeepers;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                companybookkeepers: arrayList,
            };
        default:
            return state;
    }
}

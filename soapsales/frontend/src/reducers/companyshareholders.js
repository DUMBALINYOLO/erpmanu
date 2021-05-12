import {
    GET_COMPANY_SHAREHOLDERS_START,
    GET_COMPANY_SHAREHOLDERS_SUCCESS,
    GET_COMPANY_SHAREHOLDERS_FAIL,
    CREATE_COMPANY_SHAREHOLDER_START,
    CREATE_COMPANY_SHAREHOLDER_SUCCESS,
    CREATE_COMPANY_SHAREHOLDER_FAIL,
    GET_COMPANY_SHAREHOLDER_START,
    GET_COMPANY_SHAREHOLDER_SUCCESS,
    GET_COMPANY_SHAREHOLDER_FAIL,
    EDIT_COMPANY_SHAREHOLDER
    } from '../types/companyshareholderTypes';
import { updateObject } from "../utility";

const initialState = {
    companyshareholders: [],
    companyshareholder: {},
    loading: false,
    error: null,
}

const getCompanyShareholderListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getCompanyShareholderListSuccess = (state, action) => {
  return updateObject(state, {
    companyshareholders: action.companyshareholders,
    error: null,
    loading: false
  });
};

const getCompanyShareholderListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createCompanyShareholderStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createCompanyShareholderSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createCompanyShareholderFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getCompanyShareholderDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getCompanyShareholderDetailSuccess = (state, action) => {
  return updateObject(state, {
    companyshareholder: action.companyshareholder,
    error: null,
    loading: false
  });
};

const getCompanyShareholderDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function companyshareholders(state = initialState, action){
    switch(action.type){
        case GET_COMPANY_SHAREHOLDERS_START:
            return getCompanyShareholderListStart(state, action);
        case GET_COMPANY_SHAREHOLDERS_SUCCESS:
            return getCompanyShareholderListSuccess(state, action);
        case GET_COMPANY_SHAREHOLDERS_FAIL:
            return getCompanyShareholderListFail(state, action);
        case CREATE_COMPANY_SHAREHOLDER_START:
            return createCompanyShareholderStart(state, action);
        case CREATE_COMPANY_SHAREHOLDER_SUCCESS:
            return createCompanyShareholderSuccess(state, action);
        case CREATE_COMPANY_SHAREHOLDER_FAIL:
            return createCompanyShareholderFail(state, action);
        case GET_COMPANY_SHAREHOLDER_START:
        return getCompanyShareholderDetailStart(state, action);
        case GET_COMPANY_SHAREHOLDER_SUCCESS:
            return getCompanyShareholderDetailSuccess(state, action);
        case GET_COMPANY_SHAREHOLDER_FAIL:
            return getCompanyShareholderDetailFail(state, action);
        case EDIT_COMPANY_SHAREHOLDER:
            const arrayList = state.companyshareholders;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                companyshareholders: arrayList,
            };
        default:
            return state;
    }
}

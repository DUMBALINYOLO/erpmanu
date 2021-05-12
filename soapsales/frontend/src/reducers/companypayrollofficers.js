import {
    GET_COMPANY_PAYROLL_OFFICERS_START,
    GET_COMPANY_PAYROLL_OFFICERS_SUCCESS,
    GET_COMPANY_PAYROLL_OFFICERS_FAIL,
    CREATE_COMPANY_PAYROLL_OFFICER_START,
    CREATE_COMPANY_PAYROLL_OFFICER_SUCCESS,
    CREATE_COMPANY_PAYROLL_OFFICER_FAIL,
    GET_COMPANY_PAYROLL_OFFICER_START,
    GET_COMPANY_PAYROLL_OFFICER_SUCCESS,
    GET_COMPANY_PAYROLL_OFFICER_FAIL,
    EDIT_COMPANY_PAYROLL_OFFICER
    } from '../types/companypayrollofficerTypes';
import { updateObject } from "../utility";

const initialState = {
    companypayrollofficers: [],
    companypayrollofficer: {},
    loading: false,
    error: null,
}

const getCompanyPayrollOfficerListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getCompanyPayrollOfficerListSuccess = (state, action) => {
  return updateObject(state, {
    companypayrollofficers: action.companypayrollofficers,
    error: null,
    loading: false
  });
};

const getCompanyPayrollOfficerListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createCompanyPayrollOfficerStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createCompanyPayrollOfficerSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createCompanyPayrollOfficerFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getCompanyPayrollOfficerDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getCompanyPayrollOfficerDetailSuccess = (state, action) => {
  return updateObject(state, {
    companypayrollofficer: action.companypayrollofficer,
    error: null,
    loading: false
  });
};

const getCompanyPayrollOfficerDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function companypayrollofficers(state = initialState, action){
    switch(action.type){
        case GET_COMPANY_PAYROLL_OFFICERS_START:
            return getCompanyPayrollOfficerListStart(state, action);
        case GET_COMPANY_PAYROLL_OFFICERS_SUCCESS:
            return getCompanyPayrollOfficerListSuccess(state, action);
        case GET_COMPANY_PAYROLL_OFFICERS_FAIL:
            return getCompanyPayrollOfficerListFail(state, action);
        case CREATE_COMPANY_PAYROLL_OFFICER_START:
            return createCompanyPayrollOfficerStart(state, action);
        case CREATE_COMPANY_PAYROLL_OFFICER_SUCCESS:
            return createCompanyPayrollOfficerSuccess(state, action);
        case CREATE_COMPANY_PAYROLL_OFFICER_FAIL:
            return createCompanyPayrollOfficerFail(state, action);
        case GET_COMPANY_PAYROLL_OFFICER_START:
        return getCompanyPayrollOfficerDetailStart(state, action);
        case GET_COMPANY_PAYROLL_OFFICER_SUCCESS:
            return getCompanyPayrollOfficerDetailSuccess(state, action);
        case GET_COMPANY_PAYROLL_OFFICER_FAIL:
            return getCompanyPayrollOfficerDetailFail(state, action);
        case EDIT_COMPANY_PAYROLL_OFFICER:
            const arrayList = state.companypayrollofficers;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                companypayrollofficers: arrayList,
            };
        default:
            return state;
    }
}

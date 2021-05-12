import {
    GET_COMPANY_MANUFACTURING_PERSONELLS_START,
    GET_COMPANY_MANUFACTURING_PERSONELLS_SUCCESS,
    GET_COMPANY_MANUFACTURING_PERSONELLS_FAIL,
    CREATE_COMPANY_MANUFACTURING_PERSONELL_START,
    CREATE_COMPANY_MANUFACTURING_PERSONELL_SUCCESS,
    CREATE_COMPANY_MANUFACTURING_PERSONELL_FAIL,
    GET_COMPANY_MANUFACTURING_PERSONELL_START,
    GET_COMPANY_MANUFACTURING_PERSONELL_SUCCESS,
    GET_COMPANY_MANUFACTURING_PERSONELL_FAIL,
    EDIT_COMPANY_MANUFACTURING_PERSONELL
    } from '../types/companymanufacturingpersonellTypes';
import { updateObject } from "../utility";

const initialState = {
    companymanufacturingpersonells: [],
    companymanufacturingpersonell: {},
    loading: false,
    error: null,
}

const getCompanyManufacturingPersonellListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getCompanyManufacturingPersonellListSuccess = (state, action) => {
  return updateObject(state, {
    companymanufacturingpersonells: action.companymanufacturingpersonells,
    error: null,
    loading: false
  });
};

const getCompanyManufacturingPersonellListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createCompanyManufacturingPersonellStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createCompanyManufacturingPersonellSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createCompanyManufacturingPersonellFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getCompanyManufacturingPersonellDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getCompanyManufacturingPersonellDetailSuccess = (state, action) => {
  return updateObject(state, {
    companymanufacturingpersonell: action.companymanufacturingpersonell,
    error: null,
    loading: false
  });
};

const getCompanyManufacturingPersonellDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function companymanufacturingpersonells(state = initialState, action){
    switch(action.type){
        case GET_COMPANY_MANUFACTURING_PERSONELLS_START:
            return getCompanyManufacturingPersonellListStart(state, action);
        case GET_COMPANY_MANUFACTURING_PERSONELLS_SUCCESS:
            return getCompanyManufacturingPersonellListSuccess(state, action);
        case GET_COMPANY_MANUFACTURING_PERSONELLS_FAIL:
            return getCompanyManufacturingPersonellListFail(state, action);
        case CREATE_COMPANY_MANUFACTURING_PERSONELL_START:
            return createCompanyManufacturingPersonellStart(state, action);
        case CREATE_COMPANY_MANUFACTURING_PERSONELL_SUCCESS:
            return createCompanyManufacturingPersonellSuccess(state, action);
        case CREATE_COMPANY_MANUFACTURING_PERSONELL_FAIL:
            return createCompanyManufacturingPersonellFail(state, action);
        case GET_COMPANY_MANUFACTURING_PERSONELL_START:
        return getCompanyManufacturingPersonellDetailStart(state, action);
        case GET_COMPANY_MANUFACTURING_PERSONELL_SUCCESS:
            return getCompanyManufacturingPersonellDetailSuccess(state, action);
        case GET_COMPANY_MANUFACTURING_PERSONELL_FAIL:
            return getCompanyManufacturingPersonellDetailFail(state, action);
        case EDIT_COMPANY_MANUFACTURING_PERSONELL:
            const arrayList = state.companymanufacturingpersonells;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                companymanufacturingpersonells: arrayList,
            };
        default:
            return state;
    }
}

import { 
    GET_EMPLOYEE_PAYROLL_TAXES_START,
    GET_EMPLOYEE_PAYROLL_TAXES_SUCCESS,
    GET_EMPLOYEE_PAYROLL_TAXES_FAIL,
    CREATE_EMPLOYEE_PAYROLL_TAX_START,
    CREATE_EMPLOYEE_PAYROLL_TAX_SUCCESS,
    CREATE_EMPLOYEE_PAYROLL_TAX_FAIL,
    GET_EMPLOYEE_PAYROLL_TAX_START,
    GET_EMPLOYEE_PAYROLL_TAX_SUCCESS,
    GET_EMPLOYEE_PAYROLL_TAX_FAIL,
    EDIT_EMPLOYEE_PAYROLL_TAX
} from '../types/employeepayrolltaxeTypes';
import { updateObject } from "../utility";

const initialState = {
    employeepayrolltaxes: [],
    employeepayrolltax: {},
    loading: false,
    error: null,
}

const getEmployeePayrollTaxListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getEmployeePayrollTaxListSuccess = (state, action) => {
  return updateObject(state, {
    employeepayrolltaxes: action.employeepayrolltaxes,
    error: null,
    loading: false
  });
};

const getEmployeePayrollTaxListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createEmployeePayrollTaxStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createEmployeePayrollTaxSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createEmployeePayrollTaxFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getEmployeePayrollTaxDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getEmployeePayrollTaxDetailSuccess = (state, action) => {
  return updateObject(state, {
    employeepayrolltax: action.employeepayrolltax,
    error: null,
    loading: false
  });
};

const getEmployeePayrollTaxDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function employeepayrolltaxes(state = initialState, action){
    switch(action.type){
        case GET_EMPLOYEE_PAYROLL_TAXES_START:
            return getEmployeePayrollTaxListStart(state, action);
        case GET_EMPLOYEE_PAYROLL_TAXES_SUCCESS:
            return getEmployeePayrollTaxListSuccess(state, action);
        case GET_EMPLOYEE_PAYROLL_TAXES_FAIL:
            return getEmployeePayrollTaxListFail(state, action);
        case CREATE_EMPLOYEE_PAYROLL_TAX_START:
            return createEmployeePayrollTaxStart(state, action);
        case CREATE_EMPLOYEE_PAYROLL_TAX_SUCCESS:
            return createEmployeePayrollTaxSuccess(state, action);
        case CREATE_EMPLOYEE_PAYROLL_TAX_FAIL:
            return createEmployeePayrollTaxFail(state, action);
        case GET_EMPLOYEE_PAYROLL_TAX_START:
        return getEmployeePayrollTaxDetailStart(state, action);
        case GET_EMPLOYEE_PAYROLL_TAX_SUCCESS:
            return getEmployeePayrollTaxDetailSuccess(state, action);
        case GET_EMPLOYEE_PAYROLL_TAX_FAIL:
            return getEmployeePayrollTaxDetailFail(state, action);
        case EDIT_EMPLOYEE_PAYROLL_TAX:
            const arrayList = state.employeepayrolltaxes;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                employeepayrolltaxes: arrayList,
            };
        default:
            return state;
    }
}

import { 
    GET_EMPLOYEE_PAYROLL_DATES_START,
    GET_EMPLOYEE_PAYROLL_DATES_SUCCESS,
    GET_EMPLOYEE_PAYROLL_DATES_FAIL,
    CREATE_EMPLOYEE_PAYROLL_DATE_START,
    CREATE_EMPLOYEE_PAYROLL_DATE_SUCCESS,
    CREATE_EMPLOYEE_PAYROLL_DATE_FAIL,
    GET_EMPLOYEE_PAYROLL_DATE_START,
    GET_EMPLOYEE_PAYROLL_DATE_SUCCESS,
    GET_EMPLOYEE_PAYROLL_DATE_FAIL,
    EDIT_EMPLOYEE_PAYROLL_DATE
} from '../types/employeepayrolldateTypes';
import { updateObject } from "../utility";

const initialState = {
    employeepayrolldates: [],
    employeepayrolldate: {},
    loading: false,
    error: null,
}

const getEmployeePayrollDateListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getEmployeePayrollDateListSuccess = (state, action) => {
  return updateObject(state, {
    employeepayrolldates: action.employeepayrolldates,
    error: null,
    loading: false
  });
};

const getEmployeePayrollDateListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createEmployeePayrollDateStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createEmployeePayrollDateSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createEmployeePayrollDateFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getEmployeePayrollDateDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getEmployeePayrollDateDetailSuccess = (state, action) => {
  return updateObject(state, {
    employeepayrolldate: action.employeepayrolldate,
    error: null,
    loading: false
  });
};

const getEmployeePayrollDateDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function employeepayrolldates(state = initialState, action){
    switch(action.type){
        case GET_EMPLOYEE_PAYROLL_DATES_START:
            return getEmployeePayrollDateListStart(state, action);
        case GET_EMPLOYEE_PAYROLL_DATES_SUCCESS:
            return getEmployeePayrollDateListSuccess(state, action);
        case GET_EMPLOYEE_PAYROLL_DATES_FAIL:
            return getEmployeePayrollDateListFail(state, action);
        case CREATE_EMPLOYEE_PAYROLL_DATE_START:
            return createEmployeePayrollDateStart(state, action);
        case CREATE_EMPLOYEE_PAYROLL_DATE_SUCCESS:
            return createEmployeePayrollDateSuccess(state, action);
        case CREATE_EMPLOYEE_PAYROLL_DATE_FAIL:
            return createEmployeePayrollDateFail(state, action);
        case GET_EMPLOYEE_PAYROLL_DATE_START:
        return getEmployeePayrollDateDetailStart(state, action);
        case GET_EMPLOYEE_PAYROLL_DATE_SUCCESS:
            return getEmployeePayrollDateDetailSuccess(state, action);
        case GET_EMPLOYEE_PAYROLL_DATE_FAIL:
            return getEmployeePayrollDateDetailFail(state, action);
        case EDIT_EMPLOYEE_PAYROLL_DATE:
            const arrayList = state.employeepayrolldates;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                employeepayrolldates: arrayList,
            };
        default:
            return state;
    }
}

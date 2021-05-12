import { 
    GET_EMPLOYEE_PAY_DEDUCTIONS_START,
    GET_EMPLOYEE_PAY_DEDUCTIONS_SUCCESS,
    GET_EMPLOYEE_PAY_DEDUCTIONS_FAIL,
    CREATE_EMPLOYEE_PAY_DEDUCTION_START,
    CREATE_EMPLOYEE_PAY_DEDUCTION_SUCCESS,
    CREATE_EMPLOYEE_PAY_DEDUCTION_FAIL,
    GET_EMPLOYEE_PAY_DEDUCTION_START,
    GET_EMPLOYEE_PAY_DEDUCTION_SUCCESS,
    GET_EMPLOYEE_PAY_DEDUCTION_FAIL,
    EDIT_EMPLOYEE_PAY_DEDUCTION
} from '../types/employeepaydeductionTypes';
import { updateObject } from "../utility";

const initialState = {
    employeepaydeductions: [],
    employeepaydeduction: {},
    loading: false,
    error: null,
}

const getEmployeePayDeductionListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getEmployeePayDeductionListSuccess = (state, action) => {
  return updateObject(state, {
    employeepaydeductions: action.employeepaydeductions,
    error: null,
    loading: false
  });
};

const getEmployeePayDeductionListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createEmployeePayDeductionStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createEmployeePayDeductionSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createEmployeePayDeductionFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getEmployeePayDeductionDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getEmployeePayDeductionDetailSuccess = (state, action) => {
  return updateObject(state, {
    employeepaydeduction: action.employeepaydeduction,
    error: null,
    loading: false
  });
};

const getEmployeePayDeductionDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function employeepaydeductions(state = initialState, action){
    switch(action.type){
        case GET_EMPLOYEE_PAY_DEDUCTIONS_START:
            return getEmployeePayDeductionListStart(state, action);
        case GET_EMPLOYEE_PAY_DEDUCTIONS_SUCCESS:
            return getEmployeePayDeductionListSuccess(state, action);
        case GET_EMPLOYEE_PAY_DEDUCTIONS_FAIL:
            return getEmployeePayDeductionListFail(state, action);
        case CREATE_EMPLOYEE_PAY_DEDUCTION_START:
            return createEmployeePayDeductionStart(state, action);
        case CREATE_EMPLOYEE_PAY_DEDUCTION_SUCCESS:
            return createEmployeePayDeductionSuccess(state, action);
        case CREATE_EMPLOYEE_PAY_DEDUCTION_FAIL:
            return createEmployeePayDeductionFail(state, action);
        case GET_EMPLOYEE_PAY_DEDUCTION_START:
        return getEmployeePayDeductionDetailStart(state, action);
        case GET_EMPLOYEE_PAY_DEDUCTION_SUCCESS:
            return getEmployeePayDeductionDetailSuccess(state, action);
        case GET_EMPLOYEE_PAY_DEDUCTION_FAIL:
            return getEmployeePayDeductionDetailFail(state, action);
        case EDIT_EMPLOYEE_PAY_DEDUCTION:
            const arrayList = state.employeepaydeductions;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                employeepaydeductions: arrayList,
            };
        default:
            return state;
    }
}

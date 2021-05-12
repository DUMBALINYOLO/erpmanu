import { 
    GET_EMPLOYEE_PAYSLIPS_START,
    GET_EMPLOYEE_PAYSLIPS_SUCCESS,
    GET_EMPLOYEE_PAYSLIPS_FAIL,
    CREATE_EMPLOYEE_PAYSLIP_START,
    CREATE_EMPLOYEE_PAYSLIP_SUCCESS,
    CREATE_EMPLOYEE_PAYSLIP_FAIL,
    GET_EMPLOYEE_PAYSLIP_START,
    GET_EMPLOYEE_PAYSLIP_SUCCESS,
    GET_EMPLOYEE_PAYSLIP_FAIL
} from '../types/employeepayslipTypes';
import { updateObject } from "../utility";

const initialState = {
    employeepayslips: [],
    employeepayslip:{},
    loading: false,
    error: null,
}

const getEmployeePayslipListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getEmployeePayslipListSuccess = (state, action) => {
  return updateObject(state, {
    employeepayslips: action.employeepayslips,,
    error: null,
    loading: false
  });
};

const getEmployeePayslipListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createEmployeePayslipStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createEmployeePayslipSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createEmployeePayslipFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getEmployeePayslipDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getEmployeePayslipDetailSuccess = (state, action) => {
  return updateObject(state, {
    employeepayslip: action.employeepayslip,
    error: null,
    loading: false
  });
};

const getEmployeePayslipDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function employeepayslips: [],
    employeepayslip:(state = initialState, action){
    switch(action.type){
        case GET_EMPLOYEE_PAYSLIPS_START:
            return getEmployeePayslipListStart(state, action);
        case GET_EMPLOYEE_PAYSLIPS_SUCCESS:
            return getEmployeePayslipListSuccess(state, action);
        case GET_EMPLOYEE_PAYSLIPS_FAIL:
            return getEmployeePayslipListFail(state, action);
        case CREATE_EMPLOYEE_PAYSLIP_START:
            return createEmployeePayslipStart(state, action);
        case CREATE_EMPLOYEE_PAYSLIP_SUCCESS:
            return createEmployeePayslipSuccess(state, action);
        case CREATE_EMPLOYEE_PAYSLIP_FAIL:
            return createEmployeePayslipFail(state, action);
        case GET_EMPLOYEE_PAYSLIP_START:
        return getEmployeePayslipDetailStart(state, action);
        case GET_EMPLOYEE_PAYSLIP_SUCCESS:
            return getEmployeePayslipDetailSuccess(state, action);
        case GET_EMPLOYEE_PAYSLIP_FAIL:
            return getEmployeePayslipDetailFail(state, action);
        default:
            return state;
    }
}

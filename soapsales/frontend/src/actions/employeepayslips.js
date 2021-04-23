import axios from 'axios';
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
import { employeepayslipsURL } from '../constants';

//employee payslips
const getEmployeePayslipListStart = () => {
  return {
    type: GET_EMPLOYEE_PAYSLIPS_START
  };
};

const getEmployeePayslipListSuccess = employeepayslips => {
  return {
    type: GET_EMPLOYEE_PAYSLIPS_SUCCESS,
    employeepayslips
  };
};

const getEmployeePayslipListFail = error => {
  return {
    type: GET_EMPLOYEE_PAYSLIPS_FAIL,
    error: error
  };
};

const createEmployeePayslipStart = () => {
  return {
    type: CREATE_EMPLOYEE_PAYSLIP_START
  };
};


const createEmployeePayslipSuccess = employeepayslip => {
  return {
    type: CREATE_EMPLOYEE_PAYSLIP_SUCCESS,
    employeepayslip
  };
};

const createEmployeePayslipFail = error => {
  return {
    type: CREATE_EMPLOYEE_PAYSLIP_FAIL,
    error: error
  };
};

const getEmployeePayslipDetailStart = () => {
  return {
    type: GET_EMPLOYEE_PAYSLIP_START
  };
};

const getEmployeePayslipDetailSuccess = employeepayslip => {
  return {
    type: GET_EMPLOYEE_PAYSLIP_SUCCESS,
    employeepayslip
  };
};

const getEmployeePayslipDetailFail = error => {
  return {
    type: GET_EMPLOYEE_PAYSLIP_FAIL,
    error: error
  };
};

export const getEmployeePayslips = (token) => {
  return dispatch => {
      dispatch(getEmployeePayslipListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(employeepayslipsURL, headers)
        .then(res => {
          const employeepayslips = res.data;
          dispatch(getEmployeePayslipListSuccess(employeepayslips));
          })
        .catch(err => {
          dispatch(getEmployeePayslipListStart(err));
        });
    };
};

export const getEmployeePayslip = (id, token) => {
  return dispatch => {
      dispatch(getEmployeePayslipDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${employeepayslipsURL}${id}`, headers)
        .then(res => {
          const employeepayslip = res.data;
          dispatch(getEmployeePayslipDetailSuccess(employeepayslip));
          })
        .catch(err => {
          dispatch(getEmployeePayslipDetailFail(err));
        });
    };
};

export const addEmployeePayslip = (employeepayslip, token) => {
  return dispatch => {
      dispatch(createEmployeePayslipStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(employeepayslipsURL, employeepayslip, headers)
        .then(res => {
          dispatch(createEmployeePayslipSuccess(employeepayslip));
        })
        .catch(err => {
          dispatch(createEmployeePayslipFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

import axios from 'axios';
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
import { employeepaydeductionsURL } from '../constants';

//employee pay deductions
const getEmployeePayDeductionListStart = () => {
  return {
    type: GET_EMPLOYEE_PAY_DEDUCTIONS_START
  };
};

const getEmployeePayDeductionListSuccess = employeepaydeductions => {
  return {
    type: GET_EMPLOYEE_PAY_DEDUCTIONS_SUCCESS,
    employeepaydeductions
  };
};

const getEmployeePayDeductionListFail = error => {
  return {
    type: GET_EMPLOYEE_PAY_DEDUCTIONS_FAIL,
    error: error
  };
};

const createEmployeePayDeductionStart = () => {
  return {
    type: CREATE_EMPLOYEE_PAY_DEDUCTION_START
  };
};

const createEmployeePayDeductionSuccess = employeepaydeduction => {
  return {
    type: CREATE_EMPLOYEE_PAY_DEDUCTION_SUCCESS,
    employeepaydeduction
  };
};

const createEmployeePayDeductionFail = error => {
  return {
    type: CREATE_EMPLOYEE_PAY_DEDUCTION_FAIL,
    error: error
  };
};

const getEmployeePayDeductionDetailStart = () => {
  return {
    type: GET_EMPLOYEE_PAY_DEDUCTION_START
  };
};

const getEmployeePayDeductionDetailSuccess = employeepaydeduction => {
  return {
    type: GET_EMPLOYEE_PAY_DEDUCTION_SUCCESS,
    employeepaydeduction
  };
};

const getEmployeePayDeductionDetailFail = error => {
  return {
    type: GET_EMPLOYEE_PAY_DEDUCTION_FAIL,
    error: error
  };
};

export const getEmployeePayDeductions = (token) => {
  return dispatch => {
      dispatch(getEmployeePayDeductionListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(employeepaydeductionsURL, headers)
        .then(res => {
          const employeepaydeductions = res.data;
          dispatch(getEmployeePayDeductionListSuccess(employeepaydeductions));
          })
        .catch(err => {
          dispatch(getEmployeePayDeductionListStart(err));
        });
    };
};

export const getEmployeePayDeduction = (id, token) => {
  return dispatch => {
      dispatch(getEmployeePayDeductionDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${employeepaydeductionsURL}${id}`, headers)
        .then(res => {
          const employeepaydeduction = res.data;
          dispatch(getEmployeePayDeductionDetailSuccess(employeepaydeduction));
          })
        .catch(err => {
          dispatch(getEmployeePayDeductionDetailFail(err));
        });
    };
};

export const addEmployeePayDeduction = (employeepaydeduction, token) => {
  return dispatch => {
      dispatch(createEmployeePayDeductionStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(employeepaydeductionsURL, employeepaydeduction, headers)
        .then(res => {
          dispatch(createEmployeePayDeductionSuccess(employeepaydeduction));
        })
        .catch(err => {
          dispatch(createEmployeePayDeductionFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editEmployeePayDeduction = (id, employeepaydeduction, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${employeepaydeductionsURL}${id}/`, employeepaydeduction, headers)
    .then(res => {
        dispatch({
            type: EDIT_EMPLOYEE_PAY_DEDUCTION,
            payload: res.data
        });
    }).catch(err => console.log(err))
}

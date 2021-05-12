import axios from 'axios';
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
import { employeepayrolltaxesURL } from '../constants';

//employee payroll taxes
const getEmployeePayrollTaxListStart = () => {
  return {
    type: GET_EMPLOYEE_PAYROLL_TAXES_START
  };
};

const getEmployeePayrollTaxListSuccess = employeepayrolltaxes => {
  return {
    type: GET_EMPLOYEE_PAYROLL_TAXES_SUCCESS,
    employeepayrolltaxes
  };
};

const getEmployeePayrollTaxListFail = error => {
  return {
    type: GET_EMPLOYEE_PAYROLL_TAXES_FAIL,
    error: error
  };
};

const createEmployeePayrollTaxStart = () => {
  return {
    type: CREATE_EMPLOYEE_PAYROLL_TAX_START
  };
};

const createEmployeePayrollTaxSuccess = employeepayrolltax => {
  return {
    type: CREATE_EMPLOYEE_PAYROLL_TAX_SUCCESS,
    employeepayrolltax
  };
};

const createEmployeePayrollTaxFail = error => {
  return {
    type: CREATE_EMPLOYEE_PAYROLL_TAX_FAIL,
    error: error
  };
};

const getEmployeePayrollTaxDetailStart = () => {
  return {
    type: GET_EMPLOYEE_PAYROLL_TAX_START
  };
};

const getEmployeePayrollTaxDetailSuccess = employeepayrolltax => {
  return {
    type: GET_EMPLOYEE_PAYROLL_TAX_SUCCESS,
    employeepayrolltax
  };
};

const getEmployeePayrollTaxDetailFail = error => {
  return {
    type: GET_EMPLOYEE_PAYROLL_TAX_FAIL,
    error: error
  };
};

export const getEmployeePayrollTaxs = (token) => {
  return dispatch => {
      dispatch(getEmployeePayrollTaxListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(employeepayrolltaxesURL, headers)
        .then(res => {
          const employeepayrolltaxes = res.data;
          dispatch(getEmployeePayrollTaxListSuccess(employeepayrolltaxes));
          })
        .catch(err => {
          dispatch(getEmployeePayrollTaxListStart(err));
        });
    };
};

export const getEmployeePayrollTax = (id, token) => {
  return dispatch => {
      dispatch(getEmployeePayrollTaxDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${employeepayrolltaxesURL}${id}`, headers)
        .then(res => {
          const employeepayrolltax = res.data;
          dispatch(getEmployeePayrollTaxDetailSuccess(employeepayrolltax));
          })
        .catch(err => {
          dispatch(getEmployeePayrollTaxDetailFail(err));
        });
    };
};

export const addEmployeePayrollTax = (employeepayrolltax, token) => {
  return dispatch => {
      dispatch(createEmployeePayrollTaxStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(employeepayrolltaxesURL, employeepayrolltax, headers)
        .then(res => {
          dispatch(createEmployeePayrollTaxSuccess(employeepayrolltax));
        })
        .catch(err => {
          dispatch(createEmployeePayrollTaxFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editEmployeePayrollTax = (id, employeepayrolltax, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${employeepayrolltaxesURL}${id}/`, employeepayrolltax, headers)
    .then(res => {
        dispatch({
            type: EDIT_EMPLOYEE_PAYROLL_TAX,
            payload: res.data
        });
    }).catch(err => console.log(err))
}

import axios from 'axios';
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
import { employeepayrolldatesURL } from '../constants';

//employee payroll dates
const getEmployeePayrollDateListStart = () => {
  return {
    type: GET_EMPLOYEE_PAYROLL_DATES_START
  };
};

const getEmployeePayrollDateListSuccess = employeepayrolldates => {
  return {
    type: GET_EMPLOYEE_PAYROLL_DATES_SUCCESS,
    employeepayrolldates
  };
};

const getEmployeePayrollDateListFail = error => {
  return {
    type: GET_EMPLOYEE_PAYROLL_DATES_FAIL,
    error: error
  };
};

const createEmployeePayrollDateStart = () => {
  return {
    type: CREATE_EMPLOYEE_PAYROLL_DATE_START
  };
};


const createEmployeePayrollDateSuccess = employeepayrolldate => {
  return {
    type: CREATE_EMPLOYEE_PAYROLL_DATE_SUCCESS,
    employeepayrolldate
  };
};

const createEmployeePayrollDateFail = error => {
  return {
    type: CREATE_EMPLOYEE_PAYROLL_DATE_FAIL,
    error: error
  };
};

const getEmployeePayrollDateDetailStart = () => {
  return {
    type: GET_EMPLOYEE_PAYROLL_DATE_START
  };
};

const getEmployeePayrollDateDetailSuccess = employeepayrolldate => {
  return {
    type: GET_EMPLOYEE_PAYROLL_DATE_SUCCESS,
    employeepayrolldate
  };
};

const getEmployeePayrollDateDetailFail = error => {
  return {
    type: GET_EMPLOYEE_PAYROLL_DATE_FAIL,
    error: error
  };
};

export const getEmployeePayrollDates = (token) => {
  return dispatch => {
      dispatch(getEmployeePayrollDateListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(employeepayrolldatesURL, headers)
        .then(res => {
          const employeepayrolldates = res.data;
          dispatch(getEmployeePayrollDateListSuccess(employeepayrolldates));
          })
        .catch(err => {
          dispatch(getEmployeePayrollDateListStart(err));
        });
    };
};

export const getEmployeePayrollDate = (id, token) => {
  return dispatch => {
      dispatch(getEmployeePayrollDateDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${employeepayrolldatesURL}${id}`, headers)
        .then(res => {
          const employeepayrolldate = res.data;
          dispatch(getEmployeePayrollDateDetailSuccess(employeepayrolldate));
          })
        .catch(err => {
          dispatch(getEmployeePayrollDateDetailFail(err));
        });
    };
};

export const addEmployeePayrollDate = (employeepayrolldate, token) => {
  return dispatch => {
      dispatch(createEmployeePayrollDateStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(employeepayrolldatesURL, employeepayrolldate, headers)
        .then(res => {
          dispatch(createEmployeePayrollDateSuccess(employeepayrolldate));
        })
        .catch(err => {
          dispatch(createEmployeePayrollDateFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editEmployeePayrollDate = (id, employeepayrolldate, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${employeepayrolldatesURL}${id}/`, employeepayrolldate, headers)
    .then(res => {
        dispatch({
            type: EDIT_EMPLOYEE_PAYROLL_DATE,
            payload: res.data
        });
    }).catch(err => console.log(err))
}

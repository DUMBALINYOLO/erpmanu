import axios from 'axios';
import { 
    GET_EMPLOYEES_START,
    GET_EMPLOYEES_SUCCESS,
    GET_EMPLOYEES_FAIL,
    CREATE_EMPLOYEE_START,
    CREATE_EMPLOYEE_SUCCESS,
    CREATE_EMPLOYEE_FAIL,
    GET_EMPLOYEE_START,
    GET_EMPLOYEE_SUCCESS,
    GET_EMPLOYEE_FAIL,
    EDIT_EMPLOYEE 
} from '../types/employeesTypes';
import { employeesURL } from '../constants';

//employees
const getEmployeeListStart = () => {
  return {
    type: GET_EMPLOYEES_START
  };
};

const getEmployeeListSuccess = employees => {
  return {
    type: GET_EMPLOYEES_SUCCESS,
    employees
  };
};

const getEmployeeListFail = error => {
  return {
    type: GET_EMPLOYEES_FAIL,
    error: error
  };
};

const createEmployeeStart = () => {
  return {
    type: CREATE_EMPLOYEE_START
  };
};


const createEmployeeSuccess = employee => {
  return {
    type: CREATE_EMPLOYEE_SUCCESS,
    employee
  };
};

const createEmployeeFail = error => {
  return {
    type: CREATE_EMPLOYEE_FAIL,
    error: error
  };
};

const getEmployeeDetailStart = () => {
  return {
    type: GET_EMPLOYEE_START
  };
};

const getEmployeeDetailSuccess = employee => {
  return {
    type: GET_EMPLOYEE_SUCCESS,
    employee
  };
};

const getEmployeeDetailFail = error => {
  return {
    type: GET_EMPLOYEE_FAIL,
    error: error
  };
};

export const getEmployees = (token) => {
  return dispatch => {
      dispatch(getEmployeeListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(employeesURL, headers)
        .then(res => {
          const employees = res.data;
          dispatch(getEmployeeListSuccess(employees));
          })
        .catch(err => {
          dispatch(getEmployeeListStart(err));
        });
    };
};

export const getEmployee = (id, token) => {
  return dispatch => {
      dispatch(getEmployeeDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${employeesURL}${id}`, headers)
        .then(res => {
          const employee = res.data;
          dispatch(getEmployeeDetailSuccess(employee));
          })
        .catch(err => {
          dispatch(getEmployeeDetailFail(err));
        });
    };
};

export const addEmployee = (employee, token) => {
  return dispatch => {
      dispatch(createEmployeeStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(employeesURL, employee, headers)
        .then(res => {
          dispatch(createEmployeeSuccess(employee));
        })
        .catch(err => {
          dispatch(createEmployeeFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editEmployee = (id, employee, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${employeesURL}${id}/`, employee, headers)
    .then(res => {
        dispatch({
            type: EDIT_EMPLOYEE,
            payload: res.data
        });
    }).catch(err => console.log(err))
}


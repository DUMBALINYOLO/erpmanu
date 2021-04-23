import axios from 'axios';
import { 
    GET_EMPLOYEE_DEPARTMENTS_START,
    GET_EMPLOYEE_DEPARTMENTS_SUCCESS,
    GET_EMPLOYEE_DEPARTMENTS_FAIL,
    CREATE_EMPLOYEE_DEPARTMENT_START,
    CREATE_EMPLOYEE_DEPARTMENT_SUCCESS,
    CREATE_EMPLOYEE_DEPARTMENT_FAIL,
    GET_EMPLOYEE_DEPARTMENT_START,
    GET_EMPLOYEE_DEPARTMENT_SUCCESS,
    GET_EMPLOYEE_DEPARTMENT_FAIL,
    EDIT_EMPLOYEE_DEPARTMENT 
} from '../types/employeedepartmentTypes';
import { employeedepartmentsURL } from '../constants';

//employee departments
const getEmployeeDepartmentListStart = () => {
  return {
    type: GET_EMPLOYEE_DEPARTMENTS_START
  };
};

const getEmployeeDepartmentListSuccess = employeedepartments => {
  return {
    type: GET_EMPLOYEE_DEPARTMENTS_SUCCESS,
    employeedepartments
  };
};

const getEmployeeDepartmentListFail = error => {
  return {
    type: GET_EMPLOYEE_DEPARTMENTS_FAIL,
    error: error
  };
};

const createEmployeeDepartmentStart = () => {
  return {
    type: CREATE_EMPLOYEE_DEPARTMENT_START
  };
};

const createEmployeeDepartmentSuccess = employeedepartment => {
  return {
    type: CREATE_EMPLOYEE_DEPARTMENT_SUCCESS,
    employeedepartment
  };
};

const createEmployeeDepartmentFail = error => {
  return {
    type: CREATE_EMPLOYEE_DEPARTMENT_FAIL,
    error: error
  };
};

const getEmployeeDepartmentDetailStart = () => {
  return {
    type: GET_EMPLOYEE_DEPARTMENT_START
  };
};

const getEmployeeDepartmentDetailSuccess = employeedepartment => {
  return {
    type: GET_EMPLOYEE_DEPARTMENT_SUCCESS,
    employeedepartment
  };
};

const getEmployeeDepartmentDetailFail = error => {
  return {
    type: GET_EMPLOYEE_DEPARTMENT_FAIL,
    error: error
  };
};

export const getEmployeeDepartments = (token) => {
  return dispatch => {
      dispatch(getEmployeeDepartmentListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(employeedepartmentsURL, headers)
        .then(res => {
          const employeedepartments = res.data;
          dispatch(getEmployeeDepartmentListSuccess(employeedepartments));
          })
        .catch(err => {
          dispatch(getEmployeeDepartmentListStart(err));
        });
    };
};

export const getEmployeeDepartment = (id, token) => {
  return dispatch => {
      dispatch(getEmployeeDepartmentDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${employeedepartmentsURL}${id}`, headers)
        .then(res => {
          const employeedepartment = res.data;
          dispatch(getEmployeeDepartmentDetailSuccess(employeedepartment));
          })
        .catch(err => {
          dispatch(getEmployeeDepartmentDetailFail(err));
        });
    };
};

export const addEmployeeDepartment = (employeedepartment, token) => {
  return dispatch => {
      dispatch(createEmployeeDepartmentStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(employeedepartmentsURL, employeedepartment, headers)
        .then(res => {
          dispatch(createEmployeeDepartmentSuccess(employeedepartment));
        })
        .catch(err => {
          dispatch(createEmployeeDepartmentFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editEmployeeDepartment = (id, employeedepartment, token) => dispatch => {
    const headers ={
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
        'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${employeedepartmentsURL}${id}/`, employeedepartment, headers)
    .then(res => {
        dispatch({
            type: EDIT_EMPLOYEE_DEPARTMENT,
            payload: res.data
        });
    }).catch(err => console.log(err))
}

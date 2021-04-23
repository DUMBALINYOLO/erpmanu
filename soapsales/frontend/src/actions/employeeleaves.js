import axios from 'axios';
import { 
    GET_EMPLOYEE_LEAVES_START,
    GET_EMPLOYEE_LEAVES_SUCCESS,
    GET_EMPLOYEE_LEAVES_FAIL,
    CREATE_EMPLOYEE_LEAVE_START,
    CREATE_EMPLOYEE_LEAVE_SUCCESS,
    CREATE_EMPLOYEE_LEAVE_FAIL,
    GET_EMPLOYEE_LEAVE_START,
    GET_EMPLOYEE_LEAVE_SUCCESS,
    GET_EMPLOYEE_LEAVE_FAIL,
    EDIT_EMPLOYEE_LEAVE 
} from '../types/employeeleaveTypes';
import { employeeleavesURL } from '../constants';

//employee leaves
const getEmployeeLeaveListStart = () => {
  return {
    type: GET_EMPLOYEE_LEAVES_START
  };
};

const getEmployeeLeaveListSuccess = employeeleaves => {
  return {
    type: GET_EMPLOYEE_LEAVES_SUCCESS,
    employeeleaves
  };
};

const getEmployeeLeaveListFail = error => {
  return {
    type: GET_EMPLOYEE_LEAVES_FAIL,
    error: error
  };
};

const createEmployeeLeaveStart = () => {
  return {
    type: CREATE_EMPLOYEE_LEAVE_START
  };
};

const createEmployeeLeaveSuccess = employeeleave => {
  return {
    type: CREATE_EMPLOYEE_LEAVE_SUCCESS,
    employeeleave
  };
};

const createEmployeeLeaveFail = error => {
  return {
    type: CREATE_EMPLOYEE_LEAVE_FAIL,
    error: error
  };
};

const getEmployeeLeaveDetailStart = () => {
  return {
    type: GET_EMPLOYEE_LEAVE_START
  };
};

const getEmployeeLeaveDetailSuccess = employeeleave => {
  return {
    type: GET_EMPLOYEE_LEAVE_SUCCESS,
    employeeleave
  };
};

const getEmployeeLeaveDetailFail = error => {
  return {
    type: GET_EMPLOYEE_LEAVE_FAIL,
    error: error
  };
};

export const getEmployeeLeaves = (token) => {
  return dispatch => {
      dispatch(getEmployeeLeaveListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(employeeleavesURL, headers)
        .then(res => {
          const employeeleaves = res.data;
          dispatch(getEmployeeLeaveListSuccess(employeeleaves));
          })
        .catch(err => {
          dispatch(getEmployeeLeaveListStart(err));
        });
    };
};

export const getEmployeeLeave = (id, token) => {
  return dispatch => {
      dispatch(getEmployeeLeaveDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${employeeleavesURL}${id}`, headers)
        .then(res => {
          const employeeleave = res.data;
          dispatch(getEmployeeLeaveDetailSuccess(employeeleave));
          })
        .catch(err => {
          dispatch(getEmployeeLeaveDetailFail(err));
        });
    };
};

export const addEmployeeLeave = (employeeleave, token) => {
  return dispatch => {
      dispatch(createEmployeeLeaveStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(employeeleavesURL, employeeleave, headers)
        .then(res => {
          dispatch(createEmployeeLeaveSuccess(employeeleave));
        })
        .catch(err => {
          dispatch(createEmployeeLeaveFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editEmployeeLeave = (id, employeeleave, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${employeeleavesURL}${id}/`, employeeleave, headers)
    .then(res => {
        dispatch({
            type: EDIT_EMPLOYEE_LEAVE,
            payload: res.data
        });
    }).catch(err => console.log(err))
}

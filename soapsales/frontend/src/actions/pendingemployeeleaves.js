import axios from 'axios';
import {
    GET_PENDING_EMPLOYEE_LEAVES_START,
    GET_PENDING_EMPLOYEE_LEAVES_SUCCESS,
    GET_PENDING_EMPLOYEE_LEAVES_FAIL,
    CREATE_PENDING_EMPLOYEE_LEAVE_START,
    CREATE_PENDING_EMPLOYEE_LEAVE_SUCCESS,
    CREATE_PENDING_EMPLOYEE_LEAVE_FAIL,
    GET_PENDING_EMPLOYEE_LEAVE_START,
    GET_PENDING_EMPLOYEE_LEAVE_SUCCESS,
    GET_PENDING_EMPLOYEE_LEAVE_FAIL,
    EDIT_PENDING_EMPLOYEE_LEAVE
    } from '../types/pendingemployeeleaveTypes';
import { pendingemployeeleavesURL } from '../constants';

//pending employee leaves
const getPendingEmployeeLeaveListStart = () => {
  return {
    type: GET_PENDING_EMPLOYEE_LEAVES_START
  };
};

const getPendingEmployeeLeaveListSuccess = pendingemployeeleaves => {
  return {
    type: GET_PENDING_EMPLOYEE_LEAVES_SUCCESS,
    pendingemployeeleaves
  };
};

const getPendingEmployeeLeaveListFail = error => {
  return {
    type: GET_PENDING_EMPLOYEE_LEAVES_FAIL,
    error: error
  };
};

const createPendingEmployeeLeaveStart = () => {
  return {
    type: CREATE_PENDING_EMPLOYEE_LEAVE_START
  };
};

const createPendingEmployeeLeaveSuccess = pendingemployeeleave => {
  return {
    type: CREATE_PENDING_EMPLOYEE_LEAVE_SUCCESS,
    pendingemployeeleave
  };
};

const createPendingEmployeeLeaveFail = error => {
  return {
    type: CREATE_PENDING_EMPLOYEE_LEAVE_FAIL,
    error: error
  };
};

const getPendingEmployeeLeaveDetailStart = () => {
  return {
    type: GET_PENDING_EMPLOYEE_LEAVE_START
  };
};

const getPendingEmployeeLeaveDetailSuccess = pendingemployeeleave => {
  return {
    type: GET_PENDING_EMPLOYEE_LEAVE_SUCCESS,
    pendingemployeeleave
  };
};

const getPendingEmployeeLeaveDetailFail = error => {
  return {
    type: GET_PENDING_EMPLOYEE_LEAVE_FAIL,
    error: error
  };
};

export const getPendingEmployeeLeaves = (token) => {
  return dispatch => {
      dispatch(getPendingEmployeeLeaveListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(pendingemployeeleavesURL, headers)
        .then(res => {
          const pendingemployeeleaves = res.data;
          dispatch(getPendingEmployeeLeaveListSuccess(pendingemployeeleaves));
          })
        .catch(err => {
          dispatch(getPendingEmployeeLeaveListStart(err));
        });
    };
};

export const getPendingEmployeeLeave = (id, token) => {
  return dispatch => {
      dispatch(getPendingEmployeeLeaveDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${pendingemployeeleavesURL}${id}`, headers)
        .then(res => {
          const pendingemployeeleave = res.data;
          dispatch(getPendingEmployeeLeaveDetailSuccess(pendingemployeeleave));
          })
        .catch(err => {
          dispatch(getPendingEmployeeLeaveDetailFail(err));
        });
    };
};

export const addPendingEmployeeLeave = (pendingemployeeleave, token) => {
  return dispatch => {
      dispatch(createPendingEmployeeLeaveStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(pendingemployeeleavesURL, pendingemployeeleave, headers)
        .then(res => {
          dispatch(createPendingEmployeeLeaveSuccess(pendingemployeeleave));
        })
        .catch(err => {
          dispatch(createPendingEmployeeLeaveFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editPendingEmployeeLeave = (id, pendingemployeeleave, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${pendingemployeeleavesURL}${id}/`, pendingemployeeleave, headers)
    .then(res => {
        dispatch({
            type: EDIT_PENDING_EMPLOYEE_LEAVE,
            payload: res.data
        });
    }).catch(err => console.log(err))
}

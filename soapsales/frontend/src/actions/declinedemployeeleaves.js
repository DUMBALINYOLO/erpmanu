import axios from 'axios';
import {
    GET_DECLINED_EMPLOYEE_LEAVES_START,
    GET_DECLINED_EMPLOYEE_LEAVES_SUCCESS,
    GET_DECLINED_EMPLOYEE_LEAVES_FAIL,
    CREATE_DECLINED_EMPLOYEE_LEAVE_START,
    CREATE_DECLINED_EMPLOYEE_LEAVE_SUCCESS,
    CREATE_DECLINED_EMPLOYEE_LEAVE_FAIL,
    GET_DECLINED_EMPLOYEE_LEAVE_START,
    GET_DECLINED_EMPLOYEE_LEAVE_SUCCESS,
    GET_DECLINED_EMPLOYEE_LEAVE_FAIL,
    EDIT_DECLINED_EMPLOYEE_LEAVE
    } from '../types/declinedemployeeleaveTypes';
import { declinedemployeeleavesURL } from '../constants';

//declined employee leaves
const getDeclinedEmployeeLeaveListStart = () => {
  return {
    type: GET_DECLINED_EMPLOYEE_LEAVES_START
  };
};

const getDeclinedEmployeeLeaveListSuccess = declinedemployeeleaves => {
  return {
    type: GET_DECLINED_EMPLOYEE_LEAVES_SUCCESS,
    declinedemployeeleaves
  };
};

const getDeclinedEmployeeLeaveListFail = error => {
  return {
    type: GET_DECLINED_EMPLOYEE_LEAVES_FAIL,
    error: error
  };
};

const createDeclinedEmployeeLeaveStart = () => {
  return {
    type: CREATE_DECLINED_EMPLOYEE_LEAVE_START
  };
};

const createDeclinedEmployeeLeaveSuccess = declinedemployeeleave => {
  return {
    type: CREATE_DECLINED_EMPLOYEE_LEAVE_SUCCESS,
    declinedemployeeleave
  };
};

const createDeclinedEmployeeLeaveFail = error => {
  return {
    type: CREATE_DECLINED_EMPLOYEE_LEAVE_FAIL,
    error: error
  };
};

const getDeclinedEmployeeLeaveDetailStart = () => {
  return {
    type: GET_DECLINED_EMPLOYEE_LEAVE_START
  };
};

const getDeclinedEmployeeLeaveDetailSuccess = declinedemployeeleave => {
  return {
    type: GET_DECLINED_EMPLOYEE_LEAVE_SUCCESS,
    declinedemployeeleave
  };
};

const getDeclinedEmployeeLeaveDetailFail = error => {
  return {
    type: GET_DECLINED_EMPLOYEE_LEAVE_FAIL,
    error: error
  };
};

export const getDeclinedEmployeeLeaves = (token) => {
  return dispatch => {
      dispatch(getDeclinedEmployeeLeaveListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(declinedemployeeleavesURL, headers)
        .then(res => {
          const declinedemployeeleaves = res.data;
          dispatch(getDeclinedEmployeeLeaveListSuccess(declinedemployeeleaves));
          })
        .catch(err => {
          dispatch(getDeclinedEmployeeLeaveListStart(err));
        });
    };
};

export const getDeclinedEmployeeLeave = (id, token) => {
  return dispatch => {
      dispatch(getDeclinedEmployeeLeaveDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${declinedemployeeleavesURL}${id}`, headers)
        .then(res => {
          const declinedemployeeleave = res.data;
          dispatch(getDeclinedEmployeeLeaveDetailSuccess(declinedemployeeleave));
          })
        .catch(err => {
          dispatch(getDeclinedEmployeeLeaveDetailFail(err));
        });
    };
};

export const addDeclinedEmployeeLeave = (declinedemployeeleave, token) => {
  return dispatch => {
      dispatch(createDeclinedEmployeeLeaveStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(declinedemployeeleavesURL, declinedemployeeleave, headers)
        .then(res => {
          dispatch(createDeclinedEmployeeLeaveSuccess(declinedemployeeleave));
        })
        .catch(err => {
          dispatch(createDeclinedEmployeeLeaveFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editDeclinedEmployeeLeave = (id, declinedemployeeleave, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${declinedemployeeleavesURL}${id}/`, declinedemployeeleave, headers)
    .then(res => {
        dispatch({
            type: EDIT_DECLINED_EMPLOYEE_LEAVE,
            payload: res.data
        });
    }).catch(err => console.log(err))
}

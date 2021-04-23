import axios from 'axios';
import {
    GET_AUTHORISED_EMPLOYEE_LEAVES_START,
    GET_AUTHORISED_EMPLOYEE_LEAVES_SUCCESS,
    GET_AUTHORISED_EMPLOYEE_LEAVES_FAIL,
    CREATE_AUTHORISED_EMPLOYEE_LEAVE_START,
    CREATE_AUTHORISED_EMPLOYEE_LEAVE_SUCCESS,
    CREATE_AUTHORISED_EMPLOYEE_LEAVE_FAIL,
    GET_AUTHORISED_EMPLOYEE_LEAVE_START,
    GET_AUTHORISED_EMPLOYEE_LEAVE_SUCCESS,
    GET_AUTHORISED_EMPLOYEE_LEAVE_FAIL,
    EDIT_AUTHORISED_EMPLOYEE_LEAVE
    } from '../types/authorisedemployeeleaveTypes';
import { authorisedemployeeleavesURL } from '../constants';

//authorised employee leaves
const getAuthorisedEmployeeLeaveListStart = () => {
  return {
    type: GET_AUTHORISED_EMPLOYEE_LEAVES_START
  };
};

const getAuthorisedEmployeeLeaveListSuccess = authorisedemployeeleaves => {
  return {
    type: GET_AUTHORISED_EMPLOYEE_LEAVES_SUCCESS,
    authorisedemployeeleaves
  };
};

const getAuthorisedEmployeeLeaveListFail = error => {
  return {
    type: GET_AUTHORISED_EMPLOYEE_LEAVES_FAIL,
    error: error
  };
};

const createAuthorisedEmployeeLeaveStart = () => {
  return {
    type: CREATE_AUTHORISED_EMPLOYEE_LEAVE_START
  };
};


const createAuthorisedEmployeeLeaveSuccess = authorisedemployeeleave => {
  return {
    type: CREATE_AUTHORISED_EMPLOYEE_LEAVE_SUCCESS,
    authorisedemployeeleave
  };
};

const createAuthorisedEmployeeLeaveFail = error => {
  return {
    type: CREATE_AUTHORISED_EMPLOYEE_LEAVE_FAIL,
    error: error
  };
};

const getAuthorisedEmployeeLeaveDetailStart = () => {
  return {
    type: GET_AUTHORISED_EMPLOYEE_LEAVE_START
  };
};

const getAuthorisedEmployeeLeaveDetailSuccess = authorisedemployeeleave => {
  return {
    type: GET_AUTHORISED_EMPLOYEE_LEAVE_SUCCESS,
    authorisedemployeeleave
  };
};

const getAuthorisedEmployeeLeaveDetailFail = error => {
  return {
    type: GET_AUTHORISED_EMPLOYEE_LEAVE_FAIL,
    error: error
  };
};

export const getAuthorisedEmployeeLeaves = (token) => {
  return dispatch => {
      dispatch(getAuthorisedEmployeeLeaveListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(authorisedemployeeleavesURL, headers)
        .then(res => {
          const authorisedemployeeleaves = res.data;
          dispatch(getAuthorisedEmployeeLeaveListSuccess(authorisedemployeeleaves));
          })
        .catch(err => {
          dispatch(getAuthorisedEmployeeLeaveListStart(err));
        });
    };
};

export const getAuthorisedEmployeeLeave = (id, token) => {
  return dispatch => {
      dispatch(getAuthorisedEmployeeLeaveDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${authorisedemployeeleavesURL}${id}`, headers)
        .then(res => {
          const authorisedemployeeleave = res.data;
          dispatch(getAuthorisedEmployeeLeaveDetailSuccess(authorisedemployeeleave));
          })
        .catch(err => {
          dispatch(getAuthorisedEmployeeLeaveDetailFail(err));
        });
    };
};

export const addAuthorisedEmployeeLeave = (authorisedemployeeleave, token) => {
  return dispatch => {
      dispatch(createAuthorisedEmployeeLeaveStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(authorisedemployeeleavesURL, authorisedemployeeleave, headers)
        .then(res => {
          dispatch(createAuthorisedEmployeeLeaveSuccess(authorisedemployeeleave));
        })
        .catch(err => {
          dispatch(createAuthorisedEmployeeLeaveFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editAuthorisedEmployeeLeave = (id, authorisedemployeeleave, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${authorisedemployeeleavesURL}${id}/`, authorisedemployeeleave, headers)
    .then(res => {
        dispatch({
            type: EDIT_AUTHORISED_EMPLOYEE_LEAVE,
            payload: res.data
        });
    }).catch(err => console.log(err))
}

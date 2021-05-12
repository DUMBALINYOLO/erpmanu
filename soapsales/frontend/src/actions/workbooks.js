import axios from 'axios';
import {
    GET_WORKBOOKS_START,
    GET_WORKBOOKS_SUCCESS,
    GET_WORKBOOKS_FAIL,
    CREATE_WORKBOOK_START,
    CREATE_WORKBOOK_SUCCESS,
    CREATE_WORKBOOK_FAIL,
    GET_WORKBOOK_START,
    GET_WORKBOOK_SUCCESS,
    GET_WORKBOOK_FAIL,
    EDIT_WORKBOOK
    } from '../types/workbookTypes';
import { workbooksURL } from '../constants';

//workbooks
const getWorkbookListStart = () => {
  return {
    type: GET_WORKBOOKS_START
  };
};

const getWorkbookListSuccess = workbooks => {
  return {
    type: GET_WORKBOOKS_SUCCESS,
    workbooks
  };
};

const getWorkbookListFail = error => {
  return {
    type: GET_WORKBOOKS_FAIL,
    error: error
  };
};

const createWorkbookStart = () => {
  return {
    type: CREATE_WORKBOOK_START
  };
};


const createWorkbookSuccess = workbook => {
  return {
    type: CREATE_WORKBOOK_SUCCESS,
    workbook
  };
};

const createWorkbookFail = error => {
  return {
    type: CREATE_WORKBOOK_FAIL,
    error: error
  };
};

const getWorkbookDetailStart = () => {
  return {
    type: GET_WORKBOOK_START
  };
};

const getWorkbookDetailSuccess = workbook => {
  return {
    type: GET_WORKBOOK_SUCCESS,
    workbook
  };
};

const getWorkbookDetailFail = error => {
  return {
    type: GET_WORKBOOK_FAIL,
    error: error
  };
};

export const getWorkbooks = (token) => {
  return dispatch => {
      dispatch(getWorkbookListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(workbooksURL, headers)
        .then(res => {
          const workbooks = res.data;
          dispatch(getWorkbookListSuccess(workbooks));
          })
        .catch(err => {
          dispatch(getWorkbookListStart(err));
        });
    };
};

export const getWorkbook = (id, token) => {
  return dispatch => {
      dispatch(getWorkbookDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${workbooksURL}${id}`, headers)
        .then(res => {
          const workbook = res.data;
          dispatch(getWorkbookDetailSuccess(workbook));
          })
        .catch(err => {
          dispatch(getWorkbookDetailFail(err));
        });
    };
};

export const addWorkbook = (workbook, token) => {
  return dispatch => {
      dispatch(createWorkbookStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(workbooksURL, workbook, headers)
        .then(res => {
          dispatch(createWorkbookSuccess(workbook));
        })
        .catch(err => {
          dispatch(createWorkbookFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editWorkbook = (id, workbook, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${workbooksURL}${id}/`, workbook, headers)
    .then(res => {
        dispatch({
            type: EDIT_WORKBOOK,
            payload: res.data
        });
    }).catch(err => console.log(err))
}


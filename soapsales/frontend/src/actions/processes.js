import axios from 'axios';
import {
  CREATE_PROCESS_START,
  CREATE_PROCESS_SUCCESS,
  CREATE_PROCESS_FAIL,
  EDIT_PROCESS
} from '../types/unverifiedproductionprocessTypes';
import { unverifiedproductionprocessesURL } from '../constants';

//unverified production processes
const createProcessStart = () => {
  return {
    type: CREATE_PROCESS_START
  };
};

const createProcessSuccess = process => {
  return {
    type: CREATE_PROCESS_SUCCESS,
    process
  };
};

const createProcessFail = error => {
  return {
    type: CREATE_PROCESS_FAIL,
    error: error
  };
};

export const addProcess = (process, token) => {
  return dispatch => {
      dispatch(createProcessStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(unverifiedproductionprocessesURL, process, headers)
        .then(res => {
          dispatch(createProcessSuccess(process));
        })
        .catch(err => {
          dispatch(createProcessFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editProcess = (id, process, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${unverifiedproductionprocessesURL}${id}/`, process, headers)
    .then(res => {
        dispatch({
            type: EDIT_PROCESS,
            payload: res.data
        });
    }).catch(err => console.log(err))
}

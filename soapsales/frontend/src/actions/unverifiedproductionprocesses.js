import axios from 'axios';
import {
    GET_UNVERIFIED_PRODUCTION_PROCESSES_START,
    GET_UNVERIFIED_PRODUCTION_PROCESSES_SUCCESS,
    GET_UNVERIFIED_PRODUCTION_PROCESSES_FAIL,
    GET_UNVERIFIED_PRODUCTION_PROCESS_START,
    GET_UNVERIFIED_PRODUCTION_PROCESS_SUCCESS,
    GET_UNVERIFIED_PRODUCTION_PROCESS_FAIL
    } from '../types/unverifiedproductionprocessTypes';
import { unverifiedproductionprocessesURL } from '../constants';

//unverified production processes
const getUnverifiedProductionProcessListStart = () => {
  return {
    type: GET_UNVERIFIED_PRODUCTION_PROCESSES_START
  };
};

const getUnverifiedProductionProcessListSuccess = unverifiedproductionprocesses => {
  return {
    type: GET_UNVERIFIED_PRODUCTION_PROCESSES_SUCCESS,
    unverifiedproductionprocesses
  };
};

const getUnverifiedProductionProcessListFail = error => {
  return {
    type: GET_UNVERIFIED_PRODUCTION_PROCESSES_FAIL,
    error: error
  };
};

const getUnverifiedProductionProcessDetailStart = () => {
  return {
    type: GET_UNVERIFIED_PRODUCTION_PROCESS_START
  };
};

const getUnverifiedProductionProcessDetailSuccess = unverifiedproductionprocess => {
  return {
    type: GET_UNVERIFIED_PRODUCTION_PROCESS_SUCCESS,
    unverifiedproductionprocess
  };
};

const getUnverifiedProductionProcessDetailFail = error => {
  return {
    type: GET_UNVERIFIED_PRODUCTION_PROCESS_FAIL,
    error: error
  };
};

export const getUnverifiedProductionProcesses = (token) => {
  return dispatch => {
      dispatch(getUnverifiedProductionProcessListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(unverifiedproductionprocessesURL, headers)
        .then(res => {
          const unverifiedproductionprocesses = res.data;
          dispatch(getUnverifiedProductionProcessListSuccess(unverifiedproductionprocesses));
          })
        .catch(err => {
          dispatch(getUnverifiedProductionProcessListStart(err));
        });
    };
};

export const getUnverifiedProductionProcess = (id, token) => {
  return dispatch => {
      dispatch(getUnverifiedProductionProcessDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${unverifiedproductionprocessesURL}${id}`, headers)
        .then(res => {
          const unverifiedproductionprocess = res.data;
          dispatch(getUnverifiedProductionProcessDetailSuccess(unverifiedproductionprocess));
          })
        .catch(err => {
          dispatch(getUnverifiedProductionProcessDetailFail(err));
        });
    };
};

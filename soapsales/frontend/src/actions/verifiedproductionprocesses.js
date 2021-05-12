import axios from 'axios';
import {
    GET_VERIFIED_PRODUCTION_PROCESSES_START,
    GET_VERIFIED_PRODUCTION_PROCESSES_SUCCESS,
    GET_VERIFIED_PRODUCTION_PROCESSES_FAIL,
    GET_VERIFIED_PRODUCTION_PROCESS_START,
    GET_VERIFIED_PRODUCTION_PROCESS_SUCCESS,
    GET_VERIFIED_PRODUCTION_PROCESS_FAIL
    } from '../types/verifiedproductionprocessTypes';
import { verifiedproductionprocessesURL } from '../constants';

//verified production processes
const getVerifiedProductionProcessListStart = () => {
  return {
    type: GET_VERIFIED_PRODUCTION_PROCESSES_START
  };
};

const getVerifiedProductionProcessListSuccess = verifiedproductionprocesses => {
  return {
    type: GET_VERIFIED_PRODUCTION_PROCESSES_SUCCESS,
    verifiedproductionprocesses
  };
};

const getVerifiedProductionProcessListFail = error => {
  return {
    type: GET_VERIFIED_PRODUCTION_PROCESSES_FAIL,
    error: error
  };
};

const getVerifiedProductionProcessDetailStart = () => {
  return {
    type: GET_VERIFIED_PRODUCTION_PROCESS_START
  };
};

const getVerifiedProductionProcessDetailSuccess = verifiedproductionprocess => {
  return {
    type: GET_VERIFIED_PRODUCTION_PROCESS_SUCCESS,
    verifiedproductionprocess
  };
};

const getVerifiedProductionProcessDetailFail = error => {
  return {
    type: GET_VERIFIED_PRODUCTION_PROCESS_FAIL,
    error: error
  };
};

export const getVerifiedProductionProcesses = (token) => {
  return dispatch => {
      dispatch(getVerifiedProductionProcessListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(verifiedproductionprocessesURL, headers)
        .then(res => {
          const verifiedproductionprocesses = res.data;
          dispatch(getVerifiedProductionProcessListSuccess(verifiedproductionprocesses));
          })
        .catch(err => {
          dispatch(getVerifiedProductionProcessListStart(err));
        });
    };
};

export const getVerifiedProductionProcess = (id, token) => {
  return dispatch => {
      dispatch(getVerifiedProductionProcessDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${verifiedproductionprocessesURL}${id}`, headers)
        .then(res => {
          const verifiedproductionprocess = res.data;
          dispatch(getVerifiedProductionProcessDetailSuccess(verifiedproductionprocess));
          })
        .catch(err => {
          dispatch(getVerifiedProductionProcessDetailFail(err));
        });
    };
};

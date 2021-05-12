import {
    GET_VERIFIED_PRODUCTION_PROCESSES_START,
    GET_VERIFIED_PRODUCTION_PROCESSES_SUCCESS,
    GET_VERIFIED_PRODUCTION_PROCESSES_FAIL,
    GET_VERIFIED_PRODUCTION_PROCESS_START,
    GET_VERIFIED_PRODUCTION_PROCESS_SUCCESS,
    GET_VERIFIED_PRODUCTION_PROCESS_FAIL
    } from '../types/verifiedproductionprocessTypes';
import { updateObject } from "../utility";

const initialState = {
    verifiedproductionprocesses: [],
    verifiedproductionprocess: {},
    loading: false,
    error: null,
}

const getVerifiedProductionProcessListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getVerifiedProductionProcessListSuccess = (state, action) => {
  return updateObject(state, {
    verifiedproductionprocesses: action.verifiedproductionprocesses,
    error: null,
    loading: false
  });
};

const getVerifiedProductionProcessListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getVerifiedProductionProcessDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getVerifiedProductionProcessDetailSuccess = (state, action) => {
  return updateObject(state, {
    verifiedproductionprocess: action.verifiedproductionprocess,
    error: null,
    loading: false
  });
};

const getVerifiedProductionProcessDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function verifiedproductionprocesses(state = initialState, action){
    switch(action.type){
        case GET_VERIFIED_PRODUCTION_PROCESSES_START:
            return getVerifiedProductionProcessListStart(state, action);
        case GET_VERIFIED_PRODUCTION_PROCESSES_SUCCESS:
            return getVerifiedProductionProcessListSuccess(state, action);
        case GET_VERIFIED_PRODUCTION_PROCESSES_FAIL:
            return getVerifiedProductionProcessListFail(state, action);
        case GET_VERIFIED_PRODUCTION_PROCESS_START:
            return getVerifiedProductionProcessDetailStart(state, action);
        case GET_VERIFIED_PRODUCTION_PROCESS_SUCCESS:
            return getVerifiedProductionProcessDetailSuccess(state, action);
        case GET_VERIFIED_PRODUCTION_PROCESS_FAIL:
            return getVerifiedProductionProcessDetailFail(state, action);
        default:
            return state;
    }
}

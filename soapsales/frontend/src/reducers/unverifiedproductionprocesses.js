import {
    GET_UNVERIFIED_PRODUCTION_PROCESSES_START,
    GET_UNVERIFIED_PRODUCTION_PROCESSES_SUCCESS,
    GET_UNVERIFIED_PRODUCTION_PROCESSES_FAIL,
    GET_UNVERIFIED_PRODUCTION_PROCESS_START,
    GET_UNVERIFIED_PRODUCTION_PROCESS_SUCCESS,
    GET_UNVERIFIED_PRODUCTION_PROCESS_FAIL
    } from '../types/unverifiedproductionprocessTypes';
import { ADD_PROCESS } from '../actions/types.js';
import { updateObject } from "../utility";

const initialState = {
    unverifiedproductionprocesses: [],
    unverifiedproductionprocess: {},
    loading: false,
    error: null,
}

const getUnverifiedProductionProcessListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getUnverifiedProductionProcessListSuccess = (state, action) => {
  return updateObject(state, {
    unverifiedproductionprocesses: action.unverifiedproductionprocesses,
    error: null,
    loading: false
  });
};

const getUnverifiedProductionProcessListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getUnverifiedProductionProcessDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getUnverifiedProductionProcessDetailSuccess = (state, action) => {
  return updateObject(state, {
    unverifiedproductionprocess: action.unverifiedproductionprocess,
    error: null,
    loading: false
  });
};

const getUnverifiedProductionProcessDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function unverifiedproductionprocesses(state = initialState, action){
    switch(action.type){
        case GET_UNVERIFIED_PRODUCTION_PROCESSES_START:
            return getUnverifiedProductionProcessListStart(state, action);
        case GET_UNVERIFIED_PRODUCTION_PROCESSES_SUCCESS:
            return getUnverifiedProductionProcessListSuccess(state, action);
        case GET_UNVERIFIED_PRODUCTION_PROCESSES_FAIL:
            return getUnverifiedProductionProcessListFail(state, action);
        case GET_UNVERIFIED_PRODUCTION_PROCESS_START:
            return getUnverifiedProductionProcessDetailStart(state, action);
        case GET_UNVERIFIED_PRODUCTION_PROCESS_SUCCESS:
            return getUnverifiedProductionProcessDetailSuccess(state, action);
        case GET_UNVERIFIED_PRODUCTION_PROCESS_FAIL:
            return getUnverifiedProductionProcessDetailFail(state, action);
        default:
            return state;
    }
}

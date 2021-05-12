import {
    CREATE_EVENT_CONFIG_START,
    CREATE_EVENT_CONFIG_SUCCESS,
    CREATE_EVENT_CONFIG_FAIL
} from '../types/eventconfigTypes';
import { updateObject } from "../utility";

const initialState = {
    eventconfigs: [],
    eventconfig: {},
    loading: false,
    error: null,
}

const createEventConfigStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createEventConfigSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createEventConfigFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function eventconfigs(state = initialState, action){
    switch(action.type){
        case CREATE_EVENT_CONFIG_START:
            return createEventConfigStart(state, action);
        case CREATE_EVENT_CONFIG_SUCCESS:
            return createEventConfigSuccess(state, action);
        case CREATE_EVENT_CONFIG_FAIL:
            return createEventConfigFail(state, action);
        default:
            return state;
    }
}

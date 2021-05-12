import {
    GET_COMPLETED_EVENTS_START,
    GET_COMPLETED_EVENTS_SUCCESS,
    GET_COMPLETED_EVENTS_FAIL,
    CREATE_COMPLETED_EVENT_START,
    CREATE_COMPLETED_EVENT_SUCCESS,
    CREATE_COMPLETED_EVENT_FAIL,
    GET_COMPLETED_EVENT_START,
    GET_COMPLETED_EVENT_SUCCESS,
    GET_COMPLETED_EVENT_FAIL,
    EDIT_COMPLETED_EVENT
} from '../types/completedeventTypes';
import { updateObject } from "../utility";

const initialState = {
    completedevents: [],
    completedevent: {},
    loading: false,
    error: null,
}

const getCompletedEventListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getCompletedEventListSuccess = (state, action) => {
  return updateObject(state, {
    completedevents: action.completedevents,
    error: null,
    loading: false
  });
};

const getCompletedEventListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createCompletedEventStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createCompletedEventSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createCompletedEventFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getCompletedEventDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getCompletedEventDetailSuccess = (state, action) => {
  return updateObject(state, {
    completedevent: action.completedevent,
    error: null,
    loading: false
  });
};

const getCompletedEventDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function completedevents(state = initialState, action){
    switch(action.type){
        case GET_COMPLETED_EVENTS_START:
            return getCompletedEventListStart(state, action);
        case GET_COMPLETED_EVENTS_SUCCESS:
            return getCompletedEventListSuccess(state, action);
        case GET_COMPLETED_EVENTS_FAIL:
            return getCompletedEventListFail(state, action);
        case CREATE_COMPLETED_EVENT_START:
            return createCompletedEventStart(state, action);
        case CREATE_COMPLETED_EVENT_SUCCESS:
            return createCompletedEventSuccess(state, action);
        case CREATE_COMPLETED_EVENT_FAIL:
            return createCompletedEventFail(state, action);
        case GET_COMPLETED_EVENT_START:
        return getCompletedEventDetailStart(state, action);
        case GET_COMPLETED_EVENT_SUCCESS:
            return getCompletedEventDetailSuccess(state, action);
        case GET_COMPLETED_EVENT_FAIL:
            return getCompletedEventDetailFail(state, action);
        case EDIT_COMPLETED_EVENT:
            const arrayList = state.completedevents;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                completedevents: arrayList,
            };
        default:
            return state;
    }
}


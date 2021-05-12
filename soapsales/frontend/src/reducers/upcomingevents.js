import {
    GET_UPCOMING_EVENTS_START,
    GET_UPCOMING_EVENTS_SUCCESS,
    GET_UPCOMING_EVENTS_FAIL,
    GET_UPCOMING_EVENT_START,
    GET_UPCOMING_EVENT_SUCCESS,
    GET_UPCOMING_EVENT_FAIL,
    CREATE_UPCOMING_EVENT_START,
    CREATE_UPCOMING_EVENT_SUCCESS,
    CREATE_UPCOMING_EVENT_FAIL,
    EDIT_UPCOMING_EVENT
} from '../types/upcomingeventTypes';
import { updateObject } from "../utility";

const initialState = {
    upcomingevents: [],
    upcomingevent: {},
    loading: false,
    error: null,
}

const getUpcomingEventListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getUpcomingEventListSuccess = (state, action) => {
  return updateObject(state, {
    upcomingevents: action.upcomingevents,
    error: null,
    loading: false
  });
};

const getUpcomingEventListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createUpcomingEventStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createUpcomingEventSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createUpcomingEventFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getUpcomingEventDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getUpcomingEventDetailSuccess = (state, action) => {
  return updateObject(state, {
    upcomingevent: action.upcomingevent,
    error: null,
    loading: false
  });
};

const getUpcomingEventDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function upcomingevents(state = initialState, action){
    switch(action.type){
        case GET_UPCOMING_EVENTS_START:
            return getUpcomingEventListStart(state, action);
        case GET_UPCOMING_EVENTS_SUCCESS:
            return getUpcomingEventListSuccess(state, action);
        case GET_UPCOMING_EVENTS_FAIL:
            return getUpcomingEventListFail(state, action);
        case GET_UPCOMING_EVENT_START:
            return getUpcomingEventDetailStart(state, action);
        case GET_UPCOMING_EVENT_SUCCESS:
            return getUpcomingEventDetailSuccess(state, action);
        case GET_UPCOMING_EVENT_FAIL:
            return getUpcomingEventDetailFail(state, action);
        case CREATE_UPCOMING_EVENT_START:
            return createUpcomingEventStart(state, action);
        case CREATE_UPCOMING_EVENT_SUCCESS:
            return createUpcomingEventSuccess(state, action);
        case CREATE_UPCOMING_EVENT_FAIL:
            return createUpcomingEventFail(state, action);
        case EDIT_UPCOMING_EVENT:
            const arrayList = state.upcomingevents;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                upcomingevents: arrayList,
            };
        default:
            return state;
    }
}

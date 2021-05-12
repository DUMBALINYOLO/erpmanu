import axios from 'axios';
import {
    GET_UPCOMING_EVENTS_START,
    GET_UPCOMING_EVENTS_SUCCESS,
    GET_UPCOMING_EVENTS_FAIL,
    CREATE_UPCOMING_EVENT_START,
    CREATE_UPCOMING_EVENT_SUCCESS,
    CREATE_UPCOMING_EVENT_FAIL,
    GET_UPCOMING_EVENT_START,
    GET_UPCOMING_EVENT_SUCCESS,
    GET_UPCOMING_EVENT_FAIL,
    EDIT_UPCOMING_EVENT
    } from '../types/upcomingeventTypes';
import { upcomingeventsURL } from '../constants';

//upcoming events
const getUpcomingEventListStart = () => {
  return {
    type: GET_UPCOMING_EVENTS_START
  };
};

const getUpcomingEventListSuccess = upcomingevents => {
  return {
    type: GET_UPCOMING_EVENTS_SUCCESS,
    upcomingevents
  };
};

const getUpcomingEventListFail = error => {
  return {
    type: GET_UPCOMING_EVENTS_FAIL,
    error: error
  };
};

const createUpcomingEventStart = () => {
  return {
    type: CREATE_UPCOMING_EVENT_START
  };
};

const createUpcomingEventSuccess = upcomingevent => {
  return {
    type: CREATE_UPCOMING_EVENT_SUCCESS,
    upcomingevent
  };
};

const createUpcomingEventFail = error => {
  return {
    type: CREATE_UPCOMING_EVENT_FAIL,
    error: error
  };
};

const getUpcomingEventDetailStart = () => {
  return {
    type: GET_UPCOMING_EVENT_START
  };
};

const getUpcomingEventDetailSuccess = upcomingevent => {
  return {
    type: GET_UPCOMING_EVENT_SUCCESS,
    upcomingevent
  };
};

const getUpcomingEventDetailFail = error => {
  return {
    type: GET_UPCOMING_EVENT_FAIL,
    error: error
  };
};

export const getUpcomingEvents = (token) => {
  return dispatch => {
      dispatch(getUpcomingEventListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(upcomingeventsURL, headers)
        .then(res => {
          const upcomingevents = res.data;
          dispatch(getUpcomingEventListSuccess(upcomingevents));
          })
        .catch(err => {
          dispatch(getUpcomingEventListStart(err));
        });
    };
};

export const getUpcomingEvent = (id, token) => {
  return dispatch => {
      dispatch(getUpcomingEventDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${upcomingeventsURL}${id}`, headers)
        .then(res => {
          const upcomingevent = res.data;
          dispatch(getUpcomingEventDetailSuccess(upcomingevent));
          })
        .catch(err => {
          dispatch(getUpcomingEventDetailFail(err));
        });
    };
};

export const addUpcomingEvent = (upcomingevent, token) => {
  return dispatch => {
      dispatch(createUpcomingEventStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(upcomingeventsURL, upcomingevent, headers)
        .then(res => {
          dispatch(createUpcomingEventSuccess(upcomingevent));
        })
        .catch(err => {
          dispatch(createUpcomingEventFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editUpcomingEvent = (id, upcomingevent, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${upcomingeventsURL}${id}/`, upcomingevent, headers)
    .then(res => {
        dispatch({
            type: EDIT_UPCOMING_EVENT,
            payload: res.data
        });
    }).catch(err => console.log(err))
}

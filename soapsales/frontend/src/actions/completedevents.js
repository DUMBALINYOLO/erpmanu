import axios from 'axios';
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
import { completedeventsURL } from '../constants';

//completed events
const getCompletedEventListStart = () => {
  return {
    type: GET_COMPLETED_EVENTS_START
  };
};

const getCompletedEventListSuccess = completedevents => {
  return {
    type: GET_COMPLETED_EVENTS_SUCCESS,
    completedevents
  };
};

const getCompletedEventListFail = error => {
  return {
    type: GET_COMPLETED_EVENTS_FAIL,
    error: error
  };
};

const createCompletedEventStart = () => {
  return {
    type: CREATE_COMPLETED_EVENT_START
  };
};


const createCompletedEventSuccess = completedevent => {
  return {
    type: CREATE_COMPLETED_EVENT_SUCCESS,
    completedevent
  };
};

const createCompletedEventFail = error => {
  return {
    type: CREATE_COMPLETED_EVENT_FAIL,
    error: error
  };
};

const getCompletedEventDetailStart = () => {
  return {
    type: GET_COMPLETED_EVENT_START
  };
};

const getCompletedEventDetailSuccess = completedevent => {
  return {
    type: GET_COMPLETED_EVENT_SUCCESS,
    completedevent
  };
};

const getCompletedEventDetailFail = error => {
  return {
    type: GET_COMPLETED_EVENT_FAIL,
    error: error
  };
};

export const getCompletedEvents = (token) => {
  return dispatch => {
      dispatch(getCompletedEventListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(completedeventsURL, headers)
        .then(res => {
          const completedevents = res.data;
          dispatch(getCompletedEventListSuccess(completedevents));
          })
        .catch(err => {
          dispatch(getCompletedEventListStart(err));
        });
    };
};

export const getCompletedEvent = (id, token) => {
  return dispatch => {
      dispatch(getCompletedEventDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${completedeventsURL}${id}`, headers)
        .then(res => {
          const completedevent = res.data;
          dispatch(getCompletedEventDetailSuccess(completedevent));
          })
        .catch(err => {
          dispatch(getCompletedEventDetailFail(err));
        });
    };
};

export const addCompletedEvent = (completedevent, token) => {
  return dispatch => {
      dispatch(createCompletedEventStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(completedeventsURL, completedevent, headers)
        .then(res => {
          dispatch(createCompletedEventSuccess(completedevent));
        })
        .catch(err => {
          dispatch(createCompletedEventFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editCompletedEvent = (id, completedevent, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${completedeventsURL}${id}/`, completedevent, headers)
    .then(res => {
        dispatch({
            type: EDIT_COMPLETED_EVENT,
            payload: res.data
        });
    }).catch(err => console.log(err))
}

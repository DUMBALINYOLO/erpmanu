import axios from 'axios';
import {
    CREATE_EVENT_CONFIG_START,
	CREATE_EVENT_CONFIG_SUCCESS,		
	CREATE_EVENT_CONFIG_FAIL
    } from '../types/eventconfigTypes';
import { eventconfigURL } from '../constants';

//event configs
const createEventConfigStart = () => {
  return {
    type: CREATE_EVENT_CONFIG_START
  };
};


const createEventConfigSuccess = eventconfig => {
  return {
    type: CREATE_EVENT_CONFIG_SUCCESS,
    eventconfig
  };
};

const createEventConfigFail = error => {
  return {
    type: CREATE_EVENT_CONFIG_FAIL,
    error: error
  };
};

export const addEventConfig = (eventconfig, token) => {
  return dispatch => {
      dispatch(createEventConfigStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(eventconfigURL, eventconfig, headers)
        .then(res => {
          dispatch(createEventConfigSuccess(eventconfig));
        })
        .catch(err => {
          dispatch(createEventConfigFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

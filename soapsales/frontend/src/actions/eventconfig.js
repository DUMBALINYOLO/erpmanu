import axios from 'axios';
import {
        ADD_EVENT_CONFIG,
    } from '../types/eventconfigTypes';
import { eventconfigURL } from '../constants';

// Add
export const addEventConfig = (eventconfig) => dispatch => {
    axios.post(eventconfigURL, eventconfig)
        .then(res => {
            dispatch({
                type: ADD_EVENT_CONFIG,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

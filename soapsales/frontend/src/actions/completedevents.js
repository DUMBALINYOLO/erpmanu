import axios from 'axios';
import {
        ADD_COMPLETED_EVENT,
        GET_COMPLETED_EVENTS,
        DELETE_COMPLETED_EVENT,
        GET_COMPLETED_EVENT
    } from '../types/completedeventTypes';
import { completedeventsURL } from '../constants';

// Get
export const getCompletedEvents = () => dispatch => {
    axios.get(completedeventsURL)
        .then(res => {
            dispatch({
                type: GET_COMPLETED_EVENTS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete
export const deleteCompletedEvent = (id) => dispatch => {
    axios.delete(completedeventsURL, id)
        .then(res => {
            dispatch({
                type: DELETE_COMPLETED_EVENT,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addCompletedEvent = (completedevent) => dispatch => {
    axios.post(completedeventsURL, completedevent)
        .then(res => {
            dispatch({
                type: ADD_COMPLETED_EVENT,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//get
export const getCompletedEvent = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/events/completed-events/${id}`)
        .then(res => {
            dispatch({
                type: GET_COMPLETED_EVENT,
                payload: res.data
            });
        }).catch(err => console.log(err))

}

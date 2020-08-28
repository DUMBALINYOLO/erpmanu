import axios from 'axios';
import {
        ADD_UPCOMING_EVENT,
        GET_UPCOMING_EVENTS,
        DELETE_UPCOMING_EVENT,
        GET_UPCOMING_EVENT
    } from '../types/upcomingeventTypes';
import { upcomingeventsURL } from '../constants';

// Get
export const getUpcomingEvents = () => dispatch => {
    axios.get(upcomingeventsURL)
        .then(res => {
            dispatch({
                type: GET_UPCOMING_EVENTS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete
export const deleteUpcomingEvent = (id) => dispatch => {
    axios.delete(upcomingeventsURL, id)
        .then(res => {
            dispatch({
                type: DELETE_UPCOMING_EVENT,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addUpcomingEvent = (upcomingevent) => dispatch => {
    axios.post(upcomingeventsURL, upcomingevent)
        .then(res => {
            dispatch({
                type: ADD_UPCOMING_EVENT,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//get
export const getUpcomingEvent = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/events/upcoming-events/${id}`)
        .then(res => {
            dispatch({
                type: GET_UPCOMING_EVENT,
                payload: res.data
            });
        }).catch(err => console.log(err))

}

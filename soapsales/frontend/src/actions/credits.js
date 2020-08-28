import axios from 'axios';
import {
        GET_CREDITS,
        DELETE_CREDIT,
        GET_CREDIT
    } from '../types/creditTypes';
import { creditsURL } from '../constants';

// Get
export const getCredits = () => dispatch => {
    axios.get(creditsURL)
        .then(res => {
            dispatch({
                type: GET_CREDITS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete
export const deleteCredit = (id) => dispatch => {
    axios.delete(creditsURL, id)
        .then(res => {
            dispatch({
                type: DELETE_CREDIT,
                payload: id
            });
        }).catch(err => console.log(err))
}

//get
export const getCredit = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/accounting/credits/${id}`)
        .then(res => {
            dispatch({
                type: GET_CREDIT,
                payload: res.data
            });
        }).catch(err => console.log(err))

}

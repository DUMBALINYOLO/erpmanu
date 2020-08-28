import axios from 'axios';
import {
        ADD_COMPANY_SALESREP,
        GET_COMPANY_SALESREPS,
        GET_COMPANY_SALESREP,
        DELETE_COMPANY_SALESREP
    } from '../types/companysalesrepTypes';
import { companysalesrepsURL } from '../constants';

// Get
export const getCompanySalesreps =  () => dispatch => {
    axios.get(companysalesrepsURL)
        .then(res => {
            dispatch({
                type:  GET_COMPANY_SALESREPS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete

export const deleteCompanySalesrep = (id) => dispatch => {
    axios.delete(companysalesrepsURL, id)
        .then(res => {
            dispatch({
                type: DELETE_COMPANY_SALESREP,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addCompanySalesrep = companysalesrep => dispatch => {
    axios.post(companysalesrepsURL, companysalesrep)
        .then(res => {
            dispatch({
                type: ADD_COMPANY_SALESREP,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getCompanySalesrep = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/employees/company-salesreps/${id}`)
        .then(res => {
            dispatch({
                type: GET_COMPANY_SALESREP,
                payload: res.data
            });
        }).catch(err => console.log(err))

}

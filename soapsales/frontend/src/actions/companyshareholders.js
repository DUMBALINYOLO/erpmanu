import axios from 'axios';
import {
        ADD_COMPANY_SHAREHOLDER,
        GET_COMPANY_SHAREHOLDERS,
        GET_COMPANY_SHAREHOLDER,
        DELETE_COMPANY_SHAREHOLDER
    } from '../types/companyshareholderTypes';
import { companyshareholdersURL } from '../constants';

// Get
export const getCompanyShareholders =  () => dispatch => {
    axios.get(companyshareholdersURL)
        .then(res => {
            dispatch({
                type:  GET_COMPANY_SHAREHOLDERS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete

export const deleteCompanyShareholder = (id) => dispatch => {
    axios.delete(companyshareholdersURL, id)
        .then(res => {
            dispatch({
                type: DELETE_COMPANY_SHAREHOLDER,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addCompanyShareholder = companyshareholder => dispatch => {
    axios.post(companyshareholdersURL, companyshareholder)
        .then(res => {
            dispatch({
                type: ADD_COMPANY_SHAREHOLDER,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getCompanyShareholder = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/employees/company-shareholders/${id}`)
        .then(res => {
            dispatch({
                type: GET_COMPANY_SHAREHOLDER,
                payload: res.data
            });
        }).catch(err => console.log(err))

}

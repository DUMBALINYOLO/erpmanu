import axios from 'axios';
import {
        ADD_COMPANY_DRIVER,
        GET_COMPANY_DRIVERS,
        GET_COMPANY_DRIVER,
        DELETE_COMPANY_DRIVER
    } from '../types/companydriverTypes';
import { companydriversURL } from '../constants';

// Get
export const getCompanyDrivers =  () => dispatch => {
    axios.get(companydriversURL)
        .then(res => {
            dispatch({
                type:  GET_COMPANY_DRIVERS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete

export const deleteCompanyDriver = (id) => dispatch => {
    axios.delete(companydriversURL, id)
        .then(res => {
            dispatch({
                type: DELETE_COMPANY_DRIVER,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addCompanyDriver = companydriver => dispatch => {
    axios.post(companydriversURL, companydriver)
        .then(res => {
            dispatch({
                type: ADD_COMPANY_DRIVER,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getCompanyDriver = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/employees/company-drivers/${id}`)
        .then(res => {
            dispatch({
                type: GET_COMPANY_DRIVER,
                payload: res.data
            });
        }).catch(err => console.log(err))

}

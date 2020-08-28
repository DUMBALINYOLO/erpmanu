import axios from 'axios';
import {
        ADD_COMPANY_MANAGER,
        GET_COMPANY_MANAGERS,
        GET_COMPANY_MANAGER,
        DELETE_COMPANY_MANAGER
    } from '../types/companymanagerTypes';
import { companymanagersURL } from '../constants';

// Get
export const getCompanyManagers =  () => dispatch => {
    axios.get(companymanagersURL)
        .then(res => {
            dispatch({
                type:  GET_COMPANY_MANAGERS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete

export const deleteCompanyManager = (id) => dispatch => {
    axios.delete(companymanagersURL, id)
        .then(res => {
            dispatch({
                type: DELETE_COMPANY_MANAGER,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addCompanyManager = companymanager => dispatch => {
    axios.post(companymanagersURL, companymanager)
        .then(res => {
            dispatch({
                type: ADD_COMPANY_MANAGER,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getCompanyManager = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/employees/company-managers/${id}`)
        .then(res => {
            dispatch({
                type: GET_COMPANY_MANAGER,
                payload: res.data
            });
        }).catch(err => console.log(err))

}

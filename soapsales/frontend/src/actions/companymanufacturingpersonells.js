import axios from 'axios';
import {
        ADD_COMPANY_MANUFACTURING_PERSONELL,
        GET_COMPANY_MANUFACTURING_PERSONELLS,
        GET_COMPANY_MANUFACTURING_PERSONELL,
        DELETE_COMPANY_MANUFACTURING_PERSONELL
    } from '../types/companymanufacturingpersonellTypes';
import { companymanufacturingpersonellsURL } from '../constants';

// Get
export const getCompanyManufacturingPersonells =  () => dispatch => {
    axios.get(companymanufacturingpersonellsURL)
        .then(res => {
            dispatch({
                type:  GET_COMPANY_MANUFACTURING_PERSONELLS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete

export const deleteCompanyManufacturingPersonell = (id) => dispatch => {
    axios.delete(companymanufacturingpersonellsURL, id)
        .then(res => {
            dispatch({
                type: DELETE_COMPANY_MANUFACTURING_PERSONELL,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addCompanyManufacturingPersonell = companymanufacturingpersonell => dispatch => {
    axios.post(companymanufacturingpersonellsURL, companymanufacturingpersonell)
        .then(res => {
            dispatch({
                type: ADD_COMPANY_MANUFACTURING_PERSONELL,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getCompanyManufacturingPersonell = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/employees/company-manufacturing-personells/${id}`)
        .then(res => {
            dispatch({
                type: GET_COMPANY_MANUFACTURING_PERSONELL,
                payload: res.data
            });
        }).catch(err => console.log(err))

}

import axios from 'axios';
import {
        ADD_COMPANY_INVENTORY_CONTROLLER,
        GET_COMPANY_INVENTORY_CONTROLLERS,
        GET_COMPANY_INVENTORY_CONTROLLER,
        DELETE_COMPANY_INVENTORY_CONTROLLER
    } from '../types/companyinventorycontrollerTypes';
import { companyinventorycontrollersURL } from '../constants';

// Get
export const getCompanyInventoryControllers =  () => dispatch => {
    axios.get(companyinventorycontrollersURL)
        .then(res => {
            dispatch({
                type:  GET_COMPANY_INVENTORY_CONTROLLERS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete

export const deleteCompanyInventoryController = (id) => dispatch => {
    axios.delete(companyinventorycontrollersURL, id)
        .then(res => {
            dispatch({
                type: DELETE_COMPANY_INVENTORY_CONTROLLER,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addCompanyInventoryController = companyinventorycontroller => dispatch => {
    axios.post(companyinventorycontrollersURL, companyinventorycontroller)
        .then(res => {
            dispatch({
                type: ADD_COMPANY_INVENTORY_CONTROLLER,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getCompanyInventoryController = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/employees/company-inventory-controllers/${id}`)
        .then(res => {
            dispatch({
                type: GET_COMPANY_INVENTORY_CONTROLLER,
                payload: res.data
            });
        }).catch(err => console.log(err))

}

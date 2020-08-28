import axios from 'axios';
import {
        ADD_COMPANY_BOOKKEEPER,
        GET_COMPANY_BOOKKEEPERS,
        GET_COMPANY_BOOKKEEPER,
        DELETE_COMPANY_BOOKKEEPER
    } from '../types/companybookkeeperTypes';
import { companybookkeepersURL } from '../constants';

// Get
export const getCompanyBookkeepers =  () => dispatch => {
    axios.get(companybookkeepersURL)
        .then(res => {
            dispatch({
                type:  GET_COMPANY_BOOKKEEPERS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete

export const deleteCompanyBookkeeper = (id) => dispatch => {
    axios.delete(companybookkeepersURL, id)
        .then(res => {
            dispatch({
                type: DELETE_COMPANY_BOOKKEEPER,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addCompanyBookkeeper = companybookkeeper => dispatch => {
    axios.post(companybookkeepersURL, companybookkeeper)
        .then(res => {
            dispatch({
                type: ADD_COMPANY_BOOKKEEPER,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getCompanyBookkeeper = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/employees/company-bookkeepers/${id}`)
        .then(res => {
            dispatch({
                type: GET_COMPANY_BOOKKEEPER,
                payload: res.data
            });
        }).catch(err => console.log(err))

}

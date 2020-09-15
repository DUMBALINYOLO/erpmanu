import axios from 'axios';
import {
        ADD_WORKBOOK,
        GET_WORKBOOKS,
        DELETE_WORKBOOK,
        GET_WORKBOOK,
        EDIT_WORKBOOK
    } from '../types/workbookTypes';
import { workbooksURL } from '../constants';

// Get
export const getWorkbooks = () => dispatch => {
    axios.get(workbooksURL)
        .then(res => {
            dispatch({
                type: GET_WORKBOOKS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete
export const deleteWorkbook = (id) => dispatch => {
    axios.delete(workbooksURL, id)
        .then(res => {
            dispatch({
                type: DELETE_WORKBOOK,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addWorkbook = (workbook) => dispatch => {
    axios.post(workbooksURL, workbook)
        .then(res => {
            dispatch({
                type: ADD_WORKBOOK,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//get
export const getWorkbook = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/accounting/workbooks/${id}`)
        .then(res => {
            dispatch({
                type: GET_WORKBOOK,
                payload: res.data
            });
        }).catch(err => console.log(err))

}

//Edit
export const editWorkbook = (id, workbook) => dispatch => {
    axios.put(`http://127.0.0.1:8000/api/accounting/workbooks/${id}/`, workbook)
        .then(res => {
            dispatch({
                type: EDIT_WORKBOOK,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

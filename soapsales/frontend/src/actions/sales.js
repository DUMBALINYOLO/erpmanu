import axios from 'axios';
import {
        GET_SALES,
        DELETE_SALE,
        ADD_SALE,
        GET_SALE
    } from '../types/saleTypes';
import { salesURL } from '../constants';

// Get
export const getSales = () => dispatch => {
    axios.get(salesURL)
        .then(res => {
            dispatch({
                type: GET_SALES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

// Add
export const addSale = (sale) => dispatch => {
    axios.post(salesURL, sale)
        .then(res => {
            dispatch({
                type: ADD_SALE,
                payload: res.data
            });
        }).catch(err => console.log(err))
}


//Delete
export const deleteSale = (id) => dispatch => {
    axios.delete(salesURL, id)
        .then(res => {
            dispatch({
                type: DELETE_SALE,
                payload: id
            });
        }).catch(err => console.log(err))
}

//get
export const getSale = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/sales/sales/${id}`)
        .then(res => {
            dispatch({
                type: GET_SALE,
                payload: res.data
            });
        }).catch(err => console.log(err))

}

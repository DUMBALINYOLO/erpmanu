import axios from 'axios';
import { GET_RECEIPTS, GET_RECEIPT, DELETE_RECEIPT } from '../types/receiptTypes';
import { receiptURL } from '../constants';


// Get
export const getReceipts = () => dispatch => {
    axios.get(receiptURL)
        .then(res => {
            dispatch({
                type: GET_RECEIPTS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete

export const deleteReceipt = (id) => dispatch => {
    axios.delete(receiptURL, id)
        .then(res => {
            dispatch({
                type: DELETE_RECEIPT,
                payload: id
            });
        }).catch(err => console.log(err))
}

export const getReceipt = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/sales/receipts/${id}`)
        .then(res => {
            dispatch({
                type: GET_RECEIPT,
                payload: res.data
            });
        }).catch(err => console.log(err))

}

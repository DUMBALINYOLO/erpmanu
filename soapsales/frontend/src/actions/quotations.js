import axios from 'axios';
import { GET_QUOTATIONS, GET_QUOTATION, DELETE_QUOTATION } from '../types/quotationTypes';
import { quotationURL } from '../constants';


// Get
export const getQuotations = () => dispatch => {
    axios.get(quotationURL)
        .then(res => {
            dispatch({
                type: GET_QUOTATIONS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete

export const deleteQuotation = (id) => dispatch => {
    axios.delete(quotationURL, id)
        .then(res => {
            dispatch({
                type: DELETE_QUOTATION,
                payload: id
            });
        }).catch(err => console.log(err))
}

export const getQuotation = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/sales/quotations/${id}`)
        .then(res => {
            dispatch({
                type: GET_QUOTATION,
                payload: res.data
            });
        }).catch(err => console.log(err))

}

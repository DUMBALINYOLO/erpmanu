import axios from 'axios';
import { GET_PROCESS_PRODUCTS, GET_PROCESS_PRODUCT, DELETE_PROCESS_PRODUCT, ADD_PROCESS_PRODUCT } from '../types/processproductTypes';
import { processproductsURL } from '../constants';


// Get
export const getProcessProducts = () => dispatch => {
    axios.get(processproductsURL)
        .then(res => {
            dispatch({
                type: GET_PROCESS_PRODUCTS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete

export const deleteProcessProduct = (id) => dispatch => {
    axios.delete(processproductsURL, id)
        .then(res => {
            dispatch({
                type: DELETE_PROCESS_PRODUCT,
                payload: id
            });
        }).catch(err => console.log(err))
}


// Add
export const addProcessProduct = (processproduct) => dispatch => {
    axios.post(processproductsURL, processproduct)
        .then(res => {
            dispatch({
                type: ADD_PROCESS_PRODUCT,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getProcessProduct = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/manufacture/process-products/${id}`)
        .then(res => {
            dispatch({
                type: GET_PROCESS_PRODUCT,
                payload: res.data
            });
        }).catch(err => console.log(err))

}

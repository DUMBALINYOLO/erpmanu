import axios from 'axios';
import { GET_PRODUCTION_ORDERS, GET_PRODUCTION_ORDER, DELETE_PRODUCTION_ORDER, ADD_PRODUCTION_ORDER } from '../types/productionorderTypes';
import { productionordersURL } from '../constants';


// Get
export const getProductionOrders = () => dispatch => {
    axios.get(productionordersURL)
        .then(res => {
            dispatch({
                type: GET_PRODUCTION_ORDERS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete

export const deleteProductionOrder = (id) => dispatch => {
    axios.delete(productionordersURL, id)
        .then(res => {
            dispatch({
                type: DELETE_PRODUCTION_ORDER,
                payload: id
            });
        }).catch(err => console.log(err))
}


// Add
export const addProductionOrder = (productionorder) => dispatch => {
    axios.post(productionordersURL, productionorder)
        .then(res => {
            dispatch({
                type: ADD_PRODUCTION_ORDER,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getProductionOrder = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/manufacture/production-orders/${id}`)
        .then(res => {
            dispatch({
                type: GET_PRODUCTION_ORDER,
                payload: res.data
            });
        }).catch(err => console.log(err))

}

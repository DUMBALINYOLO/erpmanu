import axios from 'axios';
import { GET_SALES_GROUPS_PRICING_DISCOUNTS, GET_SALES_GROUPS_PRICING_DISCOUNT, DELETE_SALES_GROUPS_PRICING_DISCOUNT, ADD_SALES_GROUPS_PRICING_DISCOUNT } from '../types/salesgroupspricingdiscountTypes';
import { salesgroupspricingdiscountsURL } from '../constants';


// Get
export const getSalesGroupsPricingDiscounts = () => dispatch => {
    axios.get(salesgroupspricingdiscountsURL)
        .then(res => {
            dispatch({
                type: GET_SALES_GROUPS_PRICING_DISCOUNTS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete
export const deleteSalesGroupsPricingDiscount = (id) => dispatch => {
    axios.delete(salesgroupspricingdiscountsURL, id)
        .then(res => {
            dispatch({
                type: DELETE_SALES_GROUPS_PRICING_DISCOUNT,
                payload: id
            });
        }).catch(err => console.log(err))
}


// Add
export const addSalesGroupsPricingDiscount = (salesgroupspricingdiscount) => dispatch => {
    axios.post(salesgroupspricingdiscountsURL, salesgroupspricingdiscount)
        .then(res => {
            dispatch({
                type: ADD_SALES_GROUPS_PRICING_DISCOUNT,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getSalesGroupsPricingDiscount = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/sales/sales-groups-pricing-discounts/${id}`)
        .then(res => {
            dispatch({
                type: GET_SALES_GROUPS_PRICING_DISCOUNT,
                payload: res.data
            });
        }).catch(err => console.log(err))

}

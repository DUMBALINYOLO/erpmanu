import { ADD_SALES_GROUPS_PRICING_DISCOUNT, GET_SALES_GROUPS_PRICING_DISCOUNTS, GET_SALES_GROUPS_PRICING_DISCOUNT, DELETE_SALES_GROUPS_PRICING_DISCOUNT } from '../types/salesgroupspricingdiscountTypes';

const initialState = {
    salesgroupspricingdiscounts: [],
    salesgroupspricingdiscount: [],
    loading: false
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_SALES_GROUPS_PRICING_DISCOUNTS:
            return {
                ...state,
                salesgroupspricingdiscounts: action.payload
            };
        case DELETE_SALES_GROUPS_PRICING_DISCOUNT:
            return {
                ...state,
                salesgroupspricingdiscount: state.salesgroupspricingdiscounts.filter(salesgroupspricingdiscount=> salesgroupspricingdiscount.id !== action.payload)
            };
        case ADD_SALES_GROUPS_PRICING_DISCOUNT:
            return {
                ...state,
                salesgroupspricingdiscount: [...state.salesgroupspricingdiscounts, action.payload]
            };
        case GET_SALES_GROUPS_PRICING_DISCOUNT:
            return {
                ...state,
                salesgroupspricingdiscount: action.payload
            };
        default:
            return state;
    }
}

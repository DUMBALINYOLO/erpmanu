import { GET_CUSTOMER } from '../types/customerTypes';
import {
    ADD_CUSTOMER,
    GET_CUSTOMERS,
    EDIT_CUSTOMER,
    DELETE_CUSTOMER
} from '../types/customerTypes';

const initialState = {
    customers: [],
    customer: [],
    loading: false
}

export default function(state = initialState, action){
switch(action.type){
    case GET_CUSTOMERS:
        return {
            ...state,
            customers: action.payload
        };
    case DELETE_CUSTOMER:
        return {
            ...state,
            customer: state.customers.filter(customer=> customer.id !== action.payload)
        };
    case ADD_CUSTOMER:
        return {
            ...state,
            customer: [...state.customers, action.payload]
        };
    case EDIT_CUSTOMER:
        const arrayList = state.customers;
        arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
        return {
            ...state,
            customers: arrayList,
        };
    default:
        return state;
}
}

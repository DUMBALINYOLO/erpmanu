import {
    ADD_CUSTOMER_ADDRESS,
    GET_CUSTOMER_ADDRESSES ,
    DELETE_CUSTOMER_ADDRESS,
    GET_CUSTOMER_ADDRESS,
} from '../types/customeraddressTypes';

const initialState = {
    customeraddresses: [],
    customeraddress: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_CUSTOMER_ADDRESSES:
            return {
                ...state,
                customeraddresses: action.payload
            };
        case DELETE_CUSTOMER_ADDRESS:
            return {
                ...state,
                customeraddress: state.customeraddresses.filter(customeraddress=> customeraddress.id !== action.payload)
            };
        case ADD_CUSTOMER_ADDRESS:
            return {
                ...state,
                customeraddress: [...state.customeraddresses, action.payload]
            }
        case GET_CUSTOMER_ADDRESS:
            return {
                ...state,
                customeraddress:action.payload
                };
        default:
            return state;
    }
}

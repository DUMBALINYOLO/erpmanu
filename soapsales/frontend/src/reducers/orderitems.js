import {
    ADD_ORDER_ITEM,
    GET_ORDER_ITEMS,
    DELETE_ORDER_ITEM,
    GET_ORDER_ITEM,
} from '../types/orderitemTypes';

const initialState = {
    orderitems: [],
    orderitem: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_ORDER_ITEMS:
            return {
                ...state,
                orderitems: action.payload
            };
        case DELETE_ORDER_ITEM:
            return {
                ...state,
                orderitem: state.orderitems.filter(orderitem=> orderitem.id !== action.payload)
            };
        case ADD_ORDER_ITEM:
            return {
                ...state,
                orderitem: [...state.orderitems, action.payload]
            }
        case GET_ORDER_ITEM:
            return {
                ...state,
                orderitem:action.payload
                };
        default:
            return state;
    }
}

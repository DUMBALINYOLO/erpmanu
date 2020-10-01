import {
    ADD_ORDER_ITEM,
    GET_ORDER_ITEMS,
    DELETE_ORDER_ITEM,
    GET_ORDER_ITEM,
    EDIT_ORDER_ITEM
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
        case EDIT_ORDER_ITEM:
            const arrayList = state.orderitems;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                orderitems: arrayList,
            };
        default:
            return state;
    }
}

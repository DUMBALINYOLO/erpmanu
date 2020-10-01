import {
        ADD_MANUFACTURED_STOCK_ITEM,
        GET_MANUFACTURED_STOCK_ITEMS,
        DELETE_MANUFACTURED_STOCK_ITEM,
        GET_MANUFACTURED_STOCK_ITEM,
        EDIT_MANUFACTURED_STOCK_ITEM
    } from '../types/manufacturedstockitemTypes';

const initialState = {
    manufacturedstockitems: [],
    manufacturedstockitem: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_MANUFACTURED_STOCK_ITEMS:
            return {
                ...state,
                manufacturedstockitems: action.payload
            };
        case DELETE_MANUFACTURED_STOCK_ITEM:
            return {
                ...state,
                manufacturedstockitem: state.manufacturedstockitems.filter(manufacturedstockitem=> manufacturedstockitem.id !== action.payload)
            };
        case ADD_MANUFACTURED_STOCK_ITEM:
            return {
                ...state,
                manufacturedstockitem: [...state.manufacturedstockitems, action.payload]
            }
        case GET_MANUFACTURED_STOCK_ITEM:
            return {
                ...state,
                manufacturedstockitem:action.payload
            };
        case EDIT_MANUFACTURED_STOCK_ITEM:
            const arrayList = state.manufacturedstockitems;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                manufacturedstockitems: arrayList,
            };
        default:
            return state;
    }
}

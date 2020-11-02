import { GET_STOCK_ADJUSTMENTS, EDIT_STOCK_ADJUSTMENT, GET_STOCK_ADJUSTMENT, DELETE_STOCK_ADJUSTMENT, ADD_STOCK_ADJUSTMENT  } from '../types/stockadjustmentTypes';

const initialState = {
    stockadjustments: [],
    stockadjustment: [],
    loading: false
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_STOCK_ADJUSTMENTS:
            return {
                ...state,
                stockadjustments: action.payload
            };
        case DELETE_STOCK_ADJUSTMENT:
            return {
                ...state,
                stockadjustment: state.stockadjustments.filter(stockadjustment => stockadjustment.id !== action.payload)
            };
        case ADD_STOCK_ADJUSTMENT:
            return {
                ...state,
                stockadjustment: [...state.stockadjustments, action.payload]
            };
        case GET_STOCK_ADJUSTMENT:
            return {
                ...state,
                stockadjustment: action.payload
            };
        case EDIT_STOCK_ADJUSTMENT:
            const arrayList = state.stockadjustments;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                stockadjustments: arrayList,
            };
        default:
            return state;
    }
}

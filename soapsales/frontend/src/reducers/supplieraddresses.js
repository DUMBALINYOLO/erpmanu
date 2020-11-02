import {
    ADD_SUPPLIER_ADDRESS,
    GET_SUPPLIER_ADDRESSES,
    DELETE_SUPPLIER_ADDRESS,
    GET_SUPPLIER_ADDRESS,
    EDIT_SUPPLIER_ADDRESS
} from '../types/supplieraddressTypes';

const initialState = {
    supplieraddresses: [],
    supplieraddress: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_SUPPLIER_ADDRESSES:
            return {
                ...state,
                supplieraddresses: action.payload
            };
        case DELETE_SUPPLIER_ADDRESS:
            return {
                ...state,
                supplieraddress: state.supplieraddresses.filter(supplieraddress=> supplieraddress.id !== action.payload)
            };
        case ADD_SUPPLIER_ADDRESS:
            return {
                ...state,
                supplieraddress: [...state.supplieraddresses, action.payload]
            }
        case GET_SUPPLIER_ADDRESS:
            return {
                ...state,
                supplieraddress:action.payload
            };
        case EDIT_SUPPLIER_ADDRESS:
            const arrayList = state.supplieraddresses;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                supplieraddresses: arrayList,
            };
        default:
            return state;
    }
}

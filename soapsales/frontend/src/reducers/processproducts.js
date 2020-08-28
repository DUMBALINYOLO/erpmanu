import { GET_PROCESS_PRODUCTS, GET_PROCESS_PRODUCT, DELETE_PROCESS_PRODUCT, ADD_PROCESS_PRODUCT  } from "../types/processproductTypes";

const initialState = {
    processproducts: [],
    processproduct: [],
    loading: false
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_PROCESS_PRODUCTS:
            return {
                ...state,
                processproducts: action.payload
            };
        case DELETE_PROCESS_PRODUCT:
            return {
                ...state,
                processproduct: state.processproducts.filter(processproduct => processproduct.id !== action.payload)
            };
        case ADD_PROCESS_PRODUCT:
            return {
                ...state,
                processproduct: [...state.processproducts, action.payload]
            };
        case GET_PROCESS_PRODUCT:
            return {
                ...state,
                processproduct: action.payload
            };
        default:
            return state;
    }
}

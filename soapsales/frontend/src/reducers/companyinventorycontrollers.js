import {
        ADD_COMPANY_INVENTORY_CONTROLLER,
        GET_COMPANY_INVENTORY_CONTROLLERS,
        DELETE_COMPANY_INVENTORY_CONTROLLER,
        GET_COMPANY_INVENTORY_CONTROLLER
    } from '../types/companyinventorycontrollerTypes';

const initialState = {
    companyinventorycontrollers: [],
    companyinventorycontroller: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_COMPANY_INVENTORY_CONTROLLERS:
            return {
                ...state,
                companyinventorycontrollers: action.payload
            };
        case DELETE_COMPANY_INVENTORY_CONTROLLER:
            return {
                ...state,
                companyinventorycontroller: state.companyinventorycontrollers.filter(companyinventorycontroller=> companyinventorycontroller.id !== action.payload)
            };
        case ADD_COMPANY_INVENTORY_CONTROLLER:
            return {
                ...state,
                companyinventorycontroller: [...state.companyinventorycontrollers, action.payload]
            }
        case GET_COMPANY_INVENTORY_CONTROLLER:
            return {
                ...state,
                companyinventorycontroller:action.payload
                };
        default:
            return state;
    }
}

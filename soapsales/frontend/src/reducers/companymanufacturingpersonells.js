import {
        ADD_COMPANY_MANUFACTURING_PERSONELL,
        GET_COMPANY_MANUFACTURING_PERSONELLS,
        DELETE_COMPANY_MANUFACTURING_PERSONELL,
        GET_COMPANY_MANUFACTURING_PERSONELL
    } from '../types/companymanufacturingpersonellTypes';

const initialState = {
    companymanufacturingpersonells: [],
    companymanufacturingpersonell: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_COMPANY_MANUFACTURING_PERSONELLS:
            return {
                ...state,
                companymanufacturingpersonells: action.payload
            };
        case DELETE_COMPANY_MANUFACTURING_PERSONELL:
            return {
                ...state,
                companymanufacturingpersonell: state.companymanufacturingpersonells.filter(companymanufacturingpersonell=> companymanufacturingpersonell.id !== action.payload)
            };
        case ADD_COMPANY_MANUFACTURING_PERSONELL:
            return {
                ...state,
                companymanufacturingpersonell: [...state.companymanufacturingpersonells, action.payload]
            }
        case GET_COMPANY_MANUFACTURING_PERSONELL:
            return {
                ...state,
                companymanufacturingpersonell:action.payload
                };
        default:
            return state;
    }
}

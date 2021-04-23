import {
        ADD_COMPANY_BRANCH,
        GET_COMPANY_BRANCHES,
        DELETE_COMPANY_BRANCH,
        GET_COMPANY_BRANCH,
        EDIT_COMPANY_BRANCH
    } from '../types/configurationsTypes';

const initialState = {
    companybranches: [],
    companybranch: [],
    loading: false
}

export default function(state = initialState, action){
switch(action.type){
    case GET_COMPANY_BRANCHES:
        return {
            ...state,
            companybranches: action.payload
        };
    case DELETE_COMPANY_BRANCH:
        return {
            ...state,
            companybranch: state.companybranches.filter(companybranch=> companybranch.id !== action.payload)
        };
    case ADD_COMPANY_BRANCH:
        return {
            ...state,
            companybranch: [...state.companybranches, action.payload]
        };
    case EDIT_COMPANY_BRANCH:
        const arrayList = state.companybranches;
        arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
        return {
            ...state,
            companybranches: arrayList,
        };
    default:
        return state;
}
}

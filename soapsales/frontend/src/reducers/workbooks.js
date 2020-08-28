import {
        ADD_WORKBOOK,
        GET_WORKBOOKS,
        DELETE_WORKBOOK,
        GET_WORKBOOK
    } from '../types/workbookTypes';

const initialState = {
    workbooks: [],
    workbook: [],
    loading: false

}

export default function(state = initialState, action){
    switch(action.type){
        case GET_WORKBOOKS:
            return {
                ...state,
                workbooks: action.payload
            };
        case DELETE_WORKBOOK:
            return {
                ...state,
                workbook: state.workbooks.filter(workbook=> workbook.id !== action.payload)
            };
        case ADD_WORKBOOK:
            return {
                ...state,
                workbook: [...state.workbooks, action.payload]
            }
        case GET_WORKBOOK:
            return {
                ...state,
                workbook:action.payload
                };
        default:
            return state;
    }
}

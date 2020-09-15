import {
        ADD_WORKBOOK,
        GET_WORKBOOKS,
        DELETE_WORKBOOK,
        GET_WORKBOOK,
        EDIT_WORKBOOK
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
        case EDIT_WORKBOOK:
            const arrayList = state.workbooks;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                workbooks: arrayList,
            };
        default:
            return state;
    }
}

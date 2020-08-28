import { GET_ACCOUNTING_PERIODS_CHOICES } from '../actions/types.js';

const initialState = {
   accountingperiodschoices : [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_ACCOUNTING_PERIODS_CHOICES:
            return {
                ...state,
                accountingperiodschoices : action.payload
            };
        default:
            return state;
    }
}

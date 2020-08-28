import { GET_ACCOUNT_BALANCE_SHEET_CATEGORIES_CHOICES } from '../actions/types.js';

const initialState = {
   accountbalancesheetcategorieschoices : [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_ACCOUNT_BALANCE_SHEET_CATEGORIES_CHOICES:
            return {
                ...state,
                accountbalancesheetcategorieschoices : action.payload
            };
        default:
            return state;
    }
}

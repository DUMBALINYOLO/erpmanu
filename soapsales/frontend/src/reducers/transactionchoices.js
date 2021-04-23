import {
    GET_TRANSACTION_TYPE_CHOICES,
    GET_TRANSACTION_STATUS_CHOICES,

} from '../types/choiceTypes';


const initialState = {
    transactiontypechoices: [],
    transactionstatuschoices: [],
}



export default function (state = initialState, action){
    switch(action.type){
        case GET_TRANSACTION_TYPE_CHOICES:
            return {
                ...state,
                transactiontypechoices: action.payload
            };
        case GET_TRANSACTION_STATUS_CHOICES:
            return {
                ...state,
                transactionstatuschoices: action.payload
            };
        default:
            return state;
    }
}

import {
    GET_ONETIER_TRANSACTIONS_ADMIN_VIEW,
    GET_ONETIER_TRANSACTION_ADMIN_VIEW,
    EDIT_ONETIER_TRANSACTION_ADMIN_VIEW,
    ADD_ONETIER_TRANSACTION_ADMIN_VIEW,
    GET_TWOTIER_TRANSACTIONS_ADMIN_VIEW,
    GET_TWOTIER_TRANSACTION_ADMIN_VIEW,
    EDIT_TWOTIER_TRANSACTION_ADMIN_VIEW,
    ADD_TWOTIER_TRANSACTION_ADMIN_VIEW,
    GET_CANCELLED_TRANSACTIONS_ADMIN_VIEW,
    GET_ARCHIVED_TRANSACTIONS_ADMIN_VIEW,
    GET_CANCELLED_TRANSACTION_ADMIN_VIEW,
    GET_ARCHIVED_TRANSACTION_ADMIN_VIEW,
    GET_LOADING_POINTS,
    ADD_LOADING_POINT,
    EDIT_LOADING_POINT,
} from '../types/transactionTypes';



const initialState = {
    adminonetiertransactions: [],
    adminonetiertransaction: {},
    admintwotiertransactions: [],
    admintwotiertransaction: {},
    admincancelledtransactions: [],
    admincancelledtransaction: {},
    adminarchivedtransactions: [],
    adminarchivedtransaction: {},
    loadingpoints: [],

}

export default function a(state = initialState, action){
    switch(action.type){
        case GET_ONETIER_TRANSACTIONS_ADMIN_VIEW:
            return {
                ...state,
                adminonetiertransaction: action.payload
            };
        case ADD_ONETIER_TRANSACTION_ADMIN_VIEW:
            return {
                ...state,
                transaction: [...state.adminonetiertransaction, action.payload]
            };
        case EDIT_ONETIER_TRANSACTION_ADMIN_VIEW:
            const onearrayList = state.adminonetiertransaction;
            onearrayList.splice(onearrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                adminonetiertransactions: onearrayList,
            };
        case GET_ONETIER_TRANSACTION_ADMIN_VIEW:
            return {
                ...state,
                adminonetiertransaction:action.payload
            };
        case GET_TWOTIER_TRANSACTIONS_ADMIN_VIEW:
            return {
                ...state,
                admintwotiertransactions: action.payload
            };
        case ADD_TWOTIER_TRANSACTION_ADMIN_VIEW:
            return {
                ...state,
                transaction: [...state.admintwotiertransaction, action.payload]
            };
        case EDIT_TWOTIER_TRANSACTION_ADMIN_VIEW:
            const twoarrayList = state.adminonetiertransaction;
            twoarrayList.splice(twoarrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                admintwotiertransactions: twoarrayList,
            };
        case GET_TWOTIER_TRANSACTION_ADMIN_VIEW:
                return {
                    ...state,
                    admintwotiertransaction:action.payload
                };
        case GET_CANCELLED_TRANSACTIONS_ADMIN_VIEW:
            return {
                ...state,
                admincancelledtransactions: action.payload
            };
        case GET_CANCELLED_TRANSACTION_ADMIN_VIEW:
            return {
                ...state,
                admincancelledtransaction: action.payload
            };
        case GET_ARCHIVED_TRANSACTIONS_ADMIN_VIEW:
            return {
                ...state,
                adminarchivedtransactions: action.payload
            };
        case GET_ARCHIVED_TRANSACTION_ADMIN_VIEW:
            return {
                ...state,
                adminarchivedtransaction: action.payload
            };

        case GET_LOADING_POINTS:
            return {
                ...state,
                loadingpoints: action.payload
            };
        case ADD_LOADING_POINT:
            return {
                ...state,
                point: [...state.loadingpoints, action.payload]
            };
        case EDIT_LOADING_POINT:
            const loarrayList = state.loadingpoints;
            loarrayList.splice(loarrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                admintwotiertransactions: loarrayList,
            };
        default:
            return state;
    }
}

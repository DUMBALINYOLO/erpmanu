import { ADD_EMPLOYEE_PAY_COMMISSION_RULE, EDIT_EMPLOYEE_PAY_COMMISSION_RULE, GET_EMPLOYEE_PAY_COMMISSION_RULES, GET_EMPLOYEE_PAY_COMMISSION_RULE, DELETE_EMPLOYEE_PAY_COMMISSION_RULE } from '../types/employeepaycommissionruleTypes';

const initialState = {
    employeepaycommissionrules: [],
    employeepaycommissionrule: [],
    loading: false
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_EMPLOYEE_PAY_COMMISSION_RULES:
            return {
                ...state,
                employeepaycommissionrules: action.payload
            };
        case DELETE_EMPLOYEE_PAY_COMMISSION_RULE:
            return {
                ...state,
                employeepaycommissionrule: state.employeepaycommissionrules.filter(employeepaycommissionrule=> employeepaycommissionrule.id !== action.payload)
            };
        case ADD_EMPLOYEE_PAY_COMMISSION_RULE:
            return {
                ...state,
                employeepaycommissionrule: [...state.employeepaycommissionrules, action.payload]
            }
        case GET_EMPLOYEE_PAY_COMMISSION_RULE:
            return {
                ...state,
                employeepaycommissionrule:action.payload
            };
        case EDIT_EMPLOYEE_PAY_COMMISSION_RULE:
            const arrayList = state.employeepaycommissionrules;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                employeepaycommissionrules: arrayList,
            };
        default:
            return state;
    }
}

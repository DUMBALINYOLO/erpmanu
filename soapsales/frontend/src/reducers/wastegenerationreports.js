import { GET_WASTE_GENERATION_REPORTS, GET_WASTE_GENERATION_REPORT, DELETE_WASTE_GENERATION_REPORT, ADD_WASTE_GENERATION_REPORT  } from "../types/wastegenerationreportTypes";

const initialState = {
    wastegenerationreports: [],
    wastegenerationreport: [],
    loading: false
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_WASTE_GENERATION_REPORTS:
            return {
                ...state,
                wastegenerationreports: action.payload
            };
        case DELETE_WASTE_GENERATION_REPORT:
            return {
                ...state,
                wastegenerationreport: state.wastegenerationreports.filter(wastegenerationreport => wastegenerationreport.id !== action.payload)
            };
        case ADD_WASTE_GENERATION_REPORT:
            return {
                ...state,
                wastegenerationreport: [...state.wastegenerationreports, action.payload]
            };
        case GET_WASTE_GENERATION_REPORT:
            return {
                ...state,
                wastegenerationreport: action.payload
            };
        default:
            return state;
    }
}

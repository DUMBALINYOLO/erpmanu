import { GET_WASTE_GENERATION_REPORTS, EDIT_WASTE_GENERATION_REPORT, GET_WASTE_GENERATION_REPORT, DELETE_WASTE_GENERATION_REPORT, ADD_WASTE_GENERATION_REPORT  } from "../types/wastegenerationreportTypes";

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
        case EDIT_WASTE_GENERATION_REPORT:
            const arrayList = state.wastegenerationreports;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                wastegenerationreports: arrayList,
            };
        default:
            return state;
    }
}

import { GET_PROCESS_RATES, GET_PROCESS_RATE, EDIT_PROCESS_RATE, DELETE_PROCESS_RATE, ADD_PROCESS_RATE  } from "../types/processrateTypes";

const initialState = {
    processrates: [],
    processrate: [],
    loading: false
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_PROCESS_RATES:
            return {
                ...state,
                processrates: action.payload
            };
        case DELETE_PROCESS_RATE:
            return {
                ...state,
                processrate: state.processrates.filter(processrate => processrate.id !== action.payload)
            };
        case ADD_PROCESS_RATE:
            return {
                ...state,
                processrate: [...state.processrates, action.payload]
            };
        case GET_PROCESS_RATE:
            return {
                ...state,
                processrate: action.payload
            };
        case EDIT_PROCESS_RATE:
            const arrayList = state.processrates;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                processrates: arrayList,
            };
        default:
            return state;
    }
}

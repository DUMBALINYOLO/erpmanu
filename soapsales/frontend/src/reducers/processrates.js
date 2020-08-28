import { GET_PROCESS_RATES, GET_PROCESS_RATE, DELETE_PROCESS_RATE, ADD_PROCESS_RATE  } from "../types/processrateTypes";

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
        default:
            return state;
    }
}

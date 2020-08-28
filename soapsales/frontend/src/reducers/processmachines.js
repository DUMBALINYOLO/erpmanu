import { GET_PROCESS_MACHINES, GET_PROCESS_MACHINE, DELETE_PROCESS_MACHINE, ADD_PROCESS_MACHINE  } from "../types/processmachineTypes";

const initialState = {
    processmachines: [],
    processmachine: [],
    loading: false,
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_PROCESS_MACHINES:
            return {
                ...state,
                processmachines: action.payload
            };
        case DELETE_PROCESS_MACHINE:
            return {
                ...state,
                processmachine: state.processmachines.filter(processmachine => processmachine.id !== action.payload)
            };
        case ADD_PROCESS_MACHINE:
            return {
                ...state,
                processmachine: [...state.processmachines, action.payload]
            };
        case GET_PROCESS_MACHINE:
            return {
                ...state,
                processmachine: action.payload
            };
        default:
            return state;
    }
}

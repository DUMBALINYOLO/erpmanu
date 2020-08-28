import { GET_PROCESS_MACHINE_GROUPS, GET_PROCESS_MACHINE_GROUP, DELETE_PROCESS_MACHINE_GROUP, ADD_PROCESS_MACHINE_GROUP  } from "../types/processmachinegroupTypes";

const initialState = {
    processmachinegroups: [],
    processmachinegroup: [],
    loading: false,
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_PROCESS_MACHINE_GROUPS:
            return {
                ...state,
                processmachinegroups: action.payload
            };
        case DELETE_PROCESS_MACHINE_GROUP:
            return {
                ...state,
                processmachinegroup: state.processmachinegroups.filter(processmachinegroup => processmachinegroup.id !== action.payload)
            };
        case ADD_PROCESS_MACHINE_GROUP:
            return {
                ...state,
                processmachinegroup: [...state.processmachinegroups, action.payload]
            };
        case GET_PROCESS_MACHINE_GROUP:
            return {
                ...state,
                processmachinegroup: action.payload
            };
        default:
            return state;
    }
}

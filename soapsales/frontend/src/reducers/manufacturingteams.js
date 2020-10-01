import { ADD_MANUFACTURING_TEAM, EDIT_MANUFACTURING_TEAM, GET_MANUFACTURING_TEAMS, GET_MANUFACTURING_TEAM, DELETE_MANUFACTURING_TEAM } from '../types/manufacturingteamTypes';

const initialState = {
    manufacturingteams: [],
    manufacturingteam: [],
    loading: false
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_MANUFACTURING_TEAMS:
            return {
                ...state,
                manufacturingteams: action.payload
            };
        case DELETE_MANUFACTURING_TEAM:
            return {
                ...state,
                manufacturingteam: state.manufacturingteams.filter(manufacturingteam=> manufacturingteam.id !== action.payload)
            };
        case ADD_MANUFACTURING_TEAM:
            return {
                ...state,
                manufacturingteam: [...state.manufacturingteams, action.payload]
            }
        case GET_MANUFACTURING_TEAM:
            return {
                ...state,
                manufacturingteam:action.payload
            };
        case EDIT_MANUFACTURING_TEAM:
            const arrayList = state.manufacturingteams;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                manufacturingteams: arrayList,
            };
        default:
            return state;
    }
}

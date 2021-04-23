import {
    ADD_SCALE,
    GET_SCALES,
    GET_SCALE,
    EDIT_SCALE,
    GET_SCALE_INPUT_METHODS,
    GET_SERIAL_PORT_CHOICES,
} from '../types/scaleTypes';


const initialState = {
    scales: [],
    scale: {},
    scaleinputmethods: [],
    serialportschoices: [],

}

export default function APP(state = initialState, action){
switch(action.type){
    case GET_SCALES:
        return {
            ...state,
            scales: action.payload
        };
    case GET_SCALE:
        return {
            ...state,
            scale: action.payload
        };

    case ADD_SCALE:
        return {
            ...state,
            scale: [...state.scales, action.payload]
        };
    case EDIT_SCALE:
        return {
            ...state,
            scales: state.scales.map(x => x.id === action.payload.id ? action.payload : x)
        }
    case GET_SCALE_INPUT_METHODS:
        return {
            ...state,
            scaleinputmethods: action.payload
        };
    case GET_SERIAL_PORT_CHOICES:
        return {
            ...state,
            serialportschoices: action.payload
        };
    default:
        return state;
}
}

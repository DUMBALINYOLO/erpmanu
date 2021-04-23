import {
    ADD_VEHICLE,
    EDIT_VEHICLE,
    GET_VEHICLES,
    GET_VEHICLE_TYPE_CHOICES

} from '../types/vehicleTypes';


const initialState = {
    vehicles: [],
    vehicletypechoices: []

}


export default function (state = initialState, action){
    switch(action.type){
        case GET_VEHICLE_TYPE_CHOICES:
            return {
                ...state,
                vehicletypechoices: action.payload
            };
        case GET_VEHICLES:
            return {
                ...state,
                vehicles: action.payload
            };
        case ADD_VEHICLE:
            return {
                ...state,
                vehicle: [...state.vehicle, action.payload]
            };
        case EDIT_VEHICLE:
            const onearrayList = state.vehicles;
            onearrayList.splice(onearrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                vehicles: onearrayList,
            };
       
        default:
            return state;
    }
}

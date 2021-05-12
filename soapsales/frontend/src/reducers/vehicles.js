import {
    GET_VEHICLES_START,
    GET_VEHICLES_SUCCESS,
    GET_VEHICLES_FAIL,
    GET_VEHICLE_START,
    GET_VEHICLE_SUCCESS,
    GET_VEHICLE_FAIL,
    CREATE_VEHICLE_START,
    CREATE_VEHICLE_SUCCESS,
    CREATE_VEHICLE_FAIL,
    EDIT_VEHICLE
} from '../types/vehicleTypes';
import { updateObject } from "../utility";

const initialState = {
    vehicles: [],
    vehicle: {},
    loading: false,
    error: null,
}

const getVehicleListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getVehicleListSuccess = (state, action) => {
  return updateObject(state, {
    vehicles: action.vehicles,
    error: null,
    loading: false
  });
};

const getVehicleListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createVehicleStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createVehicleSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createVehicleFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getVehicleDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getVehicleDetailSuccess = (state, action) => {
  return updateObject(state, {
    vehicle: action.vehicle,
    error: null,
    loading: false
  });
};

const getVehicleDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function vehicles(state = initialState, action){
    switch(action.type){
        case GET_VEHICLES_START:
            return getVehicleListStart(state, action);
        case GET_VEHICLES_SUCCESS:
            return getVehicleListSuccess(state, action);
        case GET_VEHICLES_FAIL:
            return getVehicleListFail(state, action);
        case GET_VEHICLE_START:
            return getVehicleDetailStart(state, action);
        case GET_VEHICLE_SUCCESS:
            return getVehicleDetailSuccess(state, action);
        case GET_VEHICLE_FAIL:
            return getVehicleDetailFail(state, action);
        case CREATE_VEHICLE_START:
            return createVehicleStart(state, action);
        case CREATE_VEHICLE_SUCCESS:
            return createVehicleSuccess(state, action);
        case CREATE_VEHICLE_FAIL:
            return createVehicleFail(state, action);
        case EDIT_VEHICLE:
            const arrayList = state.vehicles;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                vehicles: arrayList,
            };
        default:
            return state;
    }
}

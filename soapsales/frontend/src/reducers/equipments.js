import {
    GET_EQUIPMENTS_START,
    GET_EQUIPMENTS_SUCCESS,
    GET_EQUIPMENTS_FAIL,
    CREATE_EQUIPMENT_START,
    CREATE_EQUIPMENT_SUCCESS,
    CREATE_EQUIPMENT_FAIL,
    GET_EQUIPMENT_START,
    GET_EQUIPMENT_SUCCESS,
    GET_EQUIPMENT_FAIL,
    EDIT_EQUIPMENT
} from '../types/equipmentTypes';
import { updateObject } from "../utility";

const initialState = {
    equipments: [],
    equipment: {},
    loading: false,
    error: null,
}

const getEquipmentListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getEquipmentListSuccess = (state, action) => {
  return updateObject(state, {
    equipments: action.equipments,
    error: null,
    loading: false
  });
};

const getEquipmentListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createEquipmentStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createEquipmentSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createEquipmentFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getEquipmentDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getEquipmentDetailSuccess = (state, action) => {
  return updateObject(state, {
    equipment: action.equipment,
    error: null,
    loading: false
  });
};

const getEquipmentDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function equipments(state = initialState, action){
    switch(action.type){
        case GET_EQUIPMENTS_START:
            return getEquipmentListStart(state, action);
        case GET_EQUIPMENTS_SUCCESS:
            return getEquipmentListSuccess(state, action);
        case GET_EQUIPMENTS_FAIL:
            return getEquipmentListFail(state, action);
        case CREATE_EQUIPMENT_START:
            return createEquipmentStart(state, action);
        case CREATE_EQUIPMENT_SUCCESS:
            return createEquipmentSuccess(state, action);
        case CREATE_EQUIPMENT_FAIL:
            return createEquipmentFail(state, action);
        case GET_EQUIPMENT_START:
        return getEquipmentDetailStart(state, action);
        case GET_EQUIPMENT_SUCCESS:
            return getEquipmentDetailSuccess(state, action);
        case GET_EQUIPMENT_FAIL:
            return getEquipmentDetailFail(state, action);
        case EDIT_EQUIPMENT:
            const arrayList = state.equipments;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                equipments: arrayList,
            };
        default:
            return state;
    }
}

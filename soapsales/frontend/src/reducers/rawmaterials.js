import {
    GET_RAW_MATERIALS_START,
    GET_RAW_MATERIALS_SUCCESS,
    GET_RAW_MATERIALS_FAIL,
    GET_RAW_MATERIAL_START,
    GET_RAW_MATERIAL_SUCCESS,
    GET_RAW_MATERIAL_FAIL,
    CREATE_RAW_MATERIAL_START,
    CREATE_RAW_MATERIAL_SUCCESS,
    CREATE_RAW_MATERIAL_FAIL,
    EDIT_RAW_MATERIAL
} from '../types/rawmaterialTypes';
import { updateObject } from "../utility";

const initialState = {
    rawmaterials: [],
    rawmaterial: {},
    loading: false,
    error: null,
}

const getRawMaterialListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getRawMaterialListSuccess = (state, action) => {
  return updateObject(state, {
    rawmaterials: action.rawmaterials,
    error: null,
    loading: false
  });
};

const getRawMaterialListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createRawMaterialStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createRawMaterialSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createRawMaterialFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getRawMaterialDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getRawMaterialDetailSuccess = (state, action) => {
  return updateObject(state, {
    rawmaterial: action.rawmaterial,
    error: null,
    loading: false
  });
};

const getRawMaterialDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function rawmaterials(state = initialState, action){
    switch(action.type){
        case GET_RAW_MATERIALS_START:
            return getRawMaterialListStart(state, action);
        case GET_RAW_MATERIALS_SUCCESS:
            return getRawMaterialListSuccess(state, action);
        case GET_RAW_MATERIALS_FAIL:
            return getRawMaterialListFail(state, action);
        case GET_RAW_MATERIAL_START:
            return getRawMaterialDetailStart(state, action);
        case GET_RAW_MATERIAL_SUCCESS:
            return getRawMaterialDetailSuccess(state, action);
        case GET_RAW_MATERIAL_FAIL:
            return getRawMaterialDetailFail(state, action);
        case CREATE_RAW_MATERIAL_START:
            return createRawMaterialStart(state, action);
        case CREATE_RAW_MATERIAL_SUCCESS:
            return createRawMaterialSuccess(state, action);
        case CREATE_RAW_MATERIAL_FAIL:
            return createRawMaterialFail(state, action);
        case EDIT_RAW_MATERIAL:
            const arrayList = state.rawmaterials;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                rawmaterials: arrayList,
            };
        default:
            return state;
    }
}

import { 
    GET_MANUFACTURING_PERSONELS_START,
    GET_MANUFACTURING_PERSONELS_SUCCESS,
    GET_MANUFACTURING_PERSONELS_FAIL,
    GET_MANUFACTURING_PERSONEL_START,
    GET_MANUFACTURING_PERSONEL_SUCCESS,
    GET_MANUFACTURING_PERSONEL_FAIL,
    CREATE_MANUFACTURING_PERSONEL_START,
    CREATE_MANUFACTURING_PERSONEL_SUCCESS,
    CREATE_MANUFACTURING_PERSONEL_FAIL,
    EDIT_MANUFACTURING_PERSONEL
} from '../types/manufacturingpersonelTypes';
import { updateObject } from "../utility";

const initialState = {
    manufacturingpersonels: [],
    manufacturingpersonel: {},
    loading: false,
    error: null,
}

const getManufacturingPersonelListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getManufacturingPersonelListSuccess = (state, action) => {
  return updateObject(state, {
    manufacturingpersonels: action.manufacturingpersonels,
    error: null,
    loading: false
  });
};

const getManufacturingPersonelListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createManufacturingPersonelStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createManufacturingPersonelSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createManufacturingPersonelFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getManufacturingPersonelDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getManufacturingPersonelDetailSuccess = (state, action) => {
  return updateObject(state, {
    manufacturingpersonel: action.manufacturingpersonel,
    error: null,
    loading: false
  });
};

const getManufacturingPersonelDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function manufacturingpersonels(state = initialState, action){
    switch(action.type){
        case GET_MANUFACTURING_PERSONELS_START:
            return getManufacturingPersonelListStart(state, action);
        case GET_MANUFACTURING_PERSONELS_SUCCESS:
            return getManufacturingPersonelListSuccess(state, action);
        case GET_MANUFACTURING_PERSONELS_FAIL:
            return getManufacturingPersonelListFail(state, action);
        case GET_MANUFACTURING_PERSONEL_START:
            return getManufacturingPersonelDetailStart(state, action);
        case GET_MANUFACTURING_PERSONEL_SUCCESS:
            return getManufacturingPersonelDetailSuccess(state, action);
        case GET_MANUFACTURING_PERSONEL_FAIL:
            return getManufacturingPersonelDetailFail(state, action);
        case CREATE_MANUFACTURING_PERSONEL_START:
            return createManufacturingPersonelStart(state, action);
        case CREATE_MANUFACTURING_PERSONEL_SUCCESS:
            return createManufacturingPersonelSuccess(state, action);
        case CREATE_MANUFACTURING_PERSONEL_FAIL:
            return createManufacturingPersonelFail(state, action);
        case EDIT_MANUFACTURING_PERSONEL:
            const arrayList = state.manufacturingpersonels;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                manufacturingpersonels: arrayList,
            };
        default:
            return state;
    }
}

import {
    GET_CONSUMABLES_START,
    GET_CONSUMABLES_SUCCESS,
    GET_CONSUMABLES_FAIL,
    CREATE_CONSUMABLE_START,
    CREATE_CONSUMABLE_SUCCESS,
    CREATE_CONSUMABLE_FAIL,
    GET_CONSUMABLE_START,
    GET_CONSUMABLE_SUCCESS,
    GET_CONSUMABLE_FAIL,
    EDIT_CONSUMABLE
} from '../types/consumableTypes';
import { updateObject } from "../utility";

const initialState = {
    consumables: [],
    consumable: {},
    loading: false,
    error: null,
}

const getConsumableListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getConsumableListSuccess = (state, action) => {
  return updateObject(state, {
    consumables: action.consumables,
    error: null,
    loading: false
  });
};

const getConsumableListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createConsumableStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createConsumableSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createConsumableFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getConsumableDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getConsumableDetailSuccess = (state, action) => {
  return updateObject(state, {
    consumable: action.consumable,
    error: null,
    loading: false
  });
};

const getConsumableDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function consumables(state = initialState, action){
    switch(action.type){
        case GET_CONSUMABLES_START:
            return getConsumableListStart(state, action);
        case GET_CONSUMABLES_SUCCESS:
            return getConsumableListSuccess(state, action);
        case GET_CONSUMABLES_FAIL:
            return getConsumableListFail(state, action);
        case CREATE_CONSUMABLE_START:
            return createConsumableStart(state, action);
        case CREATE_CONSUMABLE_SUCCESS:
            return createConsumableSuccess(state, action);
        case CREATE_CONSUMABLE_FAIL:
            return createConsumableFail(state, action);
        case GET_CONSUMABLE_START:
        return getConsumableDetailStart(state, action);
        case GET_CONSUMABLE_SUCCESS:
            return getConsumableDetailSuccess(state, action);
        case GET_CONSUMABLE_FAIL:
            return getConsumableDetailFail(state, action);
        case EDIT_CONSUMABLE:
            const arrayList = state.consumables;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                consumables: arrayList,
            };
        default:
            return state;
    }
}

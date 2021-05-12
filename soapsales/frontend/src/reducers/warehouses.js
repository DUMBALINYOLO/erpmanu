import { 
    GET_WAREHOUSES_START,
    GET_WAREHOUSES_SUCCESS,
    GET_WAREHOUSES_FAIL,
    GET_WAREHOUSE_START,
    GET_WAREHOUSE_SUCCESS,
    GET_WAREHOUSE_FAIL,
    CREATE_WAREHOUSE_START,
    CREATE_WAREHOUSE_SUCCESS,
    CREATE_WAREHOUSE_FAIL,
    EDIT_WAREHOUSE
} from '../types/warehouseTypes';
import { updateObject } from "../utility";

const initialState = {
    warehouses: [],
    warehouse: {},
    loading: false,
    error: null,
}

const getWarehouseListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getWarehouseListSuccess = (state, action) => {
  return updateObject(state, {
    warehouses: action.warehouses,
    error: null,
    loading: false
  });
};

const getWarehouseListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createWarehouseStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createWarehouseSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createWarehouseFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getWarehouseDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getWarehouseDetailSuccess = (state, action) => {
  return updateObject(state, {
    warehouse: action.warehouse,
    error: null,
    loading: false
  });
};

const getWarehouseDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function warehouses(state = initialState, action){
    switch(action.type){
        case GET_WAREHOUSES_START:
            return getWarehouseListStart(state, action);
        case GET_WAREHOUSES_SUCCESS:
            return getWarehouseListSuccess(state, action);
        case GET_WAREHOUSES_FAIL:
            return getWarehouseListFail(state, action);
        case GET_WAREHOUSE_START:
            return getWarehouseDetailStart(state, action);
        case GET_WAREHOUSE_SUCCESS:
            return getWarehouseDetailSuccess(state, action);
        case GET_WAREHOUSE_FAIL:
            return getWarehouseDetailFail(state, action);
        case CREATE_WAREHOUSE_START:
            return createWarehouseStart(state, action);
        case CREATE_WAREHOUSE_SUCCESS:
            return createWarehouseSuccess(state, action);
        case CREATE_WAREHOUSE_FAIL:
            return createWarehouseFail(state, action);
        case EDIT_WAREHOUSE:
            const arrayList = state.warehouses;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                warehouses: arrayList,
            };
        default:
            return state;
    }
}

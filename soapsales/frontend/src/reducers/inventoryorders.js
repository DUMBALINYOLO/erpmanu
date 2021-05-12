import {
    GET_INVENTORY_ORDERS_START,
    GET_INVENTORY_ORDERS_SUCCESS,
    GET_INVENTORY_ORDERS_FAIL,
    CREATE_INVENTORY_ORDER_START,
    CREATE_INVENTORY_ORDER_SUCCESS,
    CREATE_INVENTORY_ORDER_FAIL,
    GET_INVENTORY_ORDER_START,
    GET_INVENTORY_ORDER_SUCCESS,
    GET_INVENTORY_ORDER_FAIL,
    EDIT_INVENTORY_ORDER
} from '../types/inventoryorderTypes';
import { updateObject } from "../utility";

const initialState = {
    inventoryorders: [],
    inventoryorder: {},
    loading: false,
    error: null,
}

const getInventoryOrderListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getInventoryOrderListSuccess = (state, action) => {
  return updateObject(state, {
    inventoryorders: action.inventoryorders,
    error: null,
    loading: false
  });
};

const getInventoryOrderListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createInventoryOrderStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createInventoryOrderSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createInventoryOrderFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getInventoryOrderDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getInventoryOrderDetailSuccess = (state, action) => {
  return updateObject(state, {
    inventoryorder: action.inventoryorder,
    error: null,
    loading: false
  });
};

const getInventoryOrderDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function inventoryorders(state = initialState, action){
    switch(action.type){
        case GET_INVENTORY_ORDERS_START:
            return getInventoryOrderListStart(state, action);
        case GET_INVENTORY_ORDERS_SUCCESS:
            return getInventoryOrderListSuccess(state, action);
        case GET_INVENTORY_ORDERS_FAIL:
            return getInventoryOrderListFail(state, action);
        case CREATE_INVENTORY_ORDER_START:
            return createInventoryOrderStart(state, action);
        case CREATE_INVENTORY_ORDER_SUCCESS:
            return createInventoryOrderSuccess(state, action);
        case CREATE_INVENTORY_ORDER_FAIL:
            return createInventoryOrderFail(state, action);
        case GET_INVENTORY_ORDER_START:
        return getInventoryOrderDetailStart(state, action);
        case GET_INVENTORY_ORDER_SUCCESS:
            return getInventoryOrderDetailSuccess(state, action);
        case GET_INVENTORY_ORDER_FAIL:
            return getInventoryOrderDetailFail(state, action);
        case EDIT_INVENTORY_ORDER:
            const arrayList = state.inventoryorders;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                inventoryorders: arrayList,
            };
        default:
            return state;
    }
}

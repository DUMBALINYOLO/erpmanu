import {
    GET_INVENTORY_STOCK_TAKES_START,
    GET_INVENTORY_STOCK_TAKES_SUCCESS,
    GET_INVENTORY_STOCK_TAKES_FAIL,
    CREATE_INVENTORY_STOCK_TAKE_START,
    CREATE_INVENTORY_STOCK_TAKE_SUCCESS,
    CREATE_INVENTORY_STOCK_TAKE_FAIL,
    GET_INVENTORY_STOCK_TAKE_START,
    GET_INVENTORY_STOCK_TAKE_SUCCESS,
    GET_INVENTORY_STOCK_TAKE_FAIL,
    EDIT_INVENTORY_STOCK_TAKE
} from '../types/inventorystocktakeTypes';
import { updateObject } from "../utility";

const initialState = {
    inventorystocktakes: [],
    inventorystocktake: {},
    loading: false,
    error: null,
}

const getInventoryStockTakeListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getInventoryStockTakeListSuccess = (state, action) => {
  return updateObject(state, {
    inventorystocktakes: action.inventorystocktakes,
    error: null,
    loading: false
  });
};

const getInventoryStockTakeListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createInventoryStockTakeStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createInventoryStockTakeSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createInventoryStockTakeFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getInventoryStockTakeDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getInventoryStockTakeDetailSuccess = (state, action) => {
  return updateObject(state, {
    inventorystocktake: action.inventorystocktake,
    error: null,
    loading: false
  });
};

const getInventoryStockTakeDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function inventorystocktakes(state = initialState, action){
    switch(action.type){
        case GET_INVENTORY_STOCK_TAKES_START:
            return getInventoryStockTakeListStart(state, action);
        case GET_INVENTORY_STOCK_TAKES_SUCCESS:
            return getInventoryStockTakeListSuccess(state, action);
        case GET_INVENTORY_STOCK_TAKES_FAIL:
            return getInventoryStockTakeListFail(state, action);
        case CREATE_INVENTORY_STOCK_TAKE_START:
            return createInventoryStockTakeStart(state, action);
        case CREATE_INVENTORY_STOCK_TAKE_SUCCESS:
            return createInventoryStockTakeSuccess(state, action);
        case CREATE_INVENTORY_STOCK_TAKE_FAIL:
            return createInventoryStockTakeFail(state, action);
        case GET_INVENTORY_STOCK_TAKE_START:
        return getInventoryStockTakeDetailStart(state, action);
        case GET_INVENTORY_STOCK_TAKE_SUCCESS:
            return getInventoryStockTakeDetailSuccess(state, action);
        case GET_INVENTORY_STOCK_TAKE_FAIL:
            return getInventoryStockTakeDetailFail(state, action);
        case EDIT_INVENTORY_STOCK_TAKE:
            const arrayList = state.inventorystocktakes;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                inventorystocktakes: arrayList,
            };
        default:
            return state;
    }
}

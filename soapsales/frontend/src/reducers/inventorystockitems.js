import {
    GET_INVENTORY_STOCK_ITEMS_START,
    GET_INVENTORY_STOCK_ITEMS_SUCCESS,
    GET_INVENTORY_STOCK_ITEMS_FAIL,
    CREATE_INVENTORY_STOCK_ITEM_START,
    CREATE_INVENTORY_STOCK_ITEM_SUCCESS,
    CREATE_INVENTORY_STOCK_ITEM_FAIL,
    GET_INVENTORY_STOCK_ITEM_START,
    GET_INVENTORY_STOCK_ITEM_SUCCESS,
    GET_INVENTORY_STOCK_ITEM_FAIL,
    EDIT_INVENTORY_STOCK_ITEM
} from '../types/inventorystockitemTypes';
import { updateObject } from "../utility";

const initialState = {
    inventorystockitems: [],
    inventorystockitem: {},
    loading: false,
    error: null,
}

const getInventoryStockItemListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getInventoryStockItemListSuccess = (state, action) => {
  return updateObject(state, {
    inventorystockitems: action.inventorystockitems,
    error: null,
    loading: false
  });
};

const getInventoryStockItemListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createInventoryStockItemStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createInventoryStockItemSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createInventoryStockItemFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getInventoryStockItemDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getInventoryStockItemDetailSuccess = (state, action) => {
  return updateObject(state, {
    inventorystockitem: action.inventorystockitem,
    error: null,
    loading: false
  });
};

const getInventoryStockItemDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function inventorystockitems(state = initialState, action){
    switch(action.type){
        case GET_INVENTORY_STOCK_ITEMS_START:
            return getInventoryStockItemListStart(state, action);
        case GET_INVENTORY_STOCK_ITEMS_SUCCESS:
            return getInventoryStockItemListSuccess(state, action);
        case GET_INVENTORY_STOCK_ITEMS_FAIL:
            return getInventoryStockItemListFail(state, action);
        case CREATE_INVENTORY_STOCK_ITEM_START:
            return createInventoryStockItemStart(state, action);
        case CREATE_INVENTORY_STOCK_ITEM_SUCCESS:
            return createInventoryStockItemSuccess(state, action);
        case CREATE_INVENTORY_STOCK_ITEM_FAIL:
            return createInventoryStockItemFail(state, action);
        case GET_INVENTORY_STOCK_ITEM_START:
        return getInventoryStockItemDetailStart(state, action);
        case GET_INVENTORY_STOCK_ITEM_SUCCESS:
            return getInventoryStockItemDetailSuccess(state, action);
        case GET_INVENTORY_STOCK_ITEM_FAIL:
            return getInventoryStockItemDetailFail(state, action);
        case EDIT_INVENTORY_STOCK_ITEM:
            const arrayList = state.inventorystockitems;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                inventorystockitems: arrayList,
            };
        default:
            return state;
    }
}

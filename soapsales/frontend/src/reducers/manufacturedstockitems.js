import {
    GET_MANUFACTURED_STOCK_ITEMS_START,
    GET_MANUFACTURED_STOCK_ITEMS_SUCCESS,
    GET_MANUFACTURED_STOCK_ITEMS_FAIL,
    GET_MANUFACTURED_STOCK_ITEM_START,
    GET_MANUFACTURED_STOCK_ITEM_SUCCESS,
    GET_MANUFACTURED_STOCK_ITEM_FAIL,
    CREATE_MANUFACTURED_STOCK_ITEM_START,
    CREATE_MANUFACTURED_STOCK_ITEM_SUCCESS,
    CREATE_MANUFACTURED_STOCK_ITEM_FAIL,
    EDIT_MANUFACTURED_STOCK_ITEM
    } from '../types/manufacturedstockitemTypes';
import { updateObject } from "../utility";

const initialState = {
    manufacturedstockitems: [],
    manufacturedstockitem: {},
    loading: false,
    error: null,
}

const getManufacturedStockItemListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getManufacturedStockItemListSuccess = (state, action) => {
  return updateObject(state, {
    manufacturedstockitems: action.manufacturedstockitems,
    error: null,
    loading: false
  });
};

const getManufacturedStockItemListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createManufacturedStockItemStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createManufacturedStockItemSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createManufacturedStockItemFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getManufacturedStockItemDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getManufacturedStockItemDetailSuccess = (state, action) => {
  return updateObject(state, {
    manufacturedstockitem: action.manufacturedstockitem,
    error: null,
    loading: false
  });
};

const getManufacturedStockItemDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function manufacturedstockitems(state = initialState, action){
    switch(action.type){
        case GET_MANUFACTURED_STOCK_ITEMS_START:
            return getManufacturedStockItemListStart(state, action);
        case GET_MANUFACTURED_STOCK_ITEMS_SUCCESS:
            return getManufacturedStockItemListSuccess(state, action);
        case GET_MANUFACTURED_STOCK_ITEMS_FAIL:
            return getManufacturedStockItemListFail(state, action);
        case GET_MANUFACTURED_STOCK_ITEM_START:
            return getManufacturedStockItemDetailStart(state, action);
        case GET_MANUFACTURED_STOCK_ITEM_SUCCESS:
            return getManufacturedStockItemDetailSuccess(state, action);
        case GET_MANUFACTURED_STOCK_ITEM_FAIL:
            return getManufacturedStockItemDetailFail(state, action);
        case CREATE_MANUFACTURED_STOCK_ITEM_START:
            return createManufacturedStockItemStart(state, action);
        case CREATE_MANUFACTURED_STOCK_ITEM_SUCCESS:
            return createManufacturedStockItemSuccess(state, action);
        case CREATE_MANUFACTURED_STOCK_ITEM_FAIL:
            return createManufacturedStockItemFail(state, action);
        case EDIT_MANUFACTURED_STOCK_ITEM:
            const arrayList = state.manufacturedstockitems;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                manufacturedstockitems: arrayList,
            };
        default:
            return state;
    }
}

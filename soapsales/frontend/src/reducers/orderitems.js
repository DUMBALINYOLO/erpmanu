import {
    GET_ORDER_ITEMS_START,
    GET_ORDER_ITEMS_SUCCESS,
    GET_ORDER_ITEMS_FAIL,
    GET_ORDER_ITEM_START,
    GET_ORDER_ITEM_SUCCESS,
    GET_ORDER_ITEM_FAIL,
    CREATE_ORDER_ITEM_START,
    CREATE_ORDER_ITEM_SUCCESS,
    CREATE_ORDER_ITEM_FAIL,
    EDIT_ORDER_ITEM
} from '../types/orderitemTypes';
import { updateObject } from "../utility";

const initialState = {
    orderitems: [],
    orderitem: {},
    loading: false,
    error: null,
}

const getOrderItemListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getOrderItemListSuccess = (state, action) => {
  return updateObject(state, {
    orderitems: action.orderitems,
    error: null,
    loading: false
  });
};

const getOrderItemListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createOrderItemStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createOrderItemSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createOrderItemFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getOrderItemDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getOrderItemDetailSuccess = (state, action) => {
  return updateObject(state, {
    orderitem: action.orderitem,
    error: null,
    loading: false
  });
};

const getOrderItemDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function orderitems(state = initialState, action){
    switch(action.type){
        case GET_ORDER_ITEMS_START:
            return getOrderItemListStart(state, action);
        case GET_ORDER_ITEMS_SUCCESS:
            return getOrderItemListSuccess(state, action);
        case GET_ORDER_ITEMS_FAIL:
            return getOrderItemListFail(state, action);
        case GET_ORDER_ITEM_START:
            return getOrderItemDetailStart(state, action);
        case GET_ORDER_ITEM_SUCCESS:
            return getOrderItemDetailSuccess(state, action);
        case GET_ORDER_ITEM_FAIL:
            return getOrderItemDetailFail(state, action);
        case CREATE_ORDER_ITEM_START:
            return createOrderItemStart(state, action);
        case CREATE_ORDER_ITEM_SUCCESS:
            return createOrderItemSuccess(state, action);
        case CREATE_ORDER_ITEM_FAIL:
            return createOrderItemFail(state, action);
        case EDIT_ORDER_ITEM:
            const arrayList = state.orderitems;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                orderitems: arrayList,
            };
        default:
            return state;
    }
}

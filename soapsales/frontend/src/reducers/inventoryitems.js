import { 
    GET_INVENTORY_ITEMS_START,
    GET_INVENTORY_ITEMS_SUCCESS,
    GET_INVENTORY_ITEMS_FAIL 
} from '../actions/types.js';
import { updateObject } from "../utility";

const initialState = {
    inventoryitems: [],
    loading: false,
    error: null,
}

const getInventoryItemListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getInventoryItemListSuccess = (state, action) => {
  return updateObject(state, {
    inventoryitems: action.inventoryitems,
    error: null,
    loading: false
  });
};

const getInventoryItemListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function inventoryitems(state = initialState, action){
    switch(action.type){
        case GET_INVENTORY_ITEMS_START:
            return getInventoryItemListStart(state, action);
        case GET_INVENTORY_ITEMS_SUCCESS:
            return getInventoryItemListSuccess(state, action);
        case GET_INVENTORY_ITEMS_FAIL:
            return getInventoryItemListFail(state, action);
        default:
            return state;
    }
}

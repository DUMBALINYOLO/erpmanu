import { 
    GET_PRODUCTION_PROCESSESES_START,
    GET_PRODUCTION_PROCESSESES_SUCCESS,
    GET_PRODUCTION_PROCESSESES_FAIL 
} from '../actions/types.js';
import { updateObject } from "../utility";

const initialState = {
    productionprocesses: [],
    loading: false,
    error: null,
}

const getProductionProcessListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getProductionProcessListSuccess = (state, action) => {
  return updateObject(state, {
    productionprocesses: action.productionprocesses,
    error: null,
    loading: false
  });
};

const getProductionProcessListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function productionprocesses(state = initialState, action){
    switch(action.type){
        case GET_PRODUCTION_PROCESSESES_START:
            return getProductionProcessListStart(state, action);
        case GET_PRODUCTION_PROCESSESES_SUCCESS:
            return getProductionProcessListSuccess(state, action);
        case GET_PRODUCTION_PROCESSESES_FAIL:
            return getProductionProcessListFail(state, action);
        default:
            return state;
    }
}

import { 
    GET_PROCESS_RATES_START,
    GET_PROCESS_RATES_SUCCESS,
    GET_PROCESS_RATES_FAIL,
    GET_PROCESS_RATE_START,
    GET_PROCESS_RATE_SUCCESS,
    GET_PROCESS_RATE_FAIL,
    CREATE_PROCESS_RATE_START,
    CREATE_PROCESS_RATE_SUCCESS,
    CREATE_PROCESS_RATE_FAIL,
    EDIT_PROCESS_RATE
} from "../types/processrateTypes";
import { updateObject } from "../utility";

const initialState = {
    processrates: [],
    processrate: {},
    loading: false,
    error: null,
}

const getProcessRateListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getProcessRateListSuccess = (state, action) => {
  return updateObject(state, {
    processrates: action.processrates,
    error: null,
    loading: false
  });
};

const getProcessRateListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createProcessRateStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createProcessRateSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createProcessRateFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getProcessRateDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getProcessRateDetailSuccess = (state, action) => {
  return updateObject(state, {
    processrate: action.processrate,
    error: null,
    loading: false
  });
};

const getProcessRateDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function processrates(state = initialState, action){
    switch(action.type){
        case GET_PROCESS_RATES_START:
            return getProcessRateListStart(state, action);
        case GET_PROCESS_RATES_SUCCESS:
            return getProcessRateListSuccess(state, action);
        case GET_PROCESS_RATES_FAIL:
            return getProcessRateListFail(state, action);
        case GET_PROCESS_RATE_START:
            return getProcessRateDetailStart(state, action);
        case GET_PROCESS_RATE_SUCCESS:
            return getProcessRateDetailSuccess(state, action);
        case GET_PROCESS_RATE_FAIL:
            return getProcessRateDetailFail(state, action);
        case CREATE_PROCESS_RATE_START:
            return createProcessRateStart(state, action);
        case CREATE_PROCESS_RATE_SUCCESS:
            return createProcessRateSuccess(state, action);
        case CREATE_PROCESS_RATE_FAIL:
            return createProcessRateFail(state, action);
        case EDIT_PROCESS_RATE:
            const arrayList = state.processrates;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                processrates: arrayList,
            };
        default:
            return state;
    }
}

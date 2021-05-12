import { 
  CREATE_PROCESS_START,
  CREATE_PROCESS_SUCCESS,
  CREATE_PROCESS_FAIL,
  EDIT_PROCESS 
} from '../actions/types.js';
import { updateObject } from "../utility";

const initialState = {
    unverifiedproductionprocesses: [],
    loading: false,
    error: null,
}

const createProcessStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createProcessSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createProcessFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function unverifiedproductionprocesses(state = initialState, action){
    switch(action.type){
        case CREATE_PROCESS_START:
            return createProcessStart(state, action);
        case CREATE_PROCESS_SUCCESS:
            return createProcessSuccess(state, action);
        case CREATE_PROCESS_FAIL:
            return createProcessFail(state, action);
        case EDIT_PROCESS:
            const arrayList = state.unverifiedproductionprocesses;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                unverifiedproductionprocesses: arrayList,
            };
        default:
            return state;
    }
}

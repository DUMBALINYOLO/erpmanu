import { 
    GET_JOURNAL_ENTRIES_START,
    GET_JOURNAL_ENTRIES_SUCCESS,
    GET_JOURNAL_ENTRIES_FAIL
} from '../actions/types.js';
import { updateObject } from "../utility";

const initialState = {
    journalentries: [],
    loading: false,
    error: null,
}

const getAccountingAdjustmentListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getAccountingAdjustmentListSuccess = (state, action) => {
  return updateObject(state, {
    journalentries: action.journalentries,
    error: null,
    loading: false
  });
};

const getAccountingAdjustmentListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function journalentries(state = initialState, action){
    switch(action.type){
        case GET_JOURNAL_ENTRIES_START:
            return getAccountingAdjustmentListStart(state, action);
        case GET_JOURNAL_ENTRIES_SUCCESS:
            return getAccountingAdjustmentListSuccess(state, action);
        case GET_JOURNAL_ENTRIES_FAIL:
            return getAccountingAdjustmentListFail(state, action);
        default:
            return state;
    }
}


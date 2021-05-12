import { 
    GET_CREDIT_NOTES_START,
    GET_CREDIT_NOTES_SUCCESS,
    GET_CREDIT_NOTES_FAIL,
    CREATE_CREDIT_NOTE_START,
    CREATE_CREDIT_NOTE_SUCCESS,
    CREATE_CREDIT_NOTE_FAIL,
    GET_CREDIT_NOTE_START,
    GET_CREDIT_NOTE_SUCCESS,
    GET_CREDIT_NOTE_FAIL,
    EDIT_CREDIT_NOTE 
} from '../types/creditnoteTypes';
import { updateObject } from "../utility";

const initialState = {
    creditnotes: [],
    creditnote: {},
    loading: false,
    error: null,
}

const getCreditNoteListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getCreditNoteListSuccess = (state, action) => {
  return updateObject(state, {
    creditnotes: action.creditnotes,
    error: null,
    loading: false
  });
};

const getCreditNoteListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createCreditNoteStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createCreditNoteSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createCreditNoteFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getCreditNoteDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getCreditNoteDetailSuccess = (state, action) => {
  return updateObject(state, {
    creditnote: action.creditnote,
    error: null,
    loading: false
  });
};

const getCreditNoteDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function creditnotes(state = initialState, action){
    switch(action.type){
        case GET_CREDIT_NOTES_START:
            return getCreditNoteListStart(state, action);
        case GET_CREDIT_NOTES_SUCCESS:
            return getCreditNoteListSuccess(state, action);
        case GET_CREDIT_NOTES_FAIL:
            return getCreditNoteListFail(state, action);
        case CREATE_CREDIT_NOTE_START:
            return createCreditNoteStart(state, action);
        case CREATE_CREDIT_NOTE_SUCCESS:
            return createCreditNoteSuccess(state, action);
        case CREATE_CREDIT_NOTE_FAIL:
            return createCreditNoteFail(state, action);
        case GET_CREDIT_NOTE_START:
        return getCreditNoteDetailStart(state, action);
        case GET_CREDIT_NOTE_SUCCESS:
            return getCreditNoteDetailSuccess(state, action);
        case GET_CREDIT_NOTE_FAIL:
            return getCreditNoteDetailFail(state, action);
        case EDIT_CREDIT_NOTE:
            const arrayList = state.creditnotes;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                creditnotes: arrayList,
            };
        default:
            return state;
    }
}

import { 
    GET_DEBIT_NOTES_START,
    GET_DEBIT_NOTES_SUCCESS,
    GET_DEBIT_NOTES_FAIL,
    CREATE_DEBIT_NOTE_START,
    CREATE_DEBIT_NOTE_SUCCESS,
    CREATE_DEBIT_NOTE_FAIL,
    GET_DEBIT_NOTE_START,
    GET_DEBIT_NOTE_SUCCESS,
    GET_DEBIT_NOTE_FAIL
} from '../types/debitnoteTypes';
import { updateObject } from "../utility";

const initialState = {
    debitnotes: [],
    debitnote: {},
    loading: false,
    error: null,
}

const getDebitNoteListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getDebitNoteListSuccess = (state, action) => {
  return updateObject(state, {
    debitnotes: action.debitnotes,
    error: null,
    loading: false
  });
};

const getDebitNoteListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createDebitNoteStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createDebitNoteSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createDebitNoteFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getDebitNoteDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getDebitNoteDetailSuccess = (state, action) => {
  return updateObject(state, {
    debitnote: action.debitnote,
    error: null,
    loading: false
  });
};

const getDebitNoteDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function debitnotes(state = initialState, action){
    switch(action.type){
        case GET_DEBIT_NOTES_START:
            return getDebitNoteListStart(state, action);
        case GET_DEBIT_NOTES_SUCCESS:
            return getDebitNoteListSuccess(state, action);
        case GET_DEBIT_NOTES_FAIL:
            return getDebitNoteListFail(state, action);
        case CREATE_DEBIT_NOTE_START:
            return createDebitNoteStart(state, action);
        case CREATE_DEBIT_NOTE_SUCCESS:
            return createDebitNoteSuccess(state, action);
        case CREATE_DEBIT_NOTE_FAIL:
            return createDebitNoteFail(state, action);
        case GET_DEBIT_NOTE_START:
        return getDebitNoteDetailStart(state, action);
        case GET_DEBIT_NOTE_SUCCESS:
            return getDebitNoteDetailSuccess(state, action);
        case GET_DEBIT_NOTE_FAIL:
            return getDebitNoteDetailFail(state, action);
        default:
            return state;
    }
}


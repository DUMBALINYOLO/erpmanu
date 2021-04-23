import axios from 'axios';
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
import { creditnotesURL } from '../constants';


//credit notes
const getCreditNoteListStart = () => {
  return {
    type: GET_CREDIT_NOTES_START
  };
};

const getCreditNoteListSuccess = creditnotes => {
  return {
    type: GET_CREDIT_NOTES_SUCCESS,
    creditnotes
  };
};

const getCreditNoteListFail = error => {
  return {
    type: GET_CREDIT_NOTES_FAIL,
    error: error
  };
};

const createCreditNoteStart = () => {
  return {
    type: CREATE_CREDIT_NOTE_START
  };
};


const createCreditNoteSuccess = creditnote => {
  return {
    type: CREATE_CREDIT_NOTE_SUCCESS,
    creditnote
  };
};

const createCreditNoteFail = error => {
  return {
    type: CREATE_CREDIT_NOTE_FAIL,
    error: error
  };
};

const getCreditNoteDetailStart = () => {
  return {
    type: GET_CREDIT_NOTE_START
  };
};

const getCreditNoteDetailSuccess = creditnote => {
  return {
    type: GET_CREDIT_NOTE_SUCCESS,
    creditnote
  };
};

const getCreditNoteDetailFail = error => {
  return {
    type: GET_CREDIT_NOTE_FAIL,
    error: error
  };
};

export const getCreditNotes = (token) => {
  return dispatch => {
      dispatch(getCreditNoteListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(creditnotesURL, headers)
        .then(res => {
          const creditnotes = res.data;
          dispatch(getCreditNoteListSuccess(creditnotes));
          })
        .catch(err => {
          dispatch(getCreditNoteListStart(err));
        });
    };
};

export const getCreditNote = (id, token) => {
  return dispatch => {
      dispatch(getCreditNoteDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${creditnotesURL}${id}`, headers)
        .then(res => {
          const creditnote = res.data;
          dispatch(getCreditNoteDetailSuccess(creditnote));
          })
        .catch(err => {
          dispatch(getCreditNoteDetailFail(err));
        });
    };
};

export const addCreditNote = (creditnote, token) => {
  return dispatch => {
      dispatch(createCreditNoteStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(creditnotesURL, creditnote, headers)
        .then(res => {
          dispatch(createCreditNoteSuccess(creditnote));
        })
        .catch(err => {
          dispatch(createCreditNoteFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editCreditNote = (id, creditnote, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${creditnotesURL}${id}/`, creditnote, headers)
    .then(res => {
        dispatch({
            type: EDIT_CREDIT_NOTE,
            payload: res.data
        });
    }).catch(err => console.log(err))
}

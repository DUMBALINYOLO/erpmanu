import axios from 'axios';
import { 
	GET_JOURNAL_ENTRIES_START,
	GET_JOURNAL_ENTRIES_SUCCESS,
	GET_JOURNAL_ENTRIES_FAIL 
} from './types';
import { journalentriesURL } from '../constants';

//journal entries
const getJournalEntryListStart = () => {
  return {
    type: GET_JOURNAL_ENTRIES_START
  };
};

const getJournalEntryListSuccess = journalentries => {
  return {
    type: GET_JOURNAL_ENTRIES_SUCCESS,
    journalentries
  };
};

const getJournalEntryListFail = error => {
  return {
    type: GET_JOURNAL_ENTRIES_FAIL,
    error: error
  };
};

export const getJournalEntries = (token) => {
  return dispatch => {
      dispatch(getJournalEntryListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(journalentriesURL, headers)
        .then(res => {
          const journalentries = res.data;
          dispatch(getJournalEntryListSuccess(journalentries));
          })
        .catch(err => {
          dispatch(getJournalEntryListStart(err));
        });
    };
};

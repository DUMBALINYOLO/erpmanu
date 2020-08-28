import axios from 'axios';
import {
        GET_UNADJUSTED_JOURNAL_ENTRIES,
        DELETE_UNADJUSTED_JOURNAL_ENTRY,
        GET_UNADJUSTED_JOURNAL_ENTRY
    } from '../types/unadjustedjournalentryTypes';
import { unadjustedjournalentriesURL } from '../constants';

// Get
export const getUnadjustedJournalEntries = () => dispatch => {
    axios.get(unadjustedjournalentriesURL)
        .then(res => {
            dispatch({
                type: GET_UNADJUSTED_JOURNAL_ENTRIES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete
export const deleteUnadjustedJournalEntry = (id) => dispatch => {
    axios.delete(unadjustedjournalentriesURL, id)
        .then(res => {
            dispatch({
                type: DELETE_UNADJUSTED_JOURNAL_ENTRY,
                payload: id
            });
        }).catch(err => console.log(err))
}

//get
export const getUnadjustedJournalEntry = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/accounting/unadjusted-journal-entries/${id}`)
        .then(res => {
            dispatch({
                type: GET_UNADJUSTED_JOURNAL_ENTRY,
                payload: res.data
            });
        }).catch(err => console.log(err))

}

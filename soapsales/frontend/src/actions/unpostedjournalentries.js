import axios from 'axios';
import {
        GET_UNPOSTED_JOURNAL_ENTRIES,
        DELETE_UNPOSTED_JOURNAL_ENTRY,
        GET_UNPOSTED_JOURNAL_ENTRY
    } from '../types/unpostedjournalentryTypes';
import { unpostedjournalentriesURL } from '../constants';

// Get
export const getUnpostedJournalEntries = () => dispatch => {
    axios.get(unpostedjournalentriesURL)
        .then(res => {
            dispatch({
                type: GET_UNPOSTED_JOURNAL_ENTRIES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete
export const deleteUnpostedJournalEntry = (id) => dispatch => {
    axios.delete(unpostedjournalentriesURL, id)
        .then(res => {
            dispatch({
                type: DELETE_UNPOSTED_JOURNAL_ENTRY,
                payload: id
            });
        }).catch(err => console.log(err))
}

//get
export const getUnpostedJournalEntry = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/accounting/unposted-journal-entries/${id}`)
        .then(res => {
            dispatch({
                type: GET_UNPOSTED_JOURNAL_ENTRY,
                payload: res.data
            });
        }).catch(err => console.log(err))

}

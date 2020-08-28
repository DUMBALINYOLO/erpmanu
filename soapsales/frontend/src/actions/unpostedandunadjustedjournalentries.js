import axios from 'axios';
import {
        GET_UNPOSTED_AND_UNADJUSTED_JOURNAL_ENTRIES,
        DELETE_UNPOSTED_AND_UNADJUSTED_JOURNAL_ENTRY,
        GET_UNPOSTED_AND_UNADJUSTED_JOURNAL_ENTRY
    } from '../types/unpostedandunadjustedjournalentryTypes';
import { unpostedandunadjustedjournalentriesURL } from '../constants';

// Get
export const getUnpostedAndUnadjustedJournalEntries = () => dispatch => {
    axios.get(unpostedandunadjustedjournalentriesURL)
        .then(res => {
            dispatch({
                type: GET_UNPOSTED_AND_UNADJUSTED_JOURNAL_ENTRIES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete
export const deleteUnpostedAndUnadjustedJournalEntry = (id) => dispatch => {
    axios.delete(unpostedandunadjustedjournalentriesURL, id)
        .then(res => {
            dispatch({
                type: DELETE_UNPOSTED_AND_UNADJUSTED_JOURNAL_ENTRY,
                payload: id
            });
        }).catch(err => console.log(err))
}

//get
export const getUnpostedAndUnadjustedJournalEntry = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/accounting/unposted-and-unadjusted-journal-entries/${id}`)
        .then(res => {
            dispatch({
                type: GET_UNPOSTED_AND_UNADJUSTED_JOURNAL_ENTRY,
                payload: res.data
            });
        }).catch(err => console.log(err))

}

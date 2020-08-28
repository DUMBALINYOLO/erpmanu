import axios from 'axios';
import {
        GET_POSTED_JOURNAL_ENTRIES,
        DELETE_POSTED_JOURNAL_ENTRY,
        GET_POSTED_JOURNAL_ENTRY
    } from '../types/postedjournalentryTypes';
import { postedjournalentriesURL } from '../constants';

// Get
export const getPostedJournalEntries = () => dispatch => {
    axios.get(postedjournalentriesURL)
        .then(res => {
            dispatch({
                type: GET_POSTED_JOURNAL_ENTRIES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete
export const deletePostedJournalEntry = (id) => dispatch => {
    axios.delete(postedjournalentriesURL, id)
        .then(res => {
            dispatch({
                type: DELETE_POSTED_JOURNAL_ENTRY,
                payload: id
            });
        }).catch(err => console.log(err))
}

//get
export const getPostedJournalEntry = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/accounting/posted-journal-entries/${id}`)
        .then(res => {
            dispatch({
                type: GET_POSTED_JOURNAL_ENTRY,
                payload: res.data
            });
        }).catch(err => console.log(err))

}

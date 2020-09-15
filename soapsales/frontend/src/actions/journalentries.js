import axios from 'axios';
import { GET_ENTRIES } from './types';
import { journalentriesURL } from '../constants';

// Get
export const getJournalEntries = () => dispatch => {
    axios.get(journalentriesURL)
        .then(res => {
            dispatch({
                type: GET_ENTRIES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}


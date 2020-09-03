import axios from 'axios';
import { ADD_CREDIT_NOTE, GET_CREDIT_NOTES, GET_CREDIT_NOTE, DELETE_CREDIT_NOTE } from '../types/creditnoteTypes';
import { creditnotesURL } from '../constants';


// Get
export const getCreditNotes = () => dispatch => {
    axios.get(creditnotesURL)
        .then(res => {
            dispatch({
                type: GET_CREDIT_NOTES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete

export const deleteCreditNote = (id) => dispatch => {
    axios.delete(creditnotesURL, id)
        .then(res => {
            dispatch({
                type: DELETE_CREDIT_NOTE,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addCreditNote = creditnote => dispatch => {
    axios.post(creditnotesURL, creditnote)
        .then(res => {
            dispatch({
                type: ADD_CREDIT_NOTE,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getCreditNote = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/sales/creditnote/${id}`)
        .then(res => {
            dispatch({
                type: GET_CREDIT_NOTE,
                payload: res.data
            });
        }).catch(err => console.log(err))

}

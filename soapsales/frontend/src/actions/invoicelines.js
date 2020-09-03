import axios from 'axios';
import { GET_INVOICE_LINES } from '../types/invoicelineTypes';
import { invoicelinesURL } from '../constants';


export const getInvoiceLines = () => dispatch => {
    axios.get(invoicelinesURL)
        .then(res => {
            dispatch({
                type: GET_INVOICE_LINES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

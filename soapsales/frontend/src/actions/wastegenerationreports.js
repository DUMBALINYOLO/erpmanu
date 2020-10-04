import axios from 'axios';
import { GET_WASTE_GENERATION_REPORTS, GET_WASTE_GENERATION_REPORT, EDIT_WASTE_GENERATION_REPORT, DELETE_WASTE_GENERATION_REPORT, ADD_WASTE_GENERATION_REPORT } from '../types/wastegenerationreportTypes';
import { wastegenerationreportsURL } from '../constants';


// Get
export const getWasteGenerationReports = () => dispatch => {
    axios.get(wastegenerationreportsURL)
        .then(res => {
            dispatch({
                type: GET_WASTE_GENERATION_REPORTS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete

export const deleteWasteGenerationReport = (id) => dispatch => {
    axios.delete(wastegenerationreportsURL, id)
        .then(res => {
            dispatch({
                type: DELETE_WASTE_GENERATION_REPORT,
                payload: id
            });
        }).catch(err => console.log(err))
}


// Add
export const addWasteGenerationReport = (wastegenerationreport) => dispatch => {
    axios.post(wastegenerationreportsURL, wastegenerationreport)
        .then(res => {
            dispatch({
                type: ADD_WASTE_GENERATION_REPORT,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getWasteGenerationReport = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/manufacture/waste-generation-reports/${id}`)
        .then(res => {
            dispatch({
                type: GET_WASTE_GENERATION_REPORT,
                payload: res.data
            });
        }).catch(err => console.log(err))

}

//Edit
export const editWasteGenerationReport = (id, wastegenerationreport) => dispatch => {
    axios.put(`http://127.0.0.1:8000/api/manufacture/waste-generation-reports/${id}/`, wastegenerationreport)
        .then(res => {
            dispatch({
                type: EDIT_WASTE_GENERATION_REPORT,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

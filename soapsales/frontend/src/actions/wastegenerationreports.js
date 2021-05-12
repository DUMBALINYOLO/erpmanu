import axios from 'axios';
import { 
    GET_WASTE_GENERATION_REPORTS_START,
    GET_WASTE_GENERATION_REPORTS_SUCCESS,
    GET_WASTE_GENERATION_REPORTS_FAIL,
    CREATE_WASTE_GENERATION_REPORT_START,
    CREATE_WASTE_GENERATION_REPORT_SUCCESS,
    CREATE_WASTE_GENERATION_REPORT_FAIL,
    GET_WASTE_GENERATION_REPORT_START,
    GET_WASTE_GENERATION_REPORT_SUCCESS,
    GET_WASTE_GENERATION_REPORT_FAIL,
    EDIT_WASTE_GENERATION_REPORT
} from '../types/wastegenerationreportTypes';
import { wastegenerationreportsURL } from '../constants';

//waste generation reports
const getWasteGenerationReportListStart = () => {
  return {
    type: GET_WASTE_GENERATION_REPORTS_START
  };
};

const getWasteGenerationReportListSuccess = wastegenerationreports => {
  return {
    type: GET_WASTE_GENERATION_REPORTS_SUCCESS,
    wastegenerationreports
  };
};

const getWasteGenerationReportListFail = error => {
  return {
    type: GET_WASTE_GENERATION_REPORTS_FAIL,
    error: error
  };
};

const createWasteGenerationReportStart = () => {
  return {
    type: CREATE_WASTE_GENERATION_REPORT_START
  };
};


const createWasteGenerationReportSuccess = wastegenerationreport => {
  return {
    type: CREATE_WASTE_GENERATION_REPORT_SUCCESS,
    wastegenerationreport
  };
};

const createWasteGenerationReportFail = error => {
  return {
    type: CREATE_WASTE_GENERATION_REPORT_FAIL,
    error: error
  };
};

const getWasteGenerationReportDetailStart = () => {
  return {
    type: GET_WASTE_GENERATION_REPORT_START
  };
};

const getWasteGenerationReportDetailSuccess = wastegenerationreport => {
  return {
    type: GET_WASTE_GENERATION_REPORT_SUCCESS,
    wastegenerationreport
  };
};

const getWasteGenerationReportDetailFail = error => {
  return {
    type: GET_WASTE_GENERATION_REPORT_FAIL,
    error: error
  };
};

export const getWasteGenerationReports = (token) => {
  return dispatch => {
      dispatch(getWasteGenerationReportListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(wastegenerationreportsURL, headers)
        .then(res => {
          const wastegenerationreports = res.data;
          dispatch(getWasteGenerationReportListSuccess(wastegenerationreports));
          })
        .catch(err => {
          dispatch(getWasteGenerationReportListStart(err));
        });
    };
};

export const getWasteGenerationReport = (id, token) => {
  return dispatch => {
      dispatch(getWasteGenerationReportDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${wastegenerationreportsURL}${id}`, headers)
        .then(res => {
          const wastegenerationreport = res.data;
          dispatch(getWasteGenerationReportDetailSuccess(wastegenerationreport));
          })
        .catch(err => {
          dispatch(getWasteGenerationReportDetailFail(err));
        });
    };
};

export const addWasteGenerationReport = (wastegenerationreport, token) => {
  return dispatch => {
      dispatch(createWasteGenerationReportStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(wastegenerationreportsURL, wastegenerationreport, headers)
        .then(res => {
          dispatch(createWasteGenerationReportSuccess(wastegenerationreport));
        })
        .catch(err => {
          dispatch(createWasteGenerationReportFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editWasteGenerationReport = (id, wastegenerationreport, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${wastegenerationreportsURL}${id}/`, wastegenerationreport, headers)
    .then(res => {
        dispatch({
            type: EDIT_WASTE_GENERATION_REPORT,
            payload: res.data
        });
    }).catch(err => console.log(err))
}

import { 
  GET_WASTE_GENERATION_REPORTS_START,
  GET_WASTE_GENERATION_REPORTS_SUCCESS,
  GET_WASTE_GENERATION_REPORTS_FAIL,
  GET_WASTE_GENERATION_REPORT_START,
  GET_WASTE_GENERATION_REPORT_SUCCESS,
  GET_WASTE_GENERATION_REPORT_FAIL,
  CREATE_WASTE_GENERATION_REPORT_START,
  CREATE_WASTE_GENERATION_REPORT_SUCCESS,
  CREATE_WASTE_GENERATION_REPORT_FAIL,
  EDIT_WASTE_GENERATION_REPORT
} from "../types/wastegenerationreportTypes";
import { updateObject } from "../utility";

const initialState = {
    wastegenerationreports: [],
    wastegenerationreport: {},
    loading: false,
    error: null,
}

const getWasteGenerationReportListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getWasteGenerationReportListSuccess = (state, action) => {
  return updateObject(state, {
    wastegenerationreports: action.wastegenerationreports,
    error: null,
    loading: false
  });
};

const getWasteGenerationReportListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createWasteGenerationReportStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createWasteGenerationReportSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createWasteGenerationReportFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getWasteGenerationReportDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getWasteGenerationReportDetailSuccess = (state, action) => {
  return updateObject(state, {
    wastegenerationreport: action.wastegenerationreport,
    error: null,
    loading: false
  });
};

const getWasteGenerationReportDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function wastegenerationreports(state = initialState, action){
    switch(action.type){
        case GET_WASTE_GENERATION_REPORTS_START:
            return getWasteGenerationReportListStart(state, action);
        case GET_WASTE_GENERATION_REPORTS_SUCCESS:
            return getWasteGenerationReportListSuccess(state, action);
        case GET_WASTE_GENERATION_REPORTS_FAIL:
            return getWasteGenerationReportListFail(state, action);
        case GET_WASTE_GENERATION_REPORT_START:
            return getWasteGenerationReportDetailStart(state, action);
        case GET_WASTE_GENERATION_REPORT_SUCCESS:
            return getWasteGenerationReportDetailSuccess(state, action);
        case GET_WASTE_GENERATION_REPORT_FAIL:
            return getWasteGenerationReportDetailFail(state, action);
        case CREATE_WASTE_GENERATION_REPORT_START:
            return createWasteGenerationReportStart(state, action);
        case CREATE_WASTE_GENERATION_REPORT_SUCCESS:
            return createWasteGenerationReportSuccess(state, action);
        case CREATE_WASTE_GENERATION_REPORT_FAIL:
            return createWasteGenerationReportFail(state, action);
        case EDIT_WASTE_GENERATION_REPORT:
            const arrayList = state.wastegenerationreports;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                wastegenerationreports: arrayList,
            };
        default:
            return state;
    }
}

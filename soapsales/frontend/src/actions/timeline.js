import * as types from '.././types/uitypes';


export const fetchAction = items => ({
    type: types.FETCH_TIMELINE_DATA,
    payload: items
  });
  
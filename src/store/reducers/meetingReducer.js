import {
  CREATE_MEETING_START,
  CREATE_MEETING_SUCCESS,
  CREATE_MEETING_ERROR,
  FETCH_DASHBOARD_MEETINGS_START,
  FETCH_DASHBOARD_MEETINGS_SUCCESS,
  FETCH_DASHBOARD_MEETINGS_ERROR,
  FETCH_SELECTED_MEETING_START,
  FETCH_SELECTED_MEETING_SUCCESS,
  FETCH_SELECTED_MEETING_ERROR
} from '../actions/actionTypes'

const initialState = {
  selectedMeeting: null,
  dashboard: {
    willBeInitialFetch: true,
    allFetchedMeetings: [],
    newlyFetchedMeetings: []
  },
  loading: false,
  error: null
}

const meetingReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MEETING_START:
      return {
        ...state,
        loading: true,
        error: null
      }
    case CREATE_MEETING_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      }
    case CREATE_MEETING_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case FETCH_DASHBOARD_MEETINGS_START:
      return {
        ...state,
        loading: true,
        error: null
      }
    case FETCH_DASHBOARD_MEETINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        dashboard: {
          ...state.dashboard,
          willBeInitialFetch: false,
          newlyFetchedMeetings: action.meetings,
          allFetchedMeetings: state.dashboard.allFetchedMeetings.concat(action.meetings)
        }
      }
    case FETCH_DASHBOARD_MEETINGS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case FETCH_SELECTED_MEETING_START:
      return {
        ...state,
        loading: true,
        error: null
      }
    case FETCH_SELECTED_MEETING_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        selectedMeeting: action.meeting
      }
    case FETCH_SELECTED_MEETING_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state
  }
}

export default meetingReducer

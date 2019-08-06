import {
  CREATE_MEETING_START,
  CREATE_MEETING_SUCCESS,
  CREATE_MEETING_ERROR,
  EDIT_MEETING_START,
  EDIT_MEETING_SUCCESS,
  EDIT_MEETING_ERROR,
  JOIN_MEETING_START,
  JOIN_MEETING_SUCCESS,
  JOIN_MEETING_ERROR,
  LEAVE_MEETING_START,
  LEAVE_MEETING_SUCCESS,
  LEAVE_MEETING_ERROR,
  FETCH_DASHBOARD_MEETINGS_START,
  FETCH_DASHBOARD_MEETINGS_SUCCESS,
  FETCH_DASHBOARD_MEETINGS_ERROR,
  FETCH_SELECTED_MEETING_START,
  FETCH_SELECTED_MEETING_SUCCESS,
  FETCH_SELECTED_MEETING_ERROR,
  RESET_DASHBOARD_STATE,
  CANCEL_MEETING_TOGGLE_START,
  CANCEL_MEETING_TOGGLE_SUCCESS,
  CANCEL_MEETING_TOGGLE_ERROR
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
    case EDIT_MEETING_START:
    case JOIN_MEETING_START:
    case LEAVE_MEETING_START:
    case FETCH_DASHBOARD_MEETINGS_START:
    case CANCEL_MEETING_TOGGLE_START:
      return {
        ...state,
        loading: true,
        error: null
      }
    case FETCH_SELECTED_MEETING_START:
      return {
        ...state,
        loading: true,
        error: null,
        selectedMeeting: null
      }
    case CREATE_MEETING_ERROR:
    case EDIT_MEETING_ERROR:
    case JOIN_MEETING_ERROR:
    case LEAVE_MEETING_ERROR:
    case FETCH_DASHBOARD_MEETINGS_ERROR:
    case FETCH_SELECTED_MEETING_ERROR:
    case CANCEL_MEETING_TOGGLE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case CREATE_MEETING_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      }
    case EDIT_MEETING_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      }
    case JOIN_MEETING_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        selectedMeeting: {
          ...state.selectedMeeting,
          attendees: {
            ...state.selectedMeeting.attendees,
            [action.userUid]: action.attendee
          }
        }
      }
    case LEAVE_MEETING_SUCCESS:
      const attendees = state.selectedMeeting.attendees
      const newAttendees = {}
      for (let key in attendees) {
        if (key !== action.userUid) {
          newAttendees[key] = attendees[key]
        }
      }
      return {
        ...state,
        loading: false,
        error: null,
        selectedMeeting: {
          ...state.selectedMeeting,
          attendees: newAttendees
        }
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
    case RESET_DASHBOARD_STATE:
      return {
        ...state,
        dashboard: initialState.dashboard
      }

    case FETCH_SELECTED_MEETING_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        selectedMeeting: action.meeting
      }
    case CANCEL_MEETING_TOGGLE_SUCCESS:
      return {
        ...state,
        selectedMeeting: {
          ...state.selectedMeeting,
          cancelled: action.cancelled
        }
      }
    default:
      return state
  }
}

export default meetingReducer

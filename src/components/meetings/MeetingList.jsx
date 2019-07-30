import React from 'react'
import { css } from '@emotion/core'
import InfiniteScroll from 'react-infinite-scroller'
import MeetingListItem from './MeetingListItem'

const MeetingList = ({ meetings, isMoreToFetch, fetchMeetingsForDashboard }) => {
  return (
    <div>
      {meetings && meetings.length !== 0 && (
        <InfiniteScroll
          pageState={0}
          loadMore={fetchMeetingsForDashboard}
          hasMore={isMoreToFetch}
        >
          {meetings.map(meeting => (
            <MeetingListItem key={meeting.id} meeting={meeting} />
          ))}
        </InfiniteScroll>
      )}
    </div>
  )
}

const meetingListCss = css``

export default MeetingList

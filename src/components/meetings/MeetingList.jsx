import React from 'react'
import { css } from '@emotion/core'
import InfiniteScroll from 'react-infinite-scroller'
import MeetingListItem from './MeetingListItem'

const MeetingList = ({ meetings, isMoreToFetch, fetchMeetingsForDashboard }) => {
  console.log('from Meeting List')
  return (
    <div>
      {meetings && meetings.length !== 0 && (
        <InfiniteScroll
          pageStart={0}
          loadMore={fetchMeetingsForDashboard}
          hasMore={isMoreToFetch}
          initialLoad={false}
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

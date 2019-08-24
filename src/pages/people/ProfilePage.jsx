import React from 'react'
import { css } from '@emotion/core'
import { connect } from 'react-redux'
import {
  pagePadding,
  appBorderColor,
  appMidColor,
  appTeal,
  appColor2,
  appColor1
} from '../../emotion/variables'
import { fetchProfileMeetings, fetchProfilePhotos } from '../../store/actions/actions'
import {
  selectUser,
  selectProfileMeetings,
  selectPhotos
} from '../../store/selectors/authSelectors'
import ProfileMeetings from '../../components/profile/ProfileMeetings'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import format from 'date-fns/format'
import ProfilePhotos from '../../components/profile/ProfilePhotos'
import departments from '../../data/departments'
import Ribbon from '../../components/utils/Ribbon'

const mapStateToProps = state => ({
  user: selectUser(state),
  profileMeetings: selectProfileMeetings(state),
  photos: selectPhotos(state)
})

class ProfilePage extends React.Component {
  componentDidMount () {
    this.props.fetchProfileMeetings()
    this.props.fetchProfilePhotos()
  }

  render () {
    const { user, photos, profileMeetings } = this.props
    return (
      <div css={profilePageCss}>
        <div css={header}>
          {user.department && (
            <Ribbon
              color={departments[user.department].color}
              fontSize='20px'
              css={ribbonPosition}
            >
              {user.department}
            </Ribbon>
          )}
          <div css={imgContainer}>
            <img src={user.photoURL} alt='avatar' />
          </div>
          <div css={headerLeft}>
            <h3>{user.username}</h3>
            <p>{user.email}</p>
          </div>
        </div>
        <div css={details}>
          <h4>About</h4>
          <div css={detailsBody}>
            <div>
              <p>
                <span>Job Title:</span> {user.jobTitle || 'Information Unavailable'}
              </p>
              <p>
                <span>Department:</span> {user.department || 'Information Unavailable'}{' '}
              </p>
              <p>
                <span>Birthday:</span>{' '}
                {user.birthday
                  ? format(user.birthday.toDate(), 'MMMM Do, YYYY')
                  : 'Information Unavailable'}
              </p>
            </div>

            <div>
              <p>
                <span>Member For: </span>
                {user.createdAt
                  ? distanceInWordsToNow(user.createdAt.toDate())
                  : 'Information Unavailable'}
              </p>
              <p>
                <span>Hours:</span> {user.hours || 'Information Unavailable'}
              </p>
              <p>
                <span>Lunch Break:</span>{' '}
                {user.lunchBreak
                  ? format(user.lunchBreak.toDate(), 'h:mm aa')
                  : '12:00 pm'}
              </p>
            </div>
          </div>
        </div>
        <div css={editBox}>
          <ProfileMeetings profileMeetings={profileMeetings} />
        </div>
        <div css={photosGridSection}>
          <ProfilePhotos photos={photos} />
        </div>
      </div>
    )
  }
}

// styles

const profilePageCss = css`
  ${pagePadding};
  padding: 10rem 0;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto;
  grid-gap: 2rem;
`

const header = css`
  position: relative;
  grid-column-start: 1;
  grid-column-end: 3;
  background: white;
  border: 1px solid ${appBorderColor};
  border-radius: 0.4rem;
  height: 30rem;
  display: flex;
`
const imgContainer = css`
  width: 30rem;
  padding: 5rem;
  & img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`

const headerLeft = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 5rem;
  & h3 {
    color: ${appColor1};
    font-size: 5rem;
  }
`

const details = css`
  background: white;
  border: 1px solid ${appBorderColor};
  border-radius: 0.4rem;
  height: 35rem;
  padding: 2rem 5rem;
  color: rgba(0, 0, 0, 0.7);
  & h4 {
    color: ${appColor1};
    padding-left: 3rem;
    font-size: 4rem;
    border-bottom: 1px solid ${appBorderColor};
    margin-bottom: 6rem;
  }
`

const detailsBody = css`
  font-size: 2rem;
  display: flex;
  width: 100%;
  height: 85%;
  margin: 2rem 0;
  & > div {
    padding-left: 1rem;
    display: flex;
    flex-direction: column;
    width: 50%;
  }
  & > div:last-of-type {
    padding-left: 5rem;
  }
  & p {
    margin-bottom: 3rem;
  }
  & span {
    font-weight: bold;
    font-size: 1.7rem;
    margin-right: 1rem;
  }
`

const editBox = css`
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 4;
  background: white;
  border: 1px solid ${appBorderColor};
  border-radius: 0.4rem;
  height: 72rem;
`

const photosGridSection = css`
  grid-column-start: 1;
  grid-column-end: 2;
  background: white;
  border: 1px solid ${appBorderColor};
  border-radius: 0.4rem;
  height: 35rem;
  padding: 3rem;
  & h4 {
    font-size: 4rem;
  }
`

const ribbonPosition = css`
  right: -2.1rem;
  top: 4rem;
`

export default connect(
  mapStateToProps,
  { fetchProfileMeetings, fetchProfilePhotos }
)(ProfilePage)

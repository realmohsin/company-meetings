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
import {
  fetchProfileMeetings,
  fetchProfilePhotos,
  fetchSomeoneElsesProfile
} from '../../store/actions/actions'
import {
  selectUser,
  selectProfileMeetings,
  selectPhotos,
  selectSomeoneElsesProfile
} from '../../store/selectors/authSelectors'
import ProfileMeetings from '../../components/profile/ProfileMeetings'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import format from 'date-fns/format'
import ProfilePhotos from '../../components/profile/ProfilePhotos'
import departments from '../../data/departments'
import Ribbon from '../../components/utils/Ribbon'
import defaultUserPhoto from '../../assets/defaultUserPhoto.png'

const mapStateToProps = state => ({
  user: selectUser(state),
  someoneElsesProfile: selectSomeoneElsesProfile(state),
  profileMeetings: selectProfileMeetings(state),
  photos: selectPhotos(state)
})

class ProfilePage extends React.Component {
  componentDidMount () {
    const {
      user,
      match,
      fetchProfileMeetings,
      fetchProfilePhotos,
      fetchSomeoneElsesProfile
    } = this.props
    const uid = match.params.userId
    fetchProfileMeetings(uid)
    fetchProfilePhotos(uid)
    if (uid === user.uid) return
    fetchSomeoneElsesProfile(uid)
  }

  componentDidUpdate (prevProps) {
    if (prevProps.match.params.userId === this.props.match.params.userId) return
    const {
      fetchSomeoneElsesProfile,
      fetchProfileMeetings,
      fetchProfilePhotos,
      match
    } = this.props
    const uid = match.params.userId
    fetchSomeoneElsesProfile(uid)
    fetchProfileMeetings(uid)
    fetchProfilePhotos(uid)
  }

  componentWillUnmount () {
    console.log('from componentWillUnmount')
  }

  render () {
    const { user, photos, profileMeetings, match, someoneElsesProfile } = this.props
    const profile = match.params.userId === user.uid ? user : someoneElsesProfile
    console.log('from render:', profile)
    return (
      <div css={profilePageCss}>
        {profile && (
          <>
            <div css={header}>
              {profile.department && (
                <Ribbon
                  color={departments[profile.department].color}
                  fontSize='20px'
                  css={ribbonPosition}
                >
                  {profile.department}
                </Ribbon>
              )}
              <div css={imgContainer}>
                <img src={profile.photoURL || defaultUserPhoto} alt='avatar' />
              </div>
              <div css={headerLeft}>
                <h3>{profile.username}</h3>
                <p>{profile.email}</p>
              </div>
            </div>
            <div css={about}>
              <h4>About</h4>
              <div css={aboutBody}>
                <div>
                  <p>
                    <span>Job Title:</span> {profile.jobTitle || 'Unknown'}
                  </p>
                  <p>
                    <span>Department:</span> {profile.department || 'Unknown'}{' '}
                  </p>
                  <p>
                    <span>Birthday:</span>{' '}
                    {profile.birthday
                      ? format(profile.birthday.toDate(), 'MMM Do, YYYY')
                      : 'Unknown'}
                  </p>
                </div>

                <div>
                  <p>
                    <span>Member For: </span>
                    {profile.createdAt
                      ? distanceInWordsToNow(profile.createdAt.toDate())
                      : 'Unknown'}
                  </p>
                  <p>
                    <span>Hours:</span> {profile.hours || 'Unknown'}
                  </p>
                  <p>
                    <span>Lunch Break:</span>{' '}
                    {profile.lunchBreak
                      ? format(profile.lunchBreak.toDate(), 'h:mm aa')
                      : '12:00 pm'}
                  </p>
                </div>
              </div>
            </div>
            <div css={meetingsSection}>
              <ProfileMeetings profileMeetings={profileMeetings} />
            </div>
            <div css={photosGridSection}>
              <ProfilePhotos photos={photos} />
            </div>
          </>
        )}
      </div>
    )
  }
}

// styles

const profilePageCss = css`
  ${pagePadding};
  padding: 10rem 0rem;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto;
  grid-auto-rows: min-content;
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
  @media (max-width: 575px) {
    flex-direction: column;
    padding: 2rem;
    justify-content: center;
    align-items: center;
    height: auto;
  }
`
const imgContainer = css`
  width: 30rem;
  padding: 5rem;
  align-self: center;
  & img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  @media (max-width: 800px) {
    width: 25%;
    padding: 0rem;
    margin: 2rem 3.5rem;
  }
  @media (max-width: 700px) {
    width: 30%;
    padding: 0rem;
    margin: 2rem 4rem;
  }
  @media (max-width: 575px) {
    margin-top: 4rem;
  }
  @media (max-width: 500px) {
    margin-top: 6rem;
  }
`

const headerLeft = css`
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 4.5rem;
  text-align: center;
  & h3 {
    color: ${appColor1};
    font-size: 5rem;
  }
  @media (max-width: 1000px) {
    padding-left: 0;
  }
  @media (max-width: 700px) {
    & h3 {
      font-size: 4rem;
    }
  }
  @media (max-width: 575px) {
    & h3 {
      margin-bottom: 1rem;
    }
    text-align: center;
    margin-bottom: 3rem;
    margin-right: 0;
  }
  @media (max-width: 390px) {
    & h3 {
      font-size: 3.4rem;
    }
  }
  @media (max-width: 350px) {
    & h3 {
      font-size: 3.3rem;
    }
  }
`

const about = css`
  grid-column-start: 1;
  grid-column-end: 3;
  background: white;
  border: 1px solid ${appBorderColor};
  border-radius: 0.4rem;
  padding: 2rem 5rem;
  color: rgba(0, 0, 0, 0.7);
  height: 35rem;
  & h4 {
    text-align: center;
    color: ${appColor1};
    padding-bottom: 1.05rem;
    font-size: 4.1rem;
    border-bottom: 1px solid ${appBorderColor};
    margin-bottom: 4rem;
  }
  @media (max-width: 950px) {
    grid-column-start: 1;
    grid-column-end: 3;
  }
  @media (max-width: 750px) {
    height: auto;
    padding: 2rem 1.5rem;
  }
`

const aboutBody = css`
  font-size: 2rem;
  display: flex;
  width: 100%;
  margin: 2rem 0;
  & > div {
    text-align: center;
    display: flex;
    flex-direction: column;
    width: 50%;
  }
  & p {
    margin-bottom: 3rem;
  }
  & span {
    font-weight: bold;
    font-size: 1.7rem;
    margin-right: 1rem;
  }
  @media (max-width: 1030px) {
    font-size: 0.9em;
  }
  @media (max-width: 925px) {
    font-size: 0.85em;
  }
  @media (max-width: 750px) {
    display: block;
    text-align: center;
    & > div {
      margin: 2rem 1rem;
      padding: 1rem;
      width: auto;
    }
    & > div:last-of-type {
      padding-left: 1rem;
    }
  }
`

const meetingsSection = css`
  grid-column-start: 1;
  grid-column-end: 3;
  background: white;
  border: 1px solid ${appBorderColor};
  border-radius: 0.4rem;
  height: 68rem;
`

const photosGridSection = css`
  grid-column-start: 1;
  grid-column-end: 3;
  background: white;
  border: 1px solid ${appBorderColor};
  border-radius: 0.4rem;
  padding: 3rem;
  & h4 {
    font-size: 4rem;
  }
  @media (max-width: 950px) {
  }
  @media (max-width: 600px) {
  }
`

const ribbonPosition = css`
  right: -2.1rem;
  top: 3.8rem;
  @media (max-width: 1063px) {
    right: -2.2rem;
  }
  @media (max-width: 985px) {
    right: -2.3rem;
  }
  @media (max-width: 900px) {
    font-size: 18px;
    right: -2.1rem;
    top: 3rem;
  }
  @media (max-width: 700px) {
    font-size: 16px;
    right: -1.8rem;
    top: 3rem;
  }
  @media (max-width: 560px) {
    top: 2.6rem;
    right: -1.9rem;
  }
  @media (max-width: 410px) {
    top: 2.6rem;
    right: -1.75rem;
  }
`

export default connect(
  mapStateToProps,
  { fetchProfileMeetings, fetchProfilePhotos, fetchSomeoneElsesProfile }
)(ProfilePage)

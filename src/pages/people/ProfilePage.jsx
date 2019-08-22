import React from 'react'
import { css } from '@emotion/core'
import { connect } from 'react-redux'
import {
  pagePadding,
  appBorderColor,
  appMidColor,
  appTeal,
  appColor2
} from '../../emotion/variables'
import { selectUser } from '../../store/selectors/authSelectors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import ProfileMeetings from '../../components/profile/ProfileMeetings'

const mapStateToProps = state => ({
  user: selectUser(state)
})

const ProfilePage = ({ user }) => {
  console.log(user)
  return (
    <div css={profilePageCss}>
      <div css={header}>
        <div css={imgContainer}>
          <img src={user.photoURL} alt='avatar' />
        </div>
        <div css={headerLeft}>
          <h3>{user.username}</h3>
          <p>{user.email}</p>
          <p>Joined on: {user.createdAt.toDate().toString()}</p>
        </div>
      </div>
      <div css={details}>
        <h4>About</h4>
        <div>
          <p>
            <span>Job Title:</span> {user.jobTitle || 'Information Unavailable'}
          </p>
          <p>
            <span>Department:</span> {user.department || 'Information Unavailable'}{' '}
          </p>
          <p>
            <span>Birthday:</span> {user.birthday || 'Information Unavailable'}
          </p>
        </div>

        <div>
          <p>
            <span>Birthday:</span> {user.birthday || 'Information Unavailable'}
          </p>
          <p>
            <span>Birthday:</span> {user.birthday || 'Information Unavailable'}
          </p>
          <p>
            <span>Lunch Break:</span> {user.lunchBreakTime || '12:00 pm'}
          </p>
        </div>
      </div>
      <div css={editBox}>
        <ProfileMeetings />
      </div>
      <div css={photoSection}>
        <div css={photoTitleBox}>
          <FontAwesomeIcon icon={faCamera} css={iconCss} /> <h4>Photos</h4>
        </div>
        <div>photos here</div>
      </div>
    </div>
  )
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
    color: ${appColor2};
    font-size: 5rem;
  }
`

const details = css`
  background: white;
  border: 1px solid ${appBorderColor};
  border-radius: 0.4rem;
  height: 30rem;
  padding: 2rem 5rem;
  & h4 {
    font-size: 5rem;
  }
  & span {
    font-weight: bold;
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
`

const photoSection = css`
  grid-column-start: 1;
  grid-column-end: 2;
  background: white;
  border: 1px solid ${appBorderColor};
  border-radius: 0.4rem;
  height: 30rem;
  padding: 3rem;
  & h4 {
    font-size: 4rem;
  }
`

const iconCss = css`
  font-size: 5rem;
`

const photoTitleBox = css`
  display: flex;
`

export default connect(mapStateToProps)(ProfilePage)

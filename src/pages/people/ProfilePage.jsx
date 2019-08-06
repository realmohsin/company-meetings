import React from 'react'
import { css } from '@emotion/core'
import { connect } from 'react-redux'
import {
  pagePadding,
  appBorderColor,
  appMidColor,
  appTeal
} from '../../emotion/variables'
import { selectUser } from '../../store/selectors/authSelectors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

const mapStateToProps = state => ({
  user: selectUser(state)
})

const ProfilePage = ({ user }) => {
  return (
    <div css={profilePageCss}>
      <div css={header}>
        <div css={imgContainer}>
          <img src={user.photoURL} alt='avatar' />
        </div>
        <div css={headerLeft}>
          <h3>{user.username}</h3>
          <p>some stuff here</p>
        </div>
      </div>
      <div css={details}>
        <h4>About</h4>
        <p>
          <span>Job Title:</span> {user.jobTitle || 'Information Unavailable'}
        </p>
        <p>
          <span>Department:</span> {user.department || 'Information Unavailable'}{' '}
        </p>
        <p>
          <span>Takes Lunch Break at:</span> {user.lunchBreakTime || '12:00 pm'}
        </p>
        <p>
          <span>Hobbies:</span> {user.hobbies || 'Information Unavailable'}
        </p>
      </div>
      <div css={editBox}>
        <div>
          <button>Edit Profile</button>
        </div>
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
  padding-left: 10rem;
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
  background: white;
  border: 1px solid ${appBorderColor};
  border-radius: 0.4rem;
  height: 10rem;
  padding: 3rem;
  & button {
    border: 2px solid ${appTeal};
    padding: 0.5rem 1.5rem;
    background: white;
    color: ${appTeal};
    font-size: 2rem;
    border-radius: 0.6rem;
    margin: 0 auto;
    display: block;
    cursor: pointer;
  }
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

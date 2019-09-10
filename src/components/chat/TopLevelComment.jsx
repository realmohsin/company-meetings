import React from 'react'
import { css } from '@emotion/core'
import { Link } from 'react-router-dom'
import defaultUserPhoto from '../../assets/defaultUserPhoto.png'
import {
  appBorderColor,
  appDarkBlue,
  appTeal,
  appColor1Hover,
  appColor1
} from '../../emotion/variables'
import ReplyAreaAndButton from './ReplyAreaAndButton'

const TopLevelComment = ({ comment, selectedId, handleSelectComment }) => {
  console.log('comment: ', comment)
  return (
    <div>
      <div css={commentCss}>
        <div css={avatarContainer}>
          <img src={comment.photoURL || defaultUserPhoto} alt='avatar' css={avatar} />
        </div>
        <div css={rightSideCss}>
          <div>
            <div css={commentHeader}>
              <Link to={`/people/${comment.uid}`} css={linkCss}>
                {comment.username}
              </Link>
              <span>about 7 hours ago</span>
            </div>
            <p css={textCss}>{comment.text}</p>
            <span css={replySpan} onClick={() => handleSelectComment(comment.id)}>
              reply
            </span>
            {selectedId === comment.id && (
              <div css={replyFormContainer}>
                <ReplyAreaAndButton
                  parentId={comment.id}
                  handleSelectComment={handleSelectComment}
                />
              </div>
            )}
            <div css={childCommentContainer}>
              {comment.childNodes &&
                comment.childNodes.map(subComment => (
                  <div>
                    <div css={commentCss}>
                      <div css={avatarContainer}>
                        <img
                          src={subComment.photoURL || defaultUserPhoto}
                          alt='avatar'
                          css={avatar}
                        />
                      </div>
                      <div css={rightSideCss}>
                        <div>
                          <div css={commentHeader}>
                            <Link to={`/people/${subComment.uid}`} css={linkCss}>
                              {subComment.username}
                            </Link>
                            <span>about 7 hours ago</span>
                          </div>
                          <p css={textCss}>{subComment.text}</p>
                          <span
                            css={replySpan}
                            onClick={() => handleSelectComment(subComment.id)}
                          >
                            reply
                          </span>
                          {selectedId === subComment.id && (
                            <div css={replyFormContainer}>
                              <ReplyAreaAndButton
                                parentId={comment.id}
                                handleSelectComment={handleSelectComment}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const commentCss = css`
  display: flex;
`

const avatarContainer = css`
  padding: 1rem;
  width: 7rem;
`

const avatar = css`
  display: block;
  width: 5rem;
  height: 5rem;
  border-radius: 0.6rem;
  @media (max-width: 600px) {
    width: 4.5rem;
    height: 4.5rem;
  }
`

const rightSideCss = css`
  padding: 0.5rem 1.5rem;
  width: 100%;
`
const commentHeader = css`
  font-size: 1.8rem;
  font-weight: bold;
  color: ${appColor1};
  padding-bottom: 0.7rem;
  & span {
    font-size: 1.6rem;
    font-weight: normal;
    margin-left: 0.6rem;
    color: rgba(0, 0, 0, 0.5);
  }
  @media (max-width: 620px) {
    & span {
      margin-left: 0;
      display: block;
      width: 100%;
    }
  }
`

const linkCss = css`
  display: inline;
  &:hover {
    color: ${appColor1Hover};
  }
`

const textCss = css`
  font-size: 1.8rem;
  padding-bottom: 0.5rem;
`
const replySpan = css`
  margin-left: 0.1rem;
  font-size: 1.6rem;
  color: rgba(0, 0, 0, 0.5);
  &:hover {
    cursor: pointer;
    color: black;
  }
`

const replyFormContainer = css`
  margin-top: 1.6rem;
`

const childCommentContainer = css``

export default TopLevelComment

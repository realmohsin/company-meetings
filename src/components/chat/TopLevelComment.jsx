import React from 'react'
import { css } from '@emotion/core'
import defaultUserPhoto from '../../assets/defaultUserPhoto.png'
import { appBorderColor, appDarkBlue, appTeal } from '../../emotion/variables'
import ReplyAreaAndButton from './ReplyAreaAndButton'

const TopLevelComment = ({ comment, selectedId, handleSelectComment }) => {
  return (
    <div>
      <div css={commentCss}>
        <div css={avatarContainer}>
          <img src={comment.photoURL || defaultUserPhoto} alt='avatar' css={avatar} />
        </div>
        <div css={rightSideCss}>
          <div>
            <div css={commentHeader}>
              {comment.username}
              <span>about 7 hours ago</span>
            </div>
            <p css={textCss}>{comment.text}</p>
            <span css={replySpan} onClick={() => handleSelectComment(comment.id)}>
              reply
            </span>
            {selectedId === comment.id && (
              <div css={replyFormContainer}>
                <ReplyAreaAndButton parentId={comment.id} />
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
                            {subComment.username}
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
                              <ReplyAreaAndButton parentId={comment.id} />
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
`

const rightSideCss = css`
  padding: 0.5rem 1.5rem;
  width: 100%;
`
const commentHeader = css`
  font-size: 1.8rem;
  font-weight: bold;
  color: ${appTeal};
  padding-bottom: 0.7rem;
  & span {
    font-size: 1.6rem;
    font-weight: normal;
    margin-left: 0.6rem;
    color: rgba(0, 0, 0, 0.5);
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

import React from 'react'
import { css } from '@emotion/core'
import { appBorderColor } from '../../emotion/variables'
import ReplyAreaAndButton from '../chat/ReplyAreaAndButton'
import TopLevelComment from '../chat/TopLevelComment'
import { firestore } from '../../firebase/firebase'
import createChatDataTree from '../../utils/createChatDataTree'

class MeetingChat extends React.Component {
  state = {
    comments: null,
    selectedId: null
  }

  handleSelectComment = selectedId => this.setState({ selectedId })

  componentDidMount () {
    this.unsubCommentsObserver = firestore
      .collection('meetingComments')
      .doc(this.props.meetingId)
      .collection('comments')
      .orderBy('date')
      .onSnapshot(snapshot => {
        const comments = []
        snapshot.docs.map(commentSnap => {
          comments.push({
            ...commentSnap.data(),
            id: commentSnap.id
          })
        })
        const commentsStructured = createChatDataTree(comments)
        console.log('from comments observer: ', commentsStructured)
        this.setState({ comments: commentsStructured })
      })
  }

  componentWillUnmount () {
    this.unsubCommentsObserver()
  }

  render () {
    const { comments, selectedId } = this.state
    return (
      <div css={meetingChatCss}>
        <div css={header}>Chat About This Meeting</div>
        <div css={body}>
          {comments &&
            comments.map(comment => (
              <TopLevelComment
                key={comment.id}
                comment={comment}
                selectedId={selectedId}
                handleSelectComment={this.handleSelectComment}
              />
            ))}
          <div css={formContainer}>
            <ReplyAreaAndButton
              parentId={0}
              handleSelectComment={this.handleSelectComment}
            />
          </div>
        </div>
      </div>
    )
  }
}

const meetingChatCss = css`
  border-radius: 0.6rem;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
  background: #fff;
  width: 100%;
  margin: 5rem 0;
`

const header = css`
  background: #00b5ad;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
  border-top-left-radius: 0.6rem;
  border-top-right-radius: 0.6rem;
  font-size: 2.3rem;
`

const body = css`
  border: 1px solid ${appBorderColor};
  border-top: none;
  padding: 2rem;
`

const formContainer = css`
  padding: 1rem 1rem 2rem;
`

export default MeetingChat

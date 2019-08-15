// comment shape
// {
//   id: 'afa2',
//   parentId: 'afaf3',
// }

const createChatDataTree = commentsArr => {
  const commentsMap = Object.create(null)
  commentsArr.forEach(
    comment => (commentsMap[comment.id] = { ...comment, childNodes: [] })
  )
  const chatDataTree = []
  commentsArr.forEach(comment => {
    if (comment.parentId) {
      commentsMap[comment.parentId].childNodes.push(commentsMap[comment.id])
    } else {
      chatDataTree.push(commentsMap[comment.id])
    }
  })
  return chatDataTree
}

export default createChatDataTree

// returns
// [
//   {
//     id: 'a4faf5aa',
//     parentId: 0,
//     childNodes: [{}]
//   },
//   {
//     id: 'sa3raf2',
//     parentId: 0,
//     childNodes: [{}]
//   }
// ]

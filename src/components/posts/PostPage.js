import React, { useState } from 'react'
import Post from './Post'
import { firestore } from '../../firebase'
import { withRouter } from 'react-router-dom'
import { useUser } from '../../providers/UserProvider'
import moment from 'moment'
const collectIdsandDocs = doc => {
  return { id: doc.id, ...doc.data() }
}
function Comments(props) {
  const [com, setCom] = React.useState({ content: "" })
  const user = useUser()
  if (user) console.log(user.displayName)
  function makeComment(e) {
    e.preventDefault()
    props.onCreate(com, user, { createdAt: Date.now() })

  }
  return (
    <div>{user && props.comments.map(c => <p>{c.content} by {c.user.displayName} at {moment(c.createdAt).calendar()}</p>)}
      <form onSubmit={makeComment}>
        <input type="text" value={com.content} onChange={e => setCom({ content: e.target.value })} />
        <button type="submit">press</button>
      </form>
    </div>
  )
}
function PostPage(props) {
  console.log(props)
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  console.log(comments)
  const postId = props.match.params.id
  const postRef = firestore.doc(`/posts/${postId}`)

  const commentsRef = postRef.collection('comments')

  React.useEffect(() => {
    const postRef = firestore.doc(`/posts/${postId}`)

    const commentsRef = postRef.collection('comments')
    const unsubscribeFromPost = postRef.onSnapshot(snapshot => {
      const post = collectIdsandDocs(snapshot)
      setPost({ postRef: postRef, ...post })
    })
    const unsubscribeFromComments = commentsRef.onSnapshot(snapshot => {
      const comments = snapshot.docs.map(collectIdsandDocs);
      setComments(comments)
    })
    return () => {
      unsubscribeFromPost();
      unsubscribeFromComments()
    }
  }, [postId])
  const createComment = (comment, user) => {
    commentsRef.add({
      ...comment,
      user,
    });
  };

  return (
    <div>
      {post && <Post {...post} />}
      <Comments
        comments={comments}
        postId={postId
        }
        onCreate={createComment}

      />
    </div>
  )
}

export default withRouter(PostPage)
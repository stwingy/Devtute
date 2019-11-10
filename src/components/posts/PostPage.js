import React, { useState } from 'react'
import Post from './Post'
import { firestore } from '../../firebase'
import { withRouter, Link } from 'react-router-dom'
import { useUser } from '../../providers/UserProvider'
import { useMover } from '../../providers/MoveLoginProvider'
import moment from 'moment'
import { Button, StyledInput } from '../../style/styles'
import styled from 'styled-components'


const Input = styled(StyledInput)`

width:82%;
margin:.5em auto;
background-color:rgba(0, 0, 0, 0.1);
box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12) inset;
    color: #555555;
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    font-size: 1em;
    line-height: 1.4em;
    padding: 5px 8px;
    border-color: #ff9999;
    border-image: none;
    border-radius: 3px;
    border-style: none solid solid none;
    border-width: medium 1px 1px medium;
    transition:background-color .3s ease;
    :focus{
background-color:white;
    }
`
const collectIdsandDocs = doc => {
  return { id: doc.id, ...doc.data() }
}
function Comments(props) {
  const [com, setCom] = React.useState({ content: "" })
  const user = useUser()
  const { setMove } = useMover()
  function MakeComment(e) {

    // e.preventDefault()
    if (com.content !== "") {
      props.onCreate(com, user, { createdAt: Date.now() })
      setCom({ ...com, content: "" })
    }


  }
  function moveLogin() {
    setMove(true)
  }
  return (
    <div style={{ marginBottom: "6rem" }}>

      {props.comments.map(c => <div key={c.id} style={{ margin: "10px auto", width: "95%", display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: "1em", marginTop: "1.5em", padding: "1em .5em", backgroundColor: "#ffb3b3", textAlign: "left", wordWrap: 'break-word' }}>{c.content}</div>
        <div style={{ wordWrap: 'no-wrap', flexBasis: "25%" }}><span style={{ fontWeight: "600" }}>{c.user.displayName}</span></div>
        <div style={{ flexBasis: "25%", fontSize: ".7em", fontWeight: "100" }}>  {moment(c.createdAt).calendar()}</div>
      </div>)}

      {user ? <form onSubmit={MakeComment}>
        <Input placeholder="Enter a Comment" type="text" value={com.content} onChange={e => setCom({ content: e.target.value })} />
        <Button type="submit" onClick={MakeComment}>Submit</Button>
      </form> : <Link to="/"><Button onClick={moveLogin}>Log in to Comment</Button></Link>}
    </div>
  )
}
function PostPage(props) {

  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])

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
  console.log(postRef.postId)
  return (
    <div>
      {post && <Post {...post} match={props.match || null} />}
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
import React from 'react'
import Post from './Post'
import { usePosts } from '../../providers/PostProvider'
import { useUser } from '../../providers/UserProvider'
import { firestore } from '../../firebase'
import { Button, StyledInput } from '../../style/styles'
import styled from 'styled-components'

const ButtonF = styled(Button)`
margin:.5em auto;`
const Form = styled.form`
display:flex;
flex-direction:column;
margin-bottom:8rem;
`
const Textarea = styled.textarea`
   margin: .5em auto;
    
    width: 500px;
    height: 100px;
    -moz-border-bottom-colors: none;
    -moz-border-left-colors: none;
    -moz-border-right-colors: none;
    -moz-border-top-colors: none;
    background: none repeat scroll 0 0 rgba(0, 0, 0, 0.07);
    border-color: -moz-use-text-color #FFFFFF #FFFFFF -moz-use-text-color;
    border-image: none;
    border-radius: 6px 6px 6px 6px;
    border-style: none solid solid none;
    border-width: medium 1px 1px medium;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12) inset;
    color: #555555;
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    font-size: 1em;
    line-height: 1.4em;
    padding: 5px 8px;
    transition: background-color 0.2s ease 0s;
  }
  
  
:focus {
      background: none repeat scroll 0 0 #FFFFFF;
      outline-width: 0;
  }
 `
// const Input = styled.input`
//   font-size: 16px;
//   border: solid 1px #dbdbdb;
//   border-radius: 3px;
//   color: #262626;
//   padding: 7px 33px;
//   border-radius: 3px;
//   color: #999;
//   cursor: text;
//   font-size: 14px;
//   font-weight: 300;
//   text-align: center;
//   background: #fafafa;
//   &:active,
//   &:focus {
//     text-align: left;
//   }
// `;
const Input = styled(StyledInput)`
width:200px;
margin:0 auto;
`
function Posts() {

    const posts = usePosts()
    const user = useUser()
    const { uid, photoURL, email, displayName } = user || {}

    const [title, setTitle] = React.useState("")
    const [body, setBody] = React.useState("")

    function handleSubmit(e) {
        //e.preventDefault()
        addPosts({ title: title, body: body, createdAt: Date.now(), stars: 0, user: { uid, photoURL, email, displayName } })
        setTitle("")
        setBody("")
    }
    const addPosts = async post => {
        firestore.collection('posts').add(post)
    }



    return (
        <div>
            <Form id="postForm" onSubmit={handleSubmit}>
                <Input value={title} type="text" onChange={e => setTitle(e.target.value)} />
                <Textarea value={body} type="text" onChange={e => setBody(e.target.value)} />
                <ButtonF type="submit" onClick={handleSubmit} >PRESS</ButtonF>
            </Form>


            {

                (posts.map(p =>
                    <Post key={p.id} id={p.id} title={p.title} body={p.body} createdAt={p.createdAt} stars={p.stars} {...p} postRef={firestore.doc(`posts/${p.id}`)} />
                ))
            }
        </div>
    )
}

export default Posts
// QuerySnapshot properties
// docs  array of DocumentSnapshots
// empty boolean if snapshot empty
// metadata   source etc
// query   ref to query fired
// size number of documents in QuerySnapshot

/*QuerySnapshot methods
docChanges()   array of changes since last snapshot
forEach() iterates over entire array of snapshots
isEqual()    is equal to another snapshot
*/

/* DocumentSnapshot props
id   of document
exists   is in database?
metadata
ref  ref to documents location in database*/

/*DocumentSnapshot methods
data()   gets all the fields of th object
get()    allows access to an objects particular property eg/"firstName"
isEqual()  useful for comparisons
*/
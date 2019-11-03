import React from 'react'
import Post from './Post'
import { usePosts } from '../../providers/PostProvider'
import { useUser } from '../../providers/UserProvider'
import { firestore } from '../../firebase'
import { Button, StyledInput } from '../../style/styles'
import styled from 'styled-components'

const Select = styled.select`
display: block;
    font-size: 16px;
    font-family: sans-serif;
    font-weight: 700;
    color: #444;
    line-height: 1.3;
    padding: .6em 1.4em .5em .8em;
    width: 100%;
    max-width: 100%; 
    box-sizing: border-box;
    margin: 0;
    border: 1px solid #aaa;
    box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
    border-radius: .5em;
   
    :hover{
        border-color: #888;
    }
    :focus {
    border-color: #aaa;
    box-shadow: 0 0 1px 3px rgba(59, 153, 252, .7);
   
    color: #222; 
    outline: none;
`

const ButtonF = styled(Button)`
margin:.5em auto;`

const Form = styled.form`
padding:20px;
border-radius:10px;
background-color: #ff4d4d;
display:flex;
flex-direction:column;
z-index:1000;
margin-bottom:8rem;
position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
top: ${props => props.posT || "50%"};
left: ${props => props.posL || "-1999px"};
transition:left .5s ease;
`
const Textarea = styled.textarea`
   margin: .5em auto;
    
    width: 80%;
    height: 100px;
    -moz-border-bottom-colors: none;
    -moz-border-left-colors: none;
    -moz-border-right-colors: none;
    -moz-border-top-colors: none;
    background: none repeat scroll 0 0 rgba(0, 0, 0, 0.07);
    border-color: 	 #ff9999;
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
function Posts({ sel }) {

    const posts = usePosts()
    const user = useUser()
    const { uid, photoURL, email, displayName } = user || {}
    const [sections, setSections] = React.useState(sel)
    const [sectLoading, setSectLoading] = React.useState(false)
    const [title, setTitle] = React.useState("")
    const [body, setBody] = React.useState("")
    const [select, setSelect] = React.useState("All")
    const [posL, setPosL] = React.useState('-2000px')
    console.log(posts)
    function handleSubmit(e) {
        e.preventDefault()
        setPosL("-2000px")
        let myVar = "General"
        if (select) myVar = select
        addPosts({ title: title, select: myVar, body: body, createdAt: Date.now(), stars: 0, user: { uid, photoURL, email, displayName } })
        setTitle("")
        setBody("")
    }
    function handleSelect(e) {
        setSelect(e.target.value)

    }
    const addPosts = async post => {
        firestore.collection('posts').add(post)
    }

    return (
        <div>

            {user && <Form posL={posL} id="postForm" onSubmit={handleSubmit}>
                <Input placeholder="Please Enter A Title" value={title} type="text" onChange={e => setTitle(e.target.value)} />
                <Textarea placeholder="Please Enter Some More Information" value={body} type="text" onChange={e => setBody(e.target.value)} />
                <div style={{ display: "flex", justifyItems: 'center', margin: '0 auto' }}>

                    <Select onChange={handleSelect}>
                        <option value="">Select From Below</option>
                        <option value="General">General</option>
                        <option value="React">React</option>
                        <option value="Styled Components">Styled Components</option>
                        <option value="CSS">CSS</option>
                        <option value="Javascript">Javascript</option>
                    </Select>
                    <ButtonF type="submit" onClick={handleSubmit} >PRESS<button style={{ left: "0", width: "100%", height: '100%', position: "absolute", opacity: 0 }}></button></ButtonF>
                </div>

            </Form>}
            <Button style={{ marginTop: "10px" }} onClick={() => setPosL("50%")}>{user ? 'Make A Post' : 'Log In To Post'}</Button>
            {sel === "All" ? posts.map(p =>
                <Post key={p.id} id={p.id} title={p.title} body={p.body} select={p.select} createdAt={p.createdAt} stars={p.stars} {...p} postRef={firestore.doc(`posts/${p.id}`)} coms={firestore.collection(`posts/${p.id}/comments`)} />
            ) :

                (posts.filter(pos => pos.select === sel)
                    .map(p =>
                        <Post key={p.id} id={p.id} title={p.title} body={p.body} select={p.select} createdAt={p.createdAt} stars={p.stars} {...p} postRef={firestore.doc(`posts/${p.id}`)} coms={firestore.collection(`posts/${p.id}/comments`)} />
                    ))
            }

        </div >
    )
}

export default Posts

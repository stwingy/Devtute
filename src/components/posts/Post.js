import React from 'react'
import moment from 'moment'
import Edit from './Edit'
import { useUser } from '../../providers/UserProvider'
import { Link } from 'react-router-dom'
import { Button } from '../../style/styles'
import styled from 'styled-components'

const P = styled.p`
padding:0rem 2rem;
text-align:left;
width:95%;
line-height:1.4rem;
font-size:1.2rem;
`
const Div = styled.div`
background-color:#ffb3b3;

width:95%;
margin:0 auto;
margin-bottom:3em;
/* border-bottom:50px solid #ff6666;
box-shadow: inset 0 -1px 0 0 #ff6666; */
`
const belongsToCurrentUser = (currentUser, postAuthor) => {
    // console.log("CU ", currentUser, "PO ", postAuthor)
    if (!currentUser) return false
    if (!postAuthor) return false
    return currentUser.uid === postAuthor.uid

}
function Post(props) {

    const { title, body, createdAt, id, stars, user, postRef, select } = props
    const [showEdit, setShowEdit] = React.useState(false)
    const currentUser = useUser()
    console.log(props.match)


    const starsF = () => { postRef.update({ stars: stars + 1 }); }
    const removePost = async => {
        postRef.delete()
        // props.history.push("/")
        console.log(props)
    }
    const editTitle = (str1, str2) => {
        postRef.update({ title: str1, body: str2 })

    }
    function handleEdit() {
        setShowEdit(true)
    }
    return (
        <Div>
            {showEdit && <Edit title={title} body={body} editTitle={editTitle} />}
            <div style={{ position: 'relative' }}>
                <p style={{ position: "absolute", left: "0", top: "-2rem", backgroundColor: "#FFB366", padding: '.5em 1em', borderRadius: "10px" }}>{select}</p>
                {props.match ? <h2 style={{ backgroundColor: "#FFB366" }}>{title}</h2> : <Link to={`posts/${id}`}><h2 style={{ backgroundColor: "#FFB366" }}>{title}</h2></Link>}
            </div>

            {title && <> <P>{body}</P>


                {belongsToCurrentUser(currentUser, user) === false && <Button onClick={() => starsF()}>{`${stars} Likes`}</Button>}
                <div style={{ display: 'flex', justifyContent: "space-evenly", width: '90%', margin: '2.5rem auto' }}>
                    <p>{moment(createdAt).calendar()}</p>
                    {user && <p>by {user.displayName}</p>}
                </div>
                <div style={{ backgroundColor: " #ff6666", margin: "0 auto" }}>
                    {belongsToCurrentUser(currentUser, user) && props.match && <Link to="/"><Button style={{ marginRight: "5px" }} onClick={() => removePost()}>Delete</Button></Link>}
                    {props.match && belongsToCurrentUser(currentUser, user) && <Button onClick={() => handleEdit()}>EDIT</Button>}
                </div>
            </>}

        </Div>
    )
}

export default Post

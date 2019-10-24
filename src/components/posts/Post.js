import React from 'react'
import moment from 'moment'
import { useUser } from '../../providers/UserProvider'
import { Link } from 'react-router-dom'
import { Button } from '../../style/styles'
import styled from 'styled-components'

const P = styled.p`
padding:0rem 5rem;
text-align:left;

line-height:1.4rem;
font-size:1.2rem;
`
const Div = styled.div`

`
const belongsToCurrentUser = (currentUser, postAuthor) => {
    // console.log("CU ", currentUser, "PO ", postAuthor)
    if (!currentUser) return false
    if (!postAuthor) return false
    return currentUser.uid === postAuthor.uid

}
function Post(props) {

    const { title, body, createdAt, id, stars, user, postRef } = props
    const currentUser = useUser()
    console.log(props.match)


    const starsF = () => { postRef.update({ stars: stars + 1 }); }
    const removePost = async => {
        postRef.delete()
    }
    const editTitle = (str) => {
        postRef.update({ title: str })

    }
    return (
        <Div>
            {props.match ? <h2>{title}</h2> : <Link to={`posts/${id}`}><h2>{title}</h2></Link>}
            {title && <> <P>{body}</P>


                {belongsToCurrentUser(currentUser, user) === false && <Button onClick={() => starsF()}>{`${stars} Likes`}</Button>}
                <div style={{ display: 'flex', justifyContent: "space-evenly", width: '90%', margin: '2rem auto' }}>
                    <p>{moment(createdAt).calendar()}</p>
                    {user && <p>by {user.displayName}</p>}
                </div>
                {belongsToCurrentUser(currentUser, user) && !props.match && <Button onClick={() => removePost()}>X</Button>}
                {!props.match && belongsToCurrentUser(currentUser, user) && <Button onClick={() => editTitle("BAAAAA")}>EDIT</Button>}</>}

        </Div>
    )
}

export default Post

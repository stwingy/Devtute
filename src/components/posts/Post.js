import React from 'react'
import moment from 'moment'
import { useUser } from '../../providers/UserProvider'
import { Link } from 'react-router-dom'
import firestore from '../../firebase'
const belongsToCurrentUser = (currentUser, postAuthor) => {
    console.log("CU ", currentUser, "PO ", postAuthor)
    if (!currentUser) return false
    if (!postAuthor) return false
    return currentUser.uid === postAuthor.uid

}
function Post(props) {

    const { title, body, createdAt, id, stars, user, postRef } = props
    const currentUser = useUser()
    console.log(props)


    const starsF = () => { postRef.update({ stars: stars + 1 }); }
    const removePost = async => {
        postRef.delete()
    }
    const editTitle = (str) => {
        postRef.update({ title: str })

    }
    return (
        <div>
            <Link to={`posts/${id}`}><h2>{title}</h2></Link>
            <p>{body}</p>
            <h2>{stars}</h2>
            {belongsToCurrentUser(currentUser, user) === false && <button onClick={() => starsF()}>vote</button>}
            <p>{moment(createdAt).calendar()}</p>
            {user && <p>by {user.displayName}</p>}
            {belongsToCurrentUser(currentUser, user) && <button onClick={() => removePost()}>X</button>}
            <button onClick={() => editTitle("BAAAAA")}>EDIT</button>
        </div>
    )
}

export default Post

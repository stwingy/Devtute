import React from 'react'
import { signOut } from '../../firebase'
import { Link } from 'react-router-dom'
function CurrentUser(user) {
    console.log(user)
    return (
        <div>
            <Link to="profile"><p>{user.displayName}</p></Link>

            <button onClick={signOut}>Signout</button>

            <p>{user.email}</p>
            <p>Joined {user.createdAt}</p>

            <img src={user.photoURL} alt="you" />
        </div>
    )
}

export default CurrentUser

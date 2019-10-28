import React from 'react'
import { signOut } from '../../firebase'
import { Link } from 'react-router-dom'
import { Button } from '../../style/styles'
import styled from 'styled-components'

const SinOutButton = styled(Button)`
width:150px;
align-self:center;
`
function CurrentUser(user) {
    console.log(user)
    return (
        <div style={{ width: "95%", display: "flex", justifyContent: "space-between", margin: "0 auto" }}>
            <div>
                <Link to="profile"><p style={{ backgroundColor: "#FF66B3" }}>{user.displayName}</p></Link>



                <p>{user.email}</p>
                <p>Joined {user.createdAt}</p>

                <img src={user.photoURL} alt="you" />
            </div>

            <SinOutButton onClick={signOut}>Signout</SinOutButton>
        </div>
    )
}

export default CurrentUser

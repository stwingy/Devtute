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
                <Link to="profile"><p style={{ backgroundColor: "#FF66B3", boxShadow: "3px 3px 3px #000" }}>{user.displayName}</p></Link>



                {/* <p>{user.email}</p> */}

                <div style={{ width: "200px", height: "100px" }} >
                    <img style={{ maxHeight: "100%", maxWidth: "100%" }} src={user.photoURL} alt=" you" />
                </div>
                <p style={{ fontSize: ".7em" }}>Joined {user.createdAt}</p>
            </div>

            <Link to="/"> <SinOutButton onClick={signOut}>Signout</SinOutButton></Link>
        </div>
    )
}

export default CurrentUser

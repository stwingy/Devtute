import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
const Div = styled.div`
margin: 0 auto;
margin-top:30px;
height:55px;
width:100%
background-color: #ff6666;
position:fixed;
bottom:0;
`
const P = styled.p`
font-size:1.5rem;
font-weight:400;

`
function Footer() {

    return (
        <Link to="/">
            <Div>
                <P style={{ marginTop: "20px" }}>Back To Posts</P>
            </Div>
        </Link>
    )
}

export default Footer

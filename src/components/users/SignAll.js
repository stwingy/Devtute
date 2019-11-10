import React from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'
import styled from 'styled-components'
import { useMover } from '../../providers/MoveLoginProvider'
const Div = styled.div`
position:absolute;
transform: translateX(-50%);
left:${props => props.left};
top:11rem; 
transition:left .5s ease;
@media (max-width: 800px) {
  
  top:2rem;

}
`



function SignAll(props) {
    const [signInActive, setSignInActive] = React.useState(true)
    const [signUpActive, setSignUpActive] = React.useState(true)
    const { move } = useMover()
    function changeSignIn(val) {
        setSignUpActive(val)
    }
    function changeSignUp(val) {
        setSignInActive(val)
    }
    return (
        <Div left={move ? "50%" : "-1000px"}>
            {signInActive && <SignIn changeSignIn={changeSignIn} />}
            {signUpActive && <SignUp changeSignUp={changeSignUp} />}
        </Div>
    )
}

export default SignAll

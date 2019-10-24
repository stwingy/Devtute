import React from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'
import styled from 'styled-components'
const Div = styled.div`


`
function SignAll() {
    const [signInActive, setSignInActive] = React.useState(true)
    const [signUpActive, setSignUpActive] = React.useState(true)

    function changeSignIn(val) {
        setSignUpActive(val)
    }
    function changeSignUp(val) {
        setSignInActive(val)
    }
    return (
        <Div>
            {signInActive && <SignIn changeSignIn={changeSignIn} />}
            {signUpActive && <SignUp changeSignUp={changeSignUp} />}
        </Div>
    )
}

export default SignAll

import React from 'react'
import { signInWithGoogle, auth } from '../../firebase'
import { Button } from '../../style/styles'
import styled from 'styled-components'
const Div = styled.div`
display:flex;
flex-direction:column;
`
const StyledInput = styled.input`
  border: 1px solid #000;
  border-radius: 10px;
  padding: 10px;
  margin: 5px;
  width: 150px;
  box-sizing: border-box;
  background: ${prop => prop.correct ? 'white' : 'red'};
`;
function SignIn({ changeSignIn }) {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [showForm, setShowForm] = React.useState(false)
    const [googleVis, setGoogleVis] = React.useState(true)
    return (
        <div>
            {googleVis && <div> <Button onClick={signInWithGoogle}>
                signin with GOOGLE

        </Button></div>}

            <div>{!showForm && <Button onClick={() => { setShowForm(true); changeSignIn(false); setGoogleVis(false) }}>Sign In with Email</Button>}</div>

            {showForm && <form >
                <Div>
                    <StyledInput type="email" onChange={(e) => setEmail(e.target.value)} />
                    <StyledInput type="password" onChange={(e) => setPassword(e.target.value)} />
                    <Button onClick={() => auth.signInWithEmailAndPassword(email, password)}>
                        signin with setEmail

</Button></Div>
            </form>}



        </div>

    )
}

export default SignIn

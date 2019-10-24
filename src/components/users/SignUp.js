import React from 'react'
import { auth, createUserProfileDocument } from '../../firebase'
import styled from 'styled-components'
import { Button } from '../../style/styles'
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
function SignUp({ changeSignUp }) {
    const [formVisible, setFormVisible] = React.useState(false)
    const [displayName, setDisplayName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const handleSubmit = async (e) => {
        // e.preventDefault()
        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password)
            createUserProfileDocument(user, { displayName })
        } catch (error) {
            console.error(error)
        }
        setPassword("")
    }
    function showForm() {
        return (
            <form onSubmit={handleSubmit}>
                <Div>
                    <StyledInput type="text" onChange={(e) => setDisplayName(e.target.value)} />
                    <StyledInput type="email" onChange={(e) => setEmail(e.target.value)} />
                    <StyledInput type="password" onChange={(e) => setPassword(e.target.value)} />
                    <Button type="submit" onClick={handleSubmit}>Submit</Button>
                </Div>
            </form>
        )
    }
    return (
        <div>
            {formVisible ? <>{showForm()}</> : <Button onClick={() => { setFormVisible(true); changeSignUp(false) }}>Sign Up</Button>}
        </div>
    )
}

export default SignUp

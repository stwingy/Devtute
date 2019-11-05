import React from 'react'
import { auth, createUserProfileDocument } from '../../firebase'
import styled from 'styled-components'
import { Button } from '../../style/styles'
const Div = styled.div`
display:flex;
flex-direction:column;
`
const But = styled(Button)`
line-height: 30px;
    height: 30px;
  margin:5px auto;
    width: 100px;
`
const StyledInput = styled.input`
  border: 1px solid #000;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
  width: 150px;
  box-sizing: border-box;
  background-color: ${prop => prop.correct ? 'white' : '#ff4d4d'};
  :focus{
    background-color:#fff;   
  }
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
                    <StyledInput placeholder=" Display Name" type="text" onChange={(e) => setDisplayName(e.target.value)} />
                    <StyledInput placeholder=" Email Address" type="email" onChange={(e) => setEmail(e.target.value)} />
                    <StyledInput placeholder=" Password" type="password" onChange={(e) => setPassword(e.target.value)} />
                    <But type="submit" onClick={handleSubmit}>Submit</But>
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

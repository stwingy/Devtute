import React from 'react'
import { auth, createUserProfileDocument } from '../../firebase'
function SignUp() {
    const [formVisible, setFormVisible] = React.useState(false)
    const [displayName, setDisplayName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const handleSubmit = async (e) => {
        e.preventDefault()
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
                <input type="text" onChange={(e) => setDisplayName(e.target.value)} />
                <input type="email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        )
    }
    return (
        <div>
            {formVisible ? <>{showForm()}</> : <button onClick={() => setFormVisible(true)}>Sign Up</button>}
        </div>
    )
}

export default SignUp

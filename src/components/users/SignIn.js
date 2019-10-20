import React from 'react'
import { signInWithGoogle, auth } from '../../firebase'
function SignIn() {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    return (
        <div>
            <button onClick={signInWithGoogle}>
                signin with GOOGLE

        </button>
            <form >

                <input type="email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" onChange={(e) => setPassword(e.target.value)} />

            </form>
            <button onClick={() => auth.signInWithEmailAndPassword(email, password)}>
                signin with setEmail

        </button>
        </div>

    )
}

export default SignIn

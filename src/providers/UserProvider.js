import React from 'react'
import { auth, createUserProfileDocument } from '../firebase'

export const UserContext = React.createContext()


function UserProvider({ children }) {

    const [user, setUser] = React.useState(null)

    React.useEffect(() => {

        const subscribeA = auth.onAuthStateChanged(async userA => {
            if (userA) {
                const userRef = await createUserProfileDocument(userA)
                userRef.onSnapshot(snapshot => {
                    setUser({ uid: snapshot.id, ...snapshot.data() })
                })
            }


            setUser(userA)

        })
        return () => { subscribeA() }
    }, [])
    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>


    )
}
export function useUser() {
    return React.useContext(UserContext)
}
export default UserProvider

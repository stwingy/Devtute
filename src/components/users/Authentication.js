import React from 'react'
import CurrentUser from './CurrentUser'
import SignAll from './SignAll'
import { useUser } from '../../providers/UserProvider'
function Authentication({ loading }) {
    const user = useUser()

    if (loading) return null;


    return (
        <div>
            {user ? <CurrentUser {...user} /> : <SignAll />}
        </div>
    )
}

export default Authentication

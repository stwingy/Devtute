import React from 'react'
import CurrentUser from './CurrentUser'
import SignAll from './SignAll'
import { useUser } from '../../providers/UserProvider'
import styled from 'styled-components'
const Div = styled.div`
position:absolute;
top:10px;
left:0;
width:100%;
@media (max-width: 800px) {
  
  top:8rem;

}
`
function Authentication({ loading }) {
    const user = useUser()

    if (loading) return null;


    return (
        <Div top={!user ? '10px' : '10rem'}>
            {user ? <CurrentUser {...user} /> : <SignAll />}
        </Div>
    )
}

export default Authentication
